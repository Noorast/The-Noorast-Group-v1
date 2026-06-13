import { useState, useEffect, useCallback, useRef } from "react";

const C = {
  bg: "#FFFFFF", text: "#333333", muted: "#888888", light: "#BBBBBB",
  border: "#E5E5E5", dark: "#222222", label: "#555555",
  greenDot: "#4A7C59", goldDot: "#A08050",
};

const F = "'Helvetica Neue', Helvetica, Arial, sans-serif";

const SECTIONS = [
  { id:"property",title:"Property Details",num:"01" },
  { id:"planning_history",title:"Planning History",num:"02" },
  { id:"planning_policy",title:"Planning Policy",num:"03" },
  { id:"legal",title:"Legal Constraints",num:"04" },
  { id:"site",title:"Site Constraints",num:"05" },
  { id:"environmental",title:"Environmental",num:"06" },
  { id:"spatial",title:"Spatial Record",num:"07" },
  { id:"boundary",title:"Boundary Record",num:"08" },
  { id:"circulation",title:"Circulation",num:"09" },
  { id:"brief",title:"Preliminary Brief",num:"10" },
  { id:"constraints",title:"Constraint Register",num:"11" },
  { id:"documents",title:"Supporting Documents",num:"12" },
];

const CHECKLIST = {
  "Planning Intelligence":["Planning history searched for your property","Planning history searched for neighbouring properties","All planning conditions identified and checked","Local plan policies identified and read","SPD / design guide obtained and read","Conservation area status confirmed","Article 4 Direction status checked","Neighbourhood plan status checked","Permitted development rights confirmed","Neighbourhood pattern analysis completed"],
  "Legal Intelligence":["Title register obtained (\u00A33)","Title plan obtained (\u00A33)","Restrictive covenants identified","Easements and rights of way identified","Leasehold restrictions reviewed (if applicable)","Chancel repair liability checked","Mines and minerals reservation checked"],
  "Site Intelligence":["Measured survey commissioned and received","Drainage records obtained","Utility positions identified","Tree positions and TPO status checked","Protected species risk assessed","Flood risk zone confirmed","Ground conditions assessed","Access constraints identified"],
  "Boundary & Neighbours":["Boundary positions confirmed","Party Wall Act obligations identified","Neighbour consultation completed","Rights of light risk assessed"],
  "Spatial & Design":["Circulation analysis completed","Spatial benchmarks applied","Ceiling heights recorded","Structural arrangement understood"],
  "Financial":["Full project budget established","Funding route confirmed","Ceiling price researched","VAT position confirmed"],
  "Brief & Passport":["Design brief written","Budget envelope confirmed","Value engineering priorities set","Property passport compiled","Constraint register finalised"],
};

