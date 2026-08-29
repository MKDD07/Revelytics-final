import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Input, Badge } from '../../components/ui/input';
import { Key, Shield, Database, Sparkles, CheckCircle2, Server, Terminal, RefreshCw } from 'lucide-react';

export const SettingsDashboard: React.FC = () => {
  const [groqKey, setGroqKey] = useState('');
  const [hasGroqKey, setHasGroqKey] = useState(false);
  const [savingKey, setSavingKey] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testingKey, setTestingKey] = useState(false);

  const [username, setUsername] = useState('admin');
  const [newPassword, setNewPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  const [statusMsg, setStatusMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Check current auth status
  useEffect(() => {
    async function checkStatus() {
      try {
        const token = localStorage.getItem('revlytics_admin_token');
        const res = await fetch('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = (await res.json()) as any;
          setHasGroqKey(!!data.hasGroqKey);
          setUsername(data.username || 'admin');
        }
      } catch (err) {
        console.warn('Failed to fetch auth status:', err);
      }
    }
    checkStatus();
  }, []);

  // Save / Update Groq API Key
  const handleSaveGroqKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingKey(true);
    setErrorMsg('');
    setStatusMsg('');

    try {
      const token = localStorage.getItem('revlytics_admin_token');
      const res = await fetch('/api/auth/update-groq-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ groqApiKey: groqKey }),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update Groq API key.');
      }

      setHasGroqKey(true);
      setStatusMsg('✓ Groq API Key stored securely in Cloudflare D1 `credentials` table.');
      setGroqKey('');
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error updating key.');
    } finally {
      setSavingKey(false);
    }
  };

  // Test Groq Connection
  const handleTestGroq = async () => {
    setTestingKey(true);
    setTestResult(null);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('revlytics_admin_token');
      const res = await fetch('/api/ai/generate-meta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pageType: 'service',
          name: 'Direct Booking Acceleration',
          description: 'Testing Groq Llama 3.3 70B connection',
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Groq connection test failed');
      }

      setTestResult(`Success! Connected to Groq Llama 3.3 70B. Response: "${data.data?.meta_title || 'OK'}"`);
    } catch (err: any) {
      setErrorMsg(`Groq Connection Failed: ${err.message}`);
    } finally {
      setTestingKey(false);
    }
  };

  // Change Admin Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    setSavingPassword(true);
    setErrorMsg('');
    setStatusMsg('');

    try {
      const res = await fetch('/api/auth/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: newPassword }),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to change password');
      }

      setStatusMsg('✓ Admin password updated successfully.');
      setNewPassword('');
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error updating password.');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '850px' }}>
      <div>
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
          Settings & Integrations
        </h2>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#a1a1aa' }}>
          Manage your Groq AI API keys, admin credentials, and Cloudflare D1 database connection.
        </p>
      </div>

      {statusMsg && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#4ade80',
            fontSize: '13px',
          }}
        >
          {statusMsg}
        </div>
      )}

      {errorMsg && (
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171',
            fontSize: '13px',
          }}
        >
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Groq API Integration Card */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: '#818cf8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <CardTitle>Groq AI API Integration</CardTitle>
                <CardDescription>Powers real-time blog generation & SEO metadata generation</CardDescription>
              </div>
            </div>

            {hasGroqKey ? (
              <Badge variant="success">● Connected</Badge>
            ) : (
              <Badge variant="warning">Setup Needed</Badge>
            )}
          </div>
        </CardHeader>

        <form onSubmit={handleSaveGroqKey}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                Groq API Key (`gsk_...`)
              </label>
              <Input
                type="password"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder={hasGroqKey ? '•••••••••••••••••••• (API Key Configured)' : 'gsk_xxxxxxxxxxxxxxxxxxxx'}
                style={{ fontFamily: 'monospace' }}
              />
              <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#71717a' }}>
                Get your key at <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" style={{ color: '#818cf8' }}>console.groq.com</a>. Model used: <code style={{ color: '#c084fc' }}>llama-3.3-70b-versatile</code>.
              </p>
            </div>

            {testResult && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  color: '#c7d2fe',
                  fontSize: '12px',
                }}
              >
                ✓ {testResult}
              </div>
            )}
          </CardContent>

          <CardFooter style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              type="button"
              variant="outline"
              onClick={handleTestGroq}
              loading={testingKey}
            >
              <RefreshCw size={14} /> Test AI Connection
            </Button>

            <Button
              type="submit"
              variant="gradient"
              loading={savingKey}
            >
              <Key size={14} /> Save Groq API Key
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Admin Password Card */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                color: '#facc15',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Shield size={18} />
            </div>
            <div>
              <CardTitle>Admin Credentials</CardTitle>
              <CardDescription>Update dashboard administrator password in Cloudflare D1 `credentials` table</CardDescription>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleChangePassword}>
          <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                  Admin Username
                </label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                  New Password
                </label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New strong password"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="secondary"
              loading={savingPassword}
            >
              Update Admin Password
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Cloudflare D1 Status Card */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  color: '#4ade80',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Database size={18} />
              </div>
              <div>
                <CardTitle>Cloudflare D1 Database</CardTitle>
                <CardDescription>Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335 (revlytics-db)</CardDescription>
              </div>
            </div>
            <Badge variant="success">● Connected & Synced</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            <div style={{ padding: '14px', backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', fontWeight: 600 }}>Credentials Table</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>`credentials`</div>
              <div style={{ fontSize: '12px', color: '#4ade80', marginTop: '2px' }}>Active & Hashed</div>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', fontWeight: 600 }}>Service Details</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>`service_details`</div>
              <div style={{ fontSize: '12px', color: '#818cf8', marginTop: '2px' }}>21 Schema Columns</div>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: '11px', color: '#71717a', textTransform: 'uppercase', fontWeight: 600 }}>Article CMS</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', marginTop: '4px' }}>`rev_db` & `blogs`</div>
              <div style={{ fontSize: '12px', color: '#c084fc', marginTop: '2px' }}>Live Structured Data</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsDashboard;
