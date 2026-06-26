// ─────────────────────────────────────────────────────────────────────────────
// NOORAST AI MEMORY
// Saves conversation summaries and retrieves them for future sessions.
// No vector embeddings needed — uses keyword matching for simplicity.
//
// POST /save   — generates a summary + saves it to Supabase
// POST /load   — retrieves last N memories for a user
// ─────────────────────────────────────────────────────────────────────────────

const { createClient } = require("@supabase/supabase-js");

function getSupabase() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return createClient(url, key);
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!API_KEY) return { statusCode: 500, body: JSON.stringify({ error: "Service unavailable" }) };

  let body;
  try { body = JSON.parse(event.body); } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid JSON" }) };
  }

  const { action, userId, messages, propertyContext } = body;
  if (!userId) return { statusCode: 400, body: JSON.stringify({ error: "userId required" }) };

  // ── SAVE — summarise conversation and store ──────────────────────────────
  if (action === "save") {
    if (!messages || messages.length < 2) {
      return { statusCode: 200, body: JSON.stringify({ saved: false, reason: "Too few messages to save" }) };
    }

    try {
      // Use Haiku to generate a compact memory summary
      const conversationText = messages
        .slice(-20) // last 20 messages only
        .map(m => `${m.role === "user" ? "Homeowner" : "Noorast AI"}: ${
          typeof m.content === "string" ? m.content : 
          (Array.isArray(m.content) ? m.content.filter(b => b.type === "text").map(b => b.text).join(" ") : "")
        }`)
        .join("\n");

      const summaryRes = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-opus-4-7",
          max_tokens: 300,
          messages: [{
            role: "user",
            content: `Summarise this conversation in 3-4 sentences. Focus on:
1. Key facts established about the property
2. Planning constraints or permissions discussed
3. Budget figures mentioned
4. Decisions or conclusions reached
5. What the homeowner is trying to build

Be specific — include numbers, addresses, constraint types. This summary will be used to give context in future sessions.

Conversation:
${conversationText}`,
          }],
        }),
      });

      const summaryData = await summaryRes.json();
      const summary = summaryData.content?.[0]?.text || "Conversation summary unavailable.";

      // Extract keywords for basic relevance matching
      const keywords = extractKeywords(conversationText + " " + (propertyContext || ""));

      const supabase = getSupabase();
      const { error } = await supabase.from("ai_memories").insert({
        user_id: userId,
        summary,
        keywords,
        message_count: messages.length,
        property_context: propertyContext || null,
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Memory save error:", error.message);
        return { statusCode: 500, body: JSON.stringify({ saved: false, error: error.message }) };
      }

      return { statusCode: 200, body: JSON.stringify({ saved: true, summary }) };

    } catch (err) {
      console.error("Memory save failed:", err.message);
      return { statusCode: 500, body: JSON.stringify({ saved: false, error: err.message }) };
    }
  }

  // ── LOAD — retrieve relevant memories for context injection ──────────────
  if (action === "load") {
    try {
      const supabase = getSupabase();

      // Get most recent memories (simple recency + user filter)
      const { data, error } = await supabase
        .from("ai_memories")
        .select("summary, keywords, created_at, property_context")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) {
        console.error("Memory load error:", error.message);
        return { statusCode: 500, body: JSON.stringify({ memories: [], error: error.message }) };
      }

      // Format for system prompt injection
      const formattedMemories = (data || []).map(m => ({
        summary: m.summary,
        date: new Date(m.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
        property_context: m.property_context,
      }));

      return {
        statusCode: 200,
        body: JSON.stringify({ memories: formattedMemories, count: formattedMemories.length }),
      };

    } catch (err) {
      console.error("Memory load failed:", err.message);
      return { statusCode: 500, body: JSON.stringify({ memories: [], error: err.message }) };
    }
  }

  return { statusCode: 400, body: JSON.stringify({ error: "action must be 'save' or 'load'" }) };
};

// ── Keyword extraction for basic relevance scoring ───────────────────────────
function extractKeywords(text) {
  const planningTerms = [
    "conservation area","article 4","listed building","permitted development","planning permission",
    "extension","loft","dormer","outbuilding","party wall","flood risk","tpo","tree","covenant",
    "restrictive","leasehold","freehold","budget","cost","architect","refusal","approval",
    "kitchen","bedroom","bathroom","garage","basement","garden","rear","side","front",
    "semi-detached","detached","terraced","victorian","edwardian","1930s",
  ];
  const lowerText = text.toLowerCase();
  return planningTerms.filter(term => lowerText.includes(term)).slice(0, 20);
}