const FIELDS = {
  property:[
    {key:"address",label:"Property Address",type:"textarea",ph:"Full address including postcode"},
    {key:"titleNumber",label:"Title Number",type:"text",ph:"e.g. GM123456"},
    {key:"tenure",label:"Tenure",type:"select",opts:["","Freehold","Leasehold","Commonhold"]},
    {key:"propertyType",label:"Property Type",type:"select",opts:["","Detached","Semi-detached","Terraced","End-terrace","Flat / Maisonette","Bungalow","Other"]},
    {key:"yearBuilt",label:"Approximate Year of Construction",type:"text",ph:"e.g. 1935"},
    {key:"constructionType",label:"Construction Type",type:"select",opts:["","Cavity brick","Solid brick","Stone","Timber frame","Steel frame","Concrete","Mixed","Unknown"]},
    {key:"storeys",label:"Number of Storeys",type:"select",opts:["","1","2","3","4+"]},
    {key:"bedrooms",label:"Number of Bedrooms",type:"select",opts:["","1","2","3","4","5+"]},
    {key:"notes",label:"Additional Notes",type:"textarea",ph:"Any relevant observations"},
  ],
  planning_history:[
    {key:"searchCompleted",label:"Planning Portal Search Completed",type:"select",opts:["","Yes","No","In progress"]},
    {key:"localAuthority",label:"Local Planning Authority",type:"text",ph:"e.g. Manchester City Council"},
    {key:"applications",label:"Planning Applications Found",type:"textarea",ph:"Reference, Description, Decision, Date, Conditions"},
    {key:"liveConditions",label:"Live Conditions Identified",type:"textarea",ph:"Conditions that remain live, especially PD right removals"},
    {key:"neighbourHistory",label:"Neighbour Planning History",type:"textarea",ph:"Notable applications on neighbouring properties"},
    {key:"patternNotes",label:"Pattern Recognition Notes",type:"textarea",ph:"Patterns in approvals and refusals"},
  ],
  planning_policy:[
    {key:"localPlan",label:"Local Plan",type:"text",ph:"Name and adoption date"},
    {key:"relevantPolicies",label:"Relevant Policies",type:"textarea",ph:"Policy references and key requirements"},
    {key:"spd",label:"SPD / Design Guide",type:"textarea",ph:"Name and key requirements"},
    {key:"conservationArea",label:"Conservation Area Status",type:"select",opts:["","Not in a conservation area","In a conservation area","Adjacent","Unknown"]},
    {key:"conservationAppraisal",label:"Conservation Area Appraisal Notes",type:"textarea",ph:"Key character elements (if applicable)"},
    {key:"article4",label:"Article 4 Direction",type:"select",opts:["","No Article 4 applies","Article 4 applies","Unknown"]},
    {key:"neighbourhoodPlan",label:"Neighbourhood Plan",type:"select",opts:["","None","In force","In preparation","Unknown"]},
  ],
  legal:[
    {key:"titleObtained",label:"Title Register Obtained",type:"select",opts:["","Yes","No","Ordered"]},
    {key:"covenants",label:"Restrictive Covenants",type:"textarea",ph:"Covenants from Section C of the title register"},
    {key:"easements",label:"Easements and Rights of Way",type:"textarea",ph:"List any easements or encumbrances"},
    {key:"leaseholdRestrictions",label:"Leasehold Restrictions",type:"textarea",ph:"Relevant lease terms (if applicable)"},
    {key:"chancellRepair",label:"Chancel Repair Liability",type:"select",opts:["","Not applicable","Checked \u2014 no liability","Indemnity obtained","Needs checking"]},
    {key:"minesAndMinerals",label:"Mines and Minerals",type:"select",opts:["","Not applicable","No reservation","Reservation noted","Coal Authority report obtained","Needs checking"]},
    {key:"flyingFreehold",label:"Flying Freehold",type:"select",opts:["","Not applicable","Present","Not present"]},
    {key:"legalAdvice",label:"Professional Advice Summary",type:"textarea",ph:"Solicitor\u2019s advice on legal matters"},
  ],
  site:[
    {key:"drainage",label:"Drainage Layout",type:"textarea",ph:"Foul and surface water drainage. Public sewers near proposed works."},
    {key:"utilities",label:"Utility Positions",type:"textarea",ph:"Gas, water, electricity, telecoms"},
    {key:"groundConditions",label:"Ground Conditions",type:"textarea",ph:"Soil type, ground investigation results"},
    {key:"trees",label:"Trees and TPOs",type:"textarea",ph:"Positions, species, TPO status, root protection areas"},
    {key:"access",label:"Construction Access",type:"textarea",ph:"Side access, width, crane access, skip positions"},
    {key:"other",label:"Other Site Constraints",type:"textarea",ph:"Levels, retaining walls, overhead cables"},
  ],
  environmental:[
    {key:"floodZone",label:"Flood Risk Zone",type:"select",opts:["","Zone 1 \u2014 Low","Zone 2 \u2014 Medium","Zone 3 \u2014 High","Not checked"]},
    {key:"surfaceWater",label:"Surface Water Risk",type:"select",opts:["","Low","Medium","High","Not checked"]},
    {key:"protectedSpecies",label:"Protected Species",type:"textarea",ph:"Bat roost potential, nesting birds, survey status"},
    {key:"contamination",label:"Contaminated Land",type:"select",opts:["","No known contamination","Investigation needed","Search completed \u2014 clear","Search completed \u2014 issues found","Not checked"]},
    {key:"designations",label:"Nearby Designations",type:"textarea",ph:"SSSI, SAC, SPA, Local Nature Reserve"},
    {key:"biodiversity",label:"Biodiversity Notes",type:"textarea",ph:"BNG implications, garden features, mitigation"},
  ],
  spatial:[
    {key:"surveyStatus",label:"Measured Survey",type:"select",opts:["","Not commissioned","Commissioned","Received","Not required"]},
    {key:"surveyRef",label:"Survey Provider / Reference",type:"text",ph:"e.g. Smith Surveys, Ref SS-2025-042"},
    {key:"gfArea",label:"Ground Floor Area (m\u00B2)",type:"text",ph:"e.g. 52"},
    {key:"ffArea",label:"First Floor Area (m\u00B2)",type:"text",ph:"e.g. 48"},
    {key:"ceilingGF",label:"Ground Floor Ceiling Height (m)",type:"text",ph:"e.g. 2.6"},
    {key:"ceilingFF",label:"First Floor Ceiling Height (m)",type:"text",ph:"e.g. 2.5"},
    {key:"structural",label:"Structural Notes",type:"textarea",ph:"Loadbearing walls, steelwork, modifications"},
    {key:"loft",label:"Loft Dimensions",type:"textarea",ph:"Ridge height, headroom, stair feasibility"},
  ],
  boundary:[
    {key:"status",label:"Boundary Positions",type:"select",opts:["","Confirmed by survey","Assumed from title plan","Disputed","Survey commissioned","Not assessed"]},
    {key:"partyWall",label:"Party Wall Obligations",type:"textarea",ph:"Boundaries triggering the Act. Adjoining owner details."},
    {key:"neighbours",label:"Neighbour Details",type:"textarea",ph:"Names, contact details, record of discussions"},
    {key:"agreements",label:"Boundary Agreements",type:"textarea",ph:"Existing agreements or deeds"},
    {key:"rightsOfLight",label:"Rights of Light",type:"textarea",ph:"Identified risks from neighbouring windows"},
  ],
  circulation:[
    {key:"existing",label:"Existing Circulation",type:"textarea",ph:"Movement patterns, bottlenecks, dead ends"},
    {key:"inefficiencies",label:"Key Inefficiencies",type:"textarea",ph:"What doesn\u2019t work about the current layout"},
    {key:"priorities",label:"Extension Priorities",type:"textarea",ph:"What the extension should achieve spatially"},
    {key:"insideOutside",label:"Inside\u2013Outside Connection",type:"textarea",ph:"Current and desired relationship to garden"},
  ],
  brief:[
    {key:"overview",label:"Project Overview",type:"textarea",ph:"What are you proposing and why"},
    {key:"spatial",label:"Spatial Requirements",type:"textarea",ph:"Room by room: area, quality, light, connections"},
    {key:"quality",label:"Quality Priorities",type:"textarea",ph:"How should the finished space feel"},
    {key:"budget",label:"Budget Envelope (\u00A3)",type:"text",ph:"e.g. 95000"},
    {key:"contingency",label:"Contingency",type:"select",opts:["","10%","15%","20%","25%"]},
    {key:"programme",label:"Programme",type:"textarea",ph:"Desired start, completion, deadlines"},
    {key:"essential",label:"Essential Items",type:"textarea",ph:"Items that cannot be cut"},
    {key:"desirable",label:"Desirable Items",type:"textarea",ph:"Items you want but could compromise on"},
    {key:"deferrable",label:"Deferrable Items",type:"textarea",ph:"Items that could wait or be omitted"},
  ],
  constraints:[
    {key:"planning",label:"Planning Constraints",type:"textarea",ph:"PD removals, policy restrictions, conservation requirements"},
    {key:"legal",label:"Legal Constraints",type:"textarea",ph:"Covenants, easements, lease terms"},
    {key:"site",label:"Site Constraints",type:"textarea",ph:"Drainage, utilities, trees, access, ground"},
    {key:"environmental",label:"Environmental Constraints",type:"textarea",ph:"Flood risk, ecology, contamination"},
    {key:"actions",label:"Actions Required",type:"textarea",ph:"For each constraint: what needs to happen"},
  ],
  documents:[
    {key:"titleReg",label:"Title Register",type:"select",opts:["","Obtained","Ordered","Not obtained"]},
    {key:"titlePlan",label:"Title Plan",type:"select",opts:["","Obtained","Ordered","Not obtained"]},
    {key:"survey",label:"Measured Survey",type:"select",opts:["","Received (CAD)","Received (PDF)","Commissioned","Not commissioned"]},
    {key:"decisions",label:"Planning Decisions",type:"select",opts:["","All downloaded","Partial","Not downloaded"]},
    {key:"reports",label:"Officer\u2019s Reports",type:"select",opts:["","All downloaded","Partial","Not downloaded","Not available"]},
    {key:"sewer",label:"Sewer Records",type:"select",opts:["","Obtained","Requested","Not requested"]},
    {key:"ecology",label:"Ecological Reports",type:"select",opts:["","Not required","Commissioned","Received","Not commissioned"]},
    {key:"coal",label:"Coal Authority Report",type:"select",opts:["","Not required","Obtained","Not obtained"]},
    {key:"other",label:"Other Documents",type:"textarea",ph:"Any other documents gathered"},
  ],
};

