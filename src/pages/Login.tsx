import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/input';
import { Lock, User, Key, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLoginSuccess?: () => void;
  onNavigate?: (route: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess, onNavigate }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [groqKey, setGroqKey] = useState('');
  const [showGroqSetup, setShowGroqSetup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      if (showGroqSetup && groqKey) {
        // Setup initial or update credentials with Groq key
        const res = await fetch('/api/auth/setup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, groqApiKey: groqKey }),
        });
        const data = (await res.json()) as any;
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to setup admin credentials');
        }
        localStorage.setItem('revlytics_admin_token', data.token);
        localStorage.setItem('revlytics_admin_user', data.username);
        setSuccessMsg('Admin credentials & Groq API key saved!');
        setTimeout(() => {
          if (onLoginSuccess) onLoginSuccess();
          else if (onNavigate) onNavigate('admin');
          else window.location.href = '/admin';
        }, 600);
        return;
      }

      // Normal Login
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as any;

      if (!res.ok || !data.success) {
        // Fallback for default local admin password if table freshly initialized
        if (username === 'admin' && password === 'revlytics2026!') {
          localStorage.setItem('revlytics_admin_token', 'temp_master_token');
          localStorage.setItem('revlytics_admin_user', 'admin');
          if (onLoginSuccess) onLoginSuccess();
          else if (onNavigate) onNavigate('admin');
          else window.location.href = '/admin';
          return;
        }
        throw new Error(data.error || 'Invalid credentials. Default: admin / revlytics2026!');
      }

      localStorage.setItem('revlytics_admin_token', data.token);
      localStorage.setItem('revlytics_admin_user', data.username);
      setSuccessMsg('Authentication successful. Redirecting to Dashboard...');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
        else if (onNavigate) onNavigate('admin');
        else window.location.href = '/admin';
      }, 500);
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backgroundColor: '#09090b',
        backgroundImage: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.15), transparent 70%), radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.1), transparent 70%)',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '54px',
              height: '54px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.35)',
              marginBottom: '16px',
            }}
          >
            <ShieldCheck size={28} />
          </div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Revlytics Admin Portal
          </h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#a1a1aa' }}>
            Cloudflare D1 & Groq AI Content Studio
          </p>
        </div>

        {/* Shadcn Card */}
        <Card>
          <CardHeader>
            <CardTitle>Sign in to Dashboard</CardTitle>
            <CardDescription>
              Manage SEO metadata for all pages and generate AI blogs using Groq API.
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleLogin}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {error && (
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#f87171',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span>⚠️</span> {error}
                </div>
              )}

              {successMsg && (
                <div
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(34, 197, 94, 0.15)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#4ade80',
                    fontSize: '13px',
                  }}
                >
                  ✓ {successMsg}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#d4d4d8', marginBottom: '6px' }}>
                  Username
                </label>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <User
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '12px', color: '#71717a' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#d4d4d8', marginBottom: '6px' }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    required
                    style={{ paddingLeft: '38px' }}
                  />
                  <Lock
                    size={16}
                    style={{ position: 'absolute', left: '12px', top: '12px', color: '#71717a' }}
                  />
                </div>
              </div>

              {/* Optional Groq API Key Setup */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px' }}>
                <button
                  type="button"
                  onClick={() => setShowGroqSetup(!showGroqSetup)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#818cf8',
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: 0,
                  }}
                >
                  <Sparkles size={14} />
                  {showGroqSetup ? 'Hide Groq API Key Setup' : '+ Setup / Update Groq API Key (Optional)'}
                </button>

                {showGroqSetup && (
                  <div style={{ marginTop: '12px' }}>
                    <label style={{ display: 'block', fontSize: '12px', color: '#a1a1aa', marginBottom: '6px' }}>
                      Groq API Key (`gsk_...`)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Input
                        type="password"
                        value={groqKey}
                        onChange={(e) => setGroqKey(e.target.value)}
                        placeholder="gsk_xxxxxxxxxxxxxxxxxxxx"
                        style={{ paddingLeft: '38px', fontSize: '13px' }}
                      />
                      <Key
                        size={15}
                        style={{ position: 'absolute', left: '12px', top: '12px', color: '#818cf8' }}
                      />
                    </div>
                    <p style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#71717a' }}>
                      Stored securely in Cloudflare D1 `credentials` table.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Button
                type="submit"
                variant="gradient"
                loading={loading}
                style={{ width: '100%', height: '42px', fontSize: '14px', fontWeight: 600 }}
              >
                Sign In to Admin Dashboard <ArrowRight size={16} />
              </Button>

              <p style={{ margin: 0, fontSize: '12px', color: '#71717a', textAlign: 'center' }}>
                Default Login: <code style={{ color: '#a1a1aa' }}>admin</code> / <code style={{ color: '#a1a1aa' }}>revlytics2026!</code>
              </p>
            </CardFooter>
          </form>
        </Card>

        {/* Back to website */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('home');
              else window.location.href = '/';
            }}
            style={{ fontSize: '13px', color: '#a1a1aa', textDecoration: 'none' }}
          >
            ← Back to Revlytics Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
