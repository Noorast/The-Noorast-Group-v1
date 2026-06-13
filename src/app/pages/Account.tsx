import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { SEO } from '../components/SEO';
import { useAuth } from '../../lib/auth';
import { loadPassportFromCloud, loadConversation, saveProfile, loadProfile, loadAIMemories, type AIMemory } from '../../lib/db';
import { ArrowRight, User, FileText, MessageSquare, LogOut, Loader2, Edit2, Check, X, Building, MapPin, Phone, Briefcase, Home } from 'lucide-react';

const PROJECT_TYPES = ['Extension', 'Loft conversion', 'Renovation', 'New build', 'Basement', 'Other'];
const STAGES = ['Exploring ideas', 'Ready to appoint', 'Planning submitted', 'Under construction'];
const BUDGETS = ['Under £30k', '£30k–£60k', '£60k–£100k', '£100k–£150k', '£150k–£250k', '£250k+'];

export function Account() {
  const { user, signOut, loading, isAdmin } = useAuth();
  const [passport, setPassport] = useState<any>(null);
  const [conversation, setConversation] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [draft, setDraft] = useState<any>({});
  const [aiMemories, setAiMemories] = useState<AIMemory[]>([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!user) return;
    setDataLoading(true);
    Promise.all([
      loadPassportFromCloud(user.id),
      loadConversation(user.id),
      loadProfile(user.id),
      loadAIMemories(user.id),
    ]).then(([p, c, pr, memories]) => {
      setPassport(p);
      setConversation(c);
      const profileData = pr || {};
      setProfile(profileData);
      setDraft(profileData);
      setAiMemories(memories);
      setDataLoading(false);
    }).catch(() => setDataLoading(false));
  }, [user?.id]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await saveProfile(user.id, draft);
    setProfile({ ...draft });
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
  };

  // Show loading spinner while auth resolves
  if (loading) {
    return (
      <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
        <Loader2 size={20} className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Not signed in
  if (!user) {
    return (
      <div className="max-w-[1440px] mx-auto px-6 py-32 md:px-12 lg:px-16 text-center">
        <h2 className="mb-4">Sign in to view your account</h2>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors" style={{ textDecoration: 'none' }}>
          ← Back to home
        </Link>
      </div>
    );
  }

  const displayName = profile.full_name || user.email?.split('@')[0] || 'Account';
  const memberSince = new Date(user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  const passportSections = passport?.section_data ? Object.keys(passport.section_data).filter(k => {
    const v = passport.section_data[k];
    return v && typeof v === 'object' && Object.values(v).some(Boolean);
  }).length : 0;
  const passportPct = Math.round((passportSections / 12) * 100);
  const msgCount = (() => {
    if (!conversation?.messages) return 0;
    const msgs = Array.isArray(conversation.messages) ? conversation.messages : (() => { try { return JSON.parse(conversation.messages); } catch { return []; } })();
    return msgs.filter((m: any) => m.role === 'user').length;
  })();

  return (
    <div style={{ animation: 'fadeIn 0.35s ease-out' }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <SEO title="Account — Noorast" description="Your Noorast account." />

      {/* Header */}
      <section className="border-b border-border/40">
        <div className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-5">Your account</div>
              <div className="flex items-center gap-5 mb-3">
                <div className="w-14 h-14 bg-foreground flex items-center justify-center text-background text-xl font-light shrink-0">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="font-light leading-tight mb-1" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)' }}>
                    {displayName}
                    {isAdmin && (
                      <span className="ml-2 text-[9px] tracking-[0.15em] uppercase bg-foreground text-background px-2 py-0.5 align-middle">
                        Admin
                      </span>
                    )}
                  </h1>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground/50">Member since {memberSince}</p>
            </div>
            <button
              onClick={handleSignOut} disabled={signingOut}
              className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-muted-foreground hover:text-foreground transition-colors border-none bg-transparent cursor-pointer disabled:opacity-50 self-start"
            >
              {signingOut ? <Loader2 size={12} className="animate-spin" /> : <LogOut size={12} />}
              Sign out
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border/40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16">
          {dataLoading ? (
            <div className="py-12 flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 size={14} className="animate-spin" /> Loading your data...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/40">
              <div className="py-10 md:pr-12">
                <div className="flex items-center gap-2 mb-5">
                  <FileText size={13} className="text-muted-foreground/50" />
                  <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-medium">Property Passport</span>
                </div>
                {passportSections > 0 ? (
                  <>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-light">{passportPct}%</span>
                      <span className="text-xs text-muted-foreground">complete</span>
                    </div>
                    <div className="w-full h-px bg-border mb-3">
                      <div className="h-px bg-foreground" style={{ width: `${passportPct}%`, transition: 'width 0.6s ease' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mb-5">{passportSections}/12 sections</p>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground font-light mb-5">Not started yet.</p>
                )}
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase border-b border-foreground/25 pb-0.5 hover:border-foreground/40 transition-colors text-foreground" style={{ textDecoration: 'none' }}>
                  {passportSections > 0 ? 'Continue' : 'Start Passport'} <ArrowRight size={10} />
                </Link>
              </div>

              <div className="py-10 md:px-12">
                <div className="flex items-center gap-2 mb-5">
                  <MessageSquare size={13} className="text-muted-foreground/50" />
                  <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-medium">Noorast AI</span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-light">{msgCount}</span>
                  <span className="text-xs text-muted-foreground">question{msgCount !== 1 ? 's' : ''}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-3">
                  {conversation?.updated_at
                    ? `Last active ${new Date(conversation.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}`
                    : 'No conversations yet'}
                </p>
                {aiMemories.length > 0 && (
                  <div className="mb-4 p-3 bg-muted/20 border border-border/40">
                    <p className="text-[9px] tracking-[0.1em] uppercase text-muted-foreground/50 mb-1.5">
                      {aiMemories.length} session{aiMemories.length !== 1 ? 's' : ''} remembered
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-3">
                      {aiMemories[0].summary}
                    </p>
                  </div>
                )}
                <Link to="/contact" className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase border-b border-foreground/25 pb-0.5 hover:border-foreground/40 transition-colors text-foreground" style={{ textDecoration: 'none' }}>
                  Open AI <ArrowRight size={10} />
                </Link>
              </div>

              <div className="py-10 md:pl-12">
                <div className="flex items-center gap-2 mb-5">
                  <Home size={13} className="text-muted-foreground/50" />
                  <span className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground font-medium">Project</span>
                </div>
                <p className="text-base font-light text-foreground mb-1">{profile.project_type || '—'}</p>
                <p className="text-xs text-muted-foreground mb-5">{profile.project_stage || 'Stage not set'}</p>
                <button onClick={() => setEditing(true)} className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.12em] uppercase border-b border-foreground/25 pb-0.5 hover:border-foreground/40 transition-colors text-foreground bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer">
                  <Edit2 size={9} /> Edit profile
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Profile */}
      <section className="border-b border-border/40">
        <div className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-3">
              <div className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-3 font-medium">Your profile</div>
              <p className="text-xs text-muted-foreground leading-relaxed">Personal details and project information. This helps tailor the Passport and AI advice to your situation.</p>
            </div>
            <div className="lg:col-span-8 lg:col-start-5">
              {editing ? (
                <div className="space-y-8">
                  <div>
                    <div className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-5 font-medium pb-3 border-b border-border/40">Personal</div>
                    <div className="grid md:grid-cols-2 gap-5">
                      {[
                        { key: 'full_name', label: 'Full name', ph: 'Your name' },
                        { key: 'phone', label: 'Phone', ph: '+44 7xxx xxxxxx' },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-2">{f.label}</label>
                          <input type="text" value={draft[f.key] || ''} placeholder={f.ph}
                            onChange={e => setDraft((p: any) => ({ ...p, [f.key]: e.target.value }))}
                            className="w-full border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground/20 transition-colors placeholder:text-muted-foreground/30" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-5 font-medium pb-3 border-b border-border/40">Your property & project</div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-2">Property address</label>
                        <input type="text" value={draft.property_address || ''} placeholder="Full address including postcode"
                          onChange={e => setDraft((p: any) => ({ ...p, property_address: e.target.value }))}
                          className="w-full border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground/20 transition-colors placeholder:text-muted-foreground/30" />
                      </div>
                      {[
                        { key: 'project_type', label: 'Project type', options: PROJECT_TYPES },
                        { key: 'project_stage', label: 'Project stage', options: STAGES },
                        { key: 'budget', label: 'Approximate budget', options: BUDGETS },
                      ].map(f => (
                        <div key={f.key}>
                          <label className="block text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-2">{f.label}</label>
                          <select value={draft[f.key] || ''} onChange={e => setDraft((p: any) => ({ ...p, [f.key]: e.target.value }))}
                            className="w-full border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground/20 transition-colors appearance-none cursor-pointer">
                            <option value="">Select...</option>
                            {f.options.map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                      ))}
                      <div className="md:col-span-2">
                        <label className="block text-[10px] tracking-[0.12em] uppercase text-muted-foreground mb-2">Project description</label>
                        <textarea value={draft.project_description || ''} rows={3} placeholder="What are you planning?"
                          onChange={e => setDraft((p: any) => ({ ...p, project_description: e.target.value }))}
                          className="w-full border border-border/60 bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-foreground/20 transition-colors resize-none placeholder:text-muted-foreground/30" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <button onClick={handleSave} disabled={saving}
                      className="inline-flex items-center gap-2 px-7 py-3 bg-foreground text-background text-[11px] tracking-[0.15em] uppercase hover:bg-foreground/85 transition-colors disabled:opacity-50 cursor-pointer border-none">
                      {saving ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button onClick={() => { setDraft({ ...profile }); setEditing(false); }}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors bg-transparent border-none cursor-pointer flex items-center gap-1.5">
                      <X size={11} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="space-y-0">
                    {[
                      { label: 'Full name', value: profile.full_name },
                      { label: 'Email', value: user.email },
                      { label: 'Phone', value: profile.phone },
                      { label: 'Property address', value: profile.property_address },
                      { label: 'Project type', value: profile.project_type },
                      { label: 'Project stage', value: profile.project_stage },
                      { label: 'Budget', value: profile.budget },
                      { label: 'Description', value: profile.project_description },
                    ].map(row => (
                      <div key={row.label} className="grid grid-cols-[150px_1fr] gap-6 py-4 border-b border-border/30">
                        <span className="text-[10px] tracking-[0.1em] uppercase text-muted-foreground pt-0.5">{row.label}</span>
                        <span className={`text-sm font-light ${row.value ? 'text-foreground' : 'text-muted-foreground/30'}`}>
                          {row.value || 'Not set'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 flex items-center gap-4">
                    <button onClick={() => setEditing(true)}
                      className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase border-b border-foreground/25 pb-0.5 hover:border-foreground/40 transition-colors text-foreground bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer">
                      <Edit2 size={11} /> Edit profile
                    </button>
                    {saved && <span className="text-xs text-muted-foreground">Saved ✓</span>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="max-w-[1440px] mx-auto px-6 py-16 md:px-12 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-border/40">
          {[
            { icon: <FileText size={15} />, title: 'Property Passport', sub: `${passportPct}% complete`, link: '/toolkit/property-passport' },
            { icon: <MessageSquare size={15} />, title: 'Noorast AI', sub: `${msgCount} questions`, link: '/ai' },
            { icon: <Building size={15} />, title: 'Services', sub: 'Extensions · Lofts · Planning', link: '/services' },
            { icon: <ArrowRight size={15} />, title: 'Start a Project', sub: '48hr response', link: '/contact' },
          ].map(c => (
            <Link key={c.title} to={c.link} className="border-r border-b border-border/40 p-7 group hover:bg-muted/10 transition-colors" style={{ textDecoration: 'none' }}>
              <div className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors mb-4">{c.icon}</div>
              <div className="text-sm font-medium text-foreground mb-1">{c.title}</div>
              <div className="text-xs text-muted-foreground">{c.sub}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