async function load(k,fb){try{const r=await window.storage.get(k);return r?JSON.parse(r.value):fb}catch{return fb}}
async function sv(k,d){try{await window.storage.set(k,JSON.stringify(d))}catch(e){console.error(e)}}

function buildPDF(data){
  const d=new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"});
  let h=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>Property Passport</title><style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#333;line-height:1.7;padding:50px 60px;max-width:780px;margin:0 auto;font-weight:300}
@media print{body{padding:30px}@page{margin:2.5cm}.np{display:none}}
h1{font-size:22px;font-weight:300;letter-spacing:6px;color:#222;text-transform:uppercase;margin-bottom:4px}
.sub{font-size:13px;color:#888;font-weight:300;margin-bottom:4px}.date{font-size:11px;color:#aaa;margin-bottom:40px}
.rule{width:50px;height:1px;background:#ccc;margin:8px 0 6px}
h2{font-size:13px;font-weight:500;letter-spacing:3px;text-transform:uppercase;color:#555;margin:36px 0 16px;padding-bottom:8px;border-bottom:1px solid #e5e5e5}
.fl{margin-bottom:12px}.flbl{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:#888;font-weight:500}
.fval{font-size:13px;margin-top:2px;white-space:pre-wrap;font-weight:300}.empty{color:#bbb;font-style:italic;font-size:12px}
.ft{margin-top:50px;padding-top:16px;border-top:1px solid #e5e5e5;font-size:10px;color:#aaa;text-align:center;letter-spacing:1px}
.btn{position:fixed;top:24px;right:24px;padding:10px 22px;background:#222;color:#fff;border:none;font-size:11px;letter-spacing:2px;text-transform:uppercase;cursor:pointer;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-weight:400}
</style></head><body><button class="np btn" onclick="window.print()">Save as PDF</button>
<h1>NOORAST</h1><div class="rule"></div><div class="sub">Property Passport</div><div class="date">${d}</div>`;
  SECTIONS.forEach(s=>{const fs=FIELDS[s.id],sd=data[s.id]||{},has=fs.some(f=>sd[f.key]);
    h+=`<h2>${s.num} &mdash; ${s.title}</h2>`;
    if(!has){h+=`<p class="empty">No data entered.</p>`;return}
    fs.forEach(f=>{const v=sd[f.key];if(v)h+=`<div class="fl"><div class="flbl">${f.label}</div><div class="fval">${v.replace(/</g,"&lt;")}</div></div>`});
  });
  h+=`<div class="ft">NOORAST &middot; Property Passport &middot; noorast.com</div></body></html>`;return h;
}

export default function App(){
  const[data,setData]=useState({});
  const[checks,setChecks]=useState({});
  const[active,setActive]=useState("property");
  const[view,setView]=useState("passport");
  const[ready,setReady]=useState(false);
  const[saving,setSaving]=useState(false);
  const timer=useRef(null);

  useEffect(()=>{(async()=>{setData(await load("np-data",{}));setChecks(await load("np-checks",{}));setReady(true)})()},[]);

  const debounce=useCallback((nd,nc)=>{if(timer.current)clearTimeout(timer.current);setSaving(true);
    timer.current=setTimeout(async()=>{await sv("np-data",nd);await sv("np-checks",nc);setSaving(false)},800)},[]);

  const updateField=useCallback((sec,key,val)=>{setData(prev=>{const next={...prev,[sec]:{...(prev[sec]||{}),[key]:val}};debounce(next,checks);return next})},[checks,debounce]);
  const toggleCheck=useCallback((key)=>{setChecks(prev=>{const next={...prev,[key]:!prev[key]};debounce(data,next);return next})},[data,debounce]);

  const comp={};SECTIONS.forEach(s=>{const fs=FIELDS[s.id],sd=data[s.id]||{};const filled=fs.filter(f=>sd[f.key]&&String(sd[f.key]).trim()).length;comp[s.id]=Math.round((filled/fs.length)*100)});
  const overall=Math.round(SECTIONS.reduce((s,x)=>s+comp[x.id],0)/SECTIONS.length);
  const totalChk=Object.values(CHECKLIST).flat().length;
  const doneChk=Object.values(checks).filter(Boolean).length;
  const chkPct=Math.round((doneChk/totalChk)*100);
  const curIdx=SECTIONS.findIndex(s=>s.id===active);

  const resetAll=async()=>{if(confirm("Reset all data? This cannot be undone.")){setData({});setChecks({});await sv("np-data",{});await sv("np-checks",{})}};

  if(!ready)return(
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",background:C.bg,fontFamily:F}}>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:18,letterSpacing:6,color:C.dark,fontWeight:300}}>NOORAST</div>
        <div style={{fontSize:12,color:C.muted,marginTop:8,fontWeight:300}}>Loading Property Passport</div>
      </div>
    </div>
  );

  const inputStyle={width:"100%",padding:"10px 12px",fontSize:13,lineHeight:1.7,fontWeight:300,border:`1px solid ${C.border}`,borderRadius:0,background:C.bg,color:C.text,fontFamily:F,outline:"none",boxSizing:"border-box",transition:"border-color 0.2s"};

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:C.bg,fontFamily:F,color:C.text,fontWeight:300}}>

      {/* HEADER */}
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 28px",borderBottom:`1px solid ${C.border}`,background:C.bg,flexShrink:0}}>
        <div>
          <div style={{fontSize:16,letterSpacing:6,color:C.dark,fontWeight:300}}>NOORAST</div>
          <div style={{fontSize:10,color:C.light,letterSpacing:3,textTransform:"uppercase",marginTop:1,fontWeight:400}}>Property Passport</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:20}}>
          {saving&&<span style={{fontSize:10,color:C.light,letterSpacing:1,fontWeight:400}}>SAVING</span>}
          <nav style={{display:"flex",gap:0}}>
            {["passport","checklist"].map(v=>(
              <button key={v} onClick={()=>setView(v)} style={{padding:"6px 16px",fontSize:11,letterSpacing:2,textTransform:"uppercase",border:"none",cursor:"pointer",fontFamily:F,fontWeight:view===v?500:300,background:"transparent",color:view===v?C.dark:C.light,borderBottom:view===v?`1px solid ${C.dark}`:"1px solid transparent"}}>{v}</button>
            ))}
          </nav>
          <button onClick={()=>{const w=window.open("","_blank");w.document.write(buildPDF(data));w.document.close()}}
            style={{padding:"7px 18px",fontSize:10,letterSpacing:2,textTransform:"uppercase",border:`1px solid ${C.border}`,background:"transparent",color:C.text,cursor:"pointer",fontFamily:F,fontWeight:400}}>Export</button>
        </div>
      </header>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>

        {/* SIDEBAR */}
        <aside style={{width:240,flexShrink:0,borderRight:`1px solid ${C.border}`,background:C.bg,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"20px 20px 16px"}}>
            <div style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.muted,marginBottom:8,fontWeight:500}}>Completion</div>
            <div style={{display:"flex",alignItems:"baseline",gap:6}}>
              <span style={{fontSize:28,fontWeight:300,color:C.dark}}>{overall}</span>
              <span style={{fontSize:12,color:C.muted,fontWeight:300}}>%</span>
            </div>
            <div style={{width:"100%",height:1,background:C.border,marginTop:12}}>
              <div style={{height:1,background:C.dark,width:`${overall}%`,transition:"width 0.5s ease"}}/>
            </div>
          </div>
          <div style={{flex:1,overflowY:"auto"}}>
            {SECTIONS.map(s=>{const isA=s.id===active,pct=comp[s.id];return(
              <button key={s.id} onClick={()=>{setActive(s.id);setView("passport")}} style={{display:"flex",alignItems:"center",width:"100%",padding:"9px 20px",background:"transparent",border:"none",cursor:"pointer",textAlign:"left",fontFamily:F,borderLeft:isA?`2px solid ${C.dark}`:"2px solid transparent",transition:"all 0.15s"}}>
                <span style={{fontSize:10,color:C.light,width:22,flexShrink:0,letterSpacing:1,fontWeight:400}}>{s.num}</span>
                <span style={{fontSize:12,color:isA?C.dark:C.muted,fontWeight:isA?500:300,flex:1,letterSpacing:0.3}}>{s.title}</span>
                <span style={{width:6,height:6,borderRadius:"50%",flexShrink:0,background:pct>=100?C.greenDot:pct>0?C.goldDot:C.border,transition:"background 0.3s"}}/>
              </button>
            )})}
          </div>
          <div style={{padding:"12px 20px",borderTop:`1px solid ${C.border}`}}>
            <button onClick={resetAll} style={{fontSize:10,color:C.light,background:"transparent",border:"none",cursor:"pointer",fontFamily:F,letterSpacing:1,textTransform:"uppercase",fontWeight:400}}>Reset Data</button>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{flex:1,overflowY:"auto",padding:"36px 48px",maxWidth:720}}>
          {view==="passport"?(
            <>
              <div style={{marginBottom:32}}>
                <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.light,marginBottom:6,fontWeight:400}}>Section {SECTIONS[curIdx].num}</div>
                <h2 style={{fontSize:22,fontWeight:300,color:C.dark,margin:0,lineHeight:1.3,fontFamily:F}}>{SECTIONS[curIdx].title}</h2>
                <div style={{width:40,height:1,background:C.border,marginTop:12}}/>
              </div>

              {FIELDS[active].map(f=>(
                <div key={f.key} style={{marginBottom:24}}>
                  <label style={{display:"block",fontSize:10,letterSpacing:1.5,textTransform:"uppercase",color:C.label,fontWeight:500,marginBottom:6}}>{f.label}</label>
                  {f.type==="textarea"?(
                    <textarea value={(data[active]||{})[f.key]||""} placeholder={f.ph} rows={4} onChange={e=>updateField(active,f.key,e.target.value)} style={{...inputStyle,resize:"vertical",minHeight:80}} onFocus={e=>e.target.style.borderColor=C.dark} onBlur={e=>e.target.style.borderColor=C.border}/>
                  ):f.type==="select"?(
                    <select value={(data[active]||{})[f.key]||""} onChange={e=>updateField(active,f.key,e.target.value)} style={{...inputStyle,cursor:"pointer"}}>{f.opts.map(o=><option key={o} value={o}>{o||"\u2014"}</option>)}</select>
                  ):(
                    <input type="text" value={(data[active]||{})[f.key]||""} placeholder={f.ph} onChange={e=>updateField(active,f.key,e.target.value)} style={inputStyle} onFocus={e=>e.target.style.borderColor=C.dark} onBlur={e=>e.target.style.borderColor=C.border}/>
                  )}
                </div>
              ))}

              <div style={{display:"flex",justifyContent:"space-between",marginTop:40,paddingTop:24,borderTop:`1px solid ${C.border}`}}>
                <button onClick={()=>curIdx>0&&setActive(SECTIONS[curIdx-1].id)} disabled={curIdx===0} style={{padding:"8px 20px",fontSize:10,letterSpacing:2,textTransform:"uppercase",fontFamily:F,fontWeight:400,border:curIdx>0?`1px solid ${C.border}`:"1px solid transparent",background:"transparent",color:curIdx>0?C.text:C.border,cursor:curIdx>0?"pointer":"default"}}>{"\u2190"} Previous</button>
                <button onClick={()=>curIdx<SECTIONS.length-1&&setActive(SECTIONS[curIdx+1].id)} disabled={curIdx===SECTIONS.length-1} style={{padding:"8px 20px",fontSize:10,letterSpacing:2,textTransform:"uppercase",fontFamily:F,fontWeight:400,border:"none",background:curIdx<SECTIONS.length-1?C.dark:C.border,color:C.bg,cursor:curIdx<SECTIONS.length-1?"pointer":"default"}}>Next {"\u2192"}</button>
              </div>
            </>
          ):(
            <>
              <div style={{marginBottom:28}}>
                <div style={{fontSize:10,letterSpacing:3,textTransform:"uppercase",color:C.light,marginBottom:6,fontWeight:400}}>Phase 1</div>
                <h2 style={{fontSize:22,fontWeight:300,color:C.dark,margin:0,fontFamily:F}}>Pre-Architecture Checklist</h2>
                <div style={{width:40,height:1,background:C.border,marginTop:12,marginBottom:8}}/>
                <div style={{fontSize:12,color:C.muted,fontWeight:300}}>{doneChk} of {totalChk} tasks {"\u2014"} {chkPct}%</div>
                <div style={{width:"100%",height:1,background:C.border,marginTop:12}}><div style={{height:1,background:C.dark,width:`${chkPct}%`,transition:"width 0.5s"}}/></div>
              </div>
              {Object.entries(CHECKLIST).map(([cat,items])=>{const catDone=items.filter((_,i)=>checks[`${cat}::${i}`]).length;return(
                <div key={cat} style={{marginBottom:28}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:10,paddingBottom:6,borderBottom:`1px solid ${C.border}`}}>
                    <span style={{fontSize:10,letterSpacing:2,textTransform:"uppercase",color:C.label,fontWeight:500}}>{cat}</span>
                    <span style={{fontSize:10,color:catDone===items.length?C.greenDot:C.light,fontWeight:400}}>{catDone}/{items.length}</span>
                  </div>
                  {items.map((item,i)=>{const key=`${cat}::${i}`,done=!!checks[key];return(
                    <label key={key} style={{display:"flex",alignItems:"flex-start",gap:10,padding:"5px 0",cursor:"pointer",fontSize:12,lineHeight:1.6,fontWeight:300,color:done?C.light:C.text}}>
                      <input type="checkbox" checked={done} onChange={()=>toggleCheck(key)} style={{marginTop:4,accentColor:C.dark,flexShrink:0}}/>
                      <span style={{textDecoration:done?"line-through":"none"}}>{item}</span>
                    </label>
                  )})}
                </div>
              )})}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
