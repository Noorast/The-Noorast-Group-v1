import React, { useState } from 'react';
import { X, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../lib/auth';

interface Props {
  onClose: () => void;
  defaultMode?: 'signin' | 'signup';
}

export function AuthModal({ onClose, defaultMode = 'signin' }: Props) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (mode === 'signup') {
      if (password.length < 8) {
        setError('Password must be at least 8 characters.');
        setLoading(false);
        return;
      }
      const { error } = await signUp(email, password);
      if (error) {
        setError(error);
      } else {
        setSuccess('Account created. Check your email to confirm your address, then sign in.');
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error === 'Invalid login credentials' ? 'Incorrect email or password.' : error);
      } else {
        onClose();
      }
    }
    setLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-md bg-background border border-border/60 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-border/40">
          <div>
            <div className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mb-1">Noorast Account</div>
            <h3 className="text-lg font-light text-foreground">
              {mode === 'signin' ? 'Sign in' : 'Create account'}
            </h3>
          </div>
          <button onClick={onClose} className="bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground p-1 transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8">
          {success ? (
            <div className="flex flex-col items-start gap-4">
              <div className="w-10 h-10 border border-foreground/20 flex items-center justify-center">
                <CheckCircle size={18} className="text-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Check your email</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{success}</p>
              </div>
              <button
                onClick={() => { setSuccess(''); setMode('signin'); }}
                className="text-xs tracking-[0.12em] uppercase text-foreground border-b border-foreground/30 pb-0.5 hover:border-foreground/40 transition-colors bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer mt-2"
              >
                Sign in →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">Email address</label>
                <input
                  type="email" required value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full border border-border/60 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-foreground/20 transition-colors placeholder:text-muted-foreground/30"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-[10px] tracking-[0.15em] uppercase text-muted-foreground mb-2">Password</label>
                <input
                  type="password" required value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full border border-border/60 bg-background px-4 py-3 text-sm text-foreground outline-none focus:border-foreground/20 transition-colors placeholder:text-muted-foreground/30"
                  placeholder={mode === 'signup' ? 'Minimum 8 characters' : '••••••••'}
                />
              </div>

              {error && (
                <p className="text-xs text-red-600 leading-relaxed">{error}</p>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-foreground text-background text-[11px] tracking-[0.15em] uppercase hover:bg-foreground/85 transition-colors disabled:opacity-50 cursor-pointer border-none mt-2"
              >
                {loading ? <Loader2 size={13} className="animate-spin" /> : (
                  <>{mode === 'signin' ? 'Sign in' : 'Create account'} <ArrowRight size={12} /></>
                )}
              </button>

              <p className="text-center text-xs text-muted-foreground pt-2">
                {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                <button
                  type="button"
                  onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); }}
                  className="text-foreground underline underline-offset-2 bg-transparent border-none cursor-pointer"
                >
                  {mode === 'signin' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Benefits when signing up */}
        {mode === 'signup' && !success && (
          <div className="px-8 pb-8 border-t border-border/30 pt-6">
            <div className="text-[9px] tracking-[0.15em] uppercase text-muted-foreground mb-4">What you get</div>
            <div className="space-y-2">
              {[
                'Property Passport saved to the cloud — access on any device',
                'AI conversation history — pick up where you left off',
                'Passport progress saved across sessions',
              ].map(item => (
                <div key={item} className="flex gap-2 text-xs text-muted-foreground">
                  <span className="text-muted-foreground/30 shrink-0">—</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
