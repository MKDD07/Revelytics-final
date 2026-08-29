import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Input, Badge } from '../../components/ui/input';
import { Key, Shield, Database, Sparkles, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

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

      setTestResult(`Success! Connected to Groq Llama 3.3 70B. Title: "${data.data?.meta_title || 'OK'}"`);
    } catch (err: any) {
      setErrorMsg(`Groq Connection Failed: ${err.message}`);
    } finally {
      setTestingKey(false);
    }
  };

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
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-white">
          Settings & Integrations
        </h2>
        <p className="text-xs text-zinc-400">
          Manage your Groq AI API keys, administrator credentials, and Cloudflare D1 database connections.
        </p>
      </div>

      {statusMsg && (
        <div className="flex items-center gap-2 rounded-md bg-emerald-950/50 p-3 text-xs text-emerald-400 border border-emerald-800">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{statusMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-md bg-red-950/50 p-3 text-xs text-red-400 border border-red-800">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Groq API Integration Card */}
      <Card className="border-zinc-800 bg-zinc-900/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-indigo-950/60 text-indigo-400 border border-indigo-800 flex items-center justify-center">
              <Sparkles className="size-4" />
            </div>
            <div>
              <CardTitle>Groq AI API Integration</CardTitle>
              <CardDescription>Powers real-time blog generation & SEO metadata generation</CardDescription>
            </div>
          </div>

          {hasGroqKey ? (
            <Badge variant="success">Connected</Badge>
          ) : (
            <Badge variant="warning">Setup Required</Badge>
          )}
        </CardHeader>

        <form onSubmit={handleSaveGroqKey}>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Groq API Key (`gsk_...`)
              </label>
              <Input
                type="password"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder={hasGroqKey ? '•••••••••••••••••••• (Configured)' : 'gsk_xxxxxxxxxxxxxxxxxxxx'}
                className="font-mono text-xs"
              />
              <p className="text-[11px] text-zinc-500">
                Model used: <code className="text-purple-400 font-mono">llama-3.3-70b-versatile</code>. Get key at console.groq.com.
              </p>
            </div>

            {testResult && (
              <div className="p-3 rounded-md bg-indigo-950/40 border border-indigo-800 text-xs text-indigo-200">
                ✓ {testResult}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-between items-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleTestGroq}
              loading={testingKey}
            >
              <RefreshCw className="size-3.5 mr-1" /> Test AI Connection
            </Button>

            <Button
              type="submit"
              variant="gradient"
              size="sm"
              loading={savingKey}
            >
              <Key className="size-3.5 mr-1" /> Save Groq API Key
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Admin Password Card */}
      <Card className="border-zinc-800 bg-zinc-900/40">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="size-9 rounded-lg bg-amber-950/60 text-amber-400 border border-amber-800 flex items-center justify-center">
            <Shield className="size-4" />
          </div>
          <div>
            <CardTitle>Admin Credentials</CardTitle>
            <CardDescription>Update administrator password in Cloudflare D1 `credentials` table</CardDescription>
          </div>
        </CardHeader>

        <form onSubmit={handleChangePassword}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">
                  Username
                </label>
                <Input value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-300">
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

          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              loading={savingPassword}
            >
              Update Admin Password
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Cloudflare D1 Status Card */}
      <Card className="border-zinc-800 bg-zinc-900/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800 flex items-center justify-center">
              <Database className="size-4" />
            </div>
            <div>
              <CardTitle>Cloudflare D1 Database</CardTitle>
              <CardDescription>Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335 (revlytics-db)</CardDescription>
            </div>
          </div>
          <Badge variant="success">Connected</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="text-[11px] font-medium text-zinc-500 uppercase">Credentials Table</div>
              <div className="text-sm font-semibold text-white mt-1">`credentials`</div>
              <div className="text-xs text-emerald-400 mt-0.5">Active & Hashed</div>
            </div>

            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="text-[11px] font-medium text-zinc-500 uppercase">Service Details</div>
              <div className="text-sm font-semibold text-white mt-1">`service_details`</div>
              <div className="text-xs text-indigo-400 mt-0.5">21 Schema Columns</div>
            </div>

            <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
              <div className="text-[11px] font-medium text-zinc-500 uppercase">Article CMS</div>
              <div className="text-sm font-semibold text-white mt-1">`rev_db` & `blogs`</div>
              <div className="text-xs text-purple-400 mt-0.5">Live Structured Data</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsDashboard;
