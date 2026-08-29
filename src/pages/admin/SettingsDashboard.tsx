import React, { useState, useEffect } from 'react';
import './main-dashboard.css';
import { Key, Shield, Database, Sparkles, RefreshCw, AlertCircle, CheckCircle2, Cpu } from 'lucide-react';
import { GROQ_MODELS, getStoredGroqModel, setStoredGroqModel } from '../../utils/groqModels';

export const SettingsDashboard: React.FC = () => {
  const [groqKey, setGroqKey] = useState('');
  const [hasGroqKey, setHasGroqKey] = useState(false);
  const [savingKey, setSavingKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState(getStoredGroqModel());
  const [customModel, setCustomModel] = useState('');
  const [isCustomModel, setIsCustomModel] = useState(false);
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

  const handleModelChange = (modelId: string) => {
    if (modelId === 'custom') {
      setIsCustomModel(true);
    } else {
      setIsCustomModel(false);
      setSelectedModel(modelId);
      setStoredGroqModel(modelId);
    }
  };

  const handleCustomModelSave = () => {
    if (customModel.trim()) {
      setSelectedModel(customModel.trim());
      setStoredGroqModel(customModel.trim());
      setStatusMsg(`✓ Selected custom model: ${customModel.trim()}`);
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

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
      const activeModel = isCustomModel && customModel ? customModel.trim() : selectedModel;
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
          description: 'Testing Groq AI connection',
          model: activeModel,
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Groq connection test failed');
      }

      setTestResult(`Success! Connected to Groq model (${activeModel}). Output: "${data.data?.meta_title || 'OK'}"`);
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
    <div className="stack-6 max-w-form" style={{ margin: '0 auto' }}>
      <div className="page-header">
        <div>
          <h2 className="page-header__title">
            Settings & Integrations
          </h2>
          <p className="page-header__subtitle">
            Manage your Groq AI API keys, default model selector, administrator credentials, and Cloudflare D1 database.
          </p>
        </div>
      </div>

      {statusMsg && (
        <div className="alert alert--success">
          <CheckCircle2 size={16} />
          <span>{statusMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="alert alert--error">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Groq API Integration Card */}
      <div className="card">
        <div className="card__eyebrow-row">
          <div className="icon-tile icon-tile--indigo">
            <Sparkles size={16} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="card__title">Groq AI API Integration</h3>
            <p className="card__description">Configure your Groq API key and select your preferred LLM model</p>
          </div>
          {hasGroqKey ? (
            <span className="badge badge--success">Connected</span>
          ) : (
            <span className="badge badge--warning">Setup Required</span>
          )}
        </div>

        <form onSubmit={handleSaveGroqKey}>
          <div className="card__content stack-4">
            <div className="field">
              <label className="field__label">Groq API Key (`gsk_...`)</label>
              <input
                type="password"
                className="input input--mono"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder={hasGroqKey ? '•••••••••••••••••••• (Configured in D1 credentials)' : 'gsk_xxxxxxxxxxxxxxxxxxxx'}
              />
              <span className="field__hint">
                Get your key at <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" className="link">console.groq.com/keys</a>.
              </span>
            </div>

            {/* Groq Model Selector Option */}
            <div className="field" style={{ paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
              <div className="field__label-row">
                <label className="field__label">
                  <Cpu size={14} color="var(--color-purple-text)" /> Default AI Model Selection
                </label>
                <span className="text-mono" style={{ fontSize: '11px', color: 'var(--color-purple-text)' }}>
                  Active: {selectedModel}
                </span>
              </div>

              <select
                className="select"
                value={isCustomModel ? 'custom' : selectedModel}
                onChange={(e) => handleModelChange(e.target.value)}
              >
                <optgroup label="Meta Llama">
                  <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Recommended - 128k context)</option>
                  <option value="llama-3.1-70b-versatile">llama-3.1-70b-versatile</option>
                  <option value="llama-3.1-8b-instant">llama-3.1-8b-instant (Ultra Fast)</option>
                  <option value="llama-3.2-11b-vision-preview">llama-3.2-11b-vision-preview</option>
                  <option value="meta-llama/llama-prompt-guard-2-86m">meta-llama/llama-prompt-guard-2-86m</option>
                  <option value="meta-llama/llama-prompt-guard-2-22m">meta-llama/llama-prompt-guard-2-22m</option>
                </optgroup>

                <optgroup label="OpenAI">
                  <option value="openai/gpt-oss-120b">openai/gpt-oss-120b</option>
                  <option value="openai/gpt-oss-20b">openai/gpt-oss-20b</option>
                  <option value="openai/gpt-oss-safeguard-20b">openai/gpt-oss-safeguard-20b</option>
                </optgroup>

                <optgroup label="Alibaba Cloud (Qwen)">
                  <option value="qwen/qwen3.6-27b">qwen/qwen3.6-27b</option>
                  <option value="qwen/qwen3.8-27b">qwen/qwen3.8-27b</option>
                </optgroup>

                <optgroup label="DeepSeek & Mistral">
                  <option value="deepseek-r1-distill-llama-70b">deepseek-r1-distill-llama-70b (Reasoning)</option>
                  <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
                  <option value="gemma2-9b-it">gemma2-9b-it</option>
                </optgroup>

                <optgroup label="Groq & Canopy Labs">
                  <option value="groq/compound">groq/compound</option>
                  <option value="groq/compound-mini">groq/compound-mini</option>
                  <option value="canopylabs/orpheus-v1-english">canopylabs/orpheus-v1-english</option>
                  <option value="canopylabs/orpheus-arabic-saudi">canopylabs/orpheus-arabic-saudi</option>
                </optgroup>

                <optgroup label="Custom">
                  <option value="custom">✏️ Enter Custom Groq Model ID...</option>
                </optgroup>
              </select>

              {isCustomModel && (
                <div className="row row-gap-2" style={{ paddingTop: '8px' }}>
                  <input
                    type="text"
                    className="input input--mono"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    placeholder="e.g. openai/gpt-oss-120b"
                  />
                  <button
                    type="button"
                    className="btn btn--outline btn--sm"
                    onClick={handleCustomModelSave}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {testResult && (
              <div className="callout callout--indigo">
                ✓ {testResult}
              </div>
            )}
          </div>

          <div className="card__footer">
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={handleTestGroq}
              disabled={testingKey}
            >
              {testingKey ? <span className="btn__spinner" /> : <RefreshCw size={13} />}
              <span>{testingKey ? 'Testing...' : 'Test AI Connection'}</span>
            </button>

            <button
              type="submit"
              className="btn btn--primary btn--sm"
              disabled={savingKey}
            >
              {savingKey ? <span className="btn__spinner" /> : <Key size={13} />}
              <span>{savingKey ? 'Saving...' : 'Save Groq API Key'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Admin Password Card */}
      <div className="card">
        <div className="card__eyebrow-row">
          <div className="icon-tile icon-tile--amber">
            <Shield size={16} />
          </div>
          <div>
            <h3 className="card__title">Admin Credentials</h3>
            <p className="card__description">Update administrator password in Cloudflare D1 `credentials` table</p>
          </div>
        </div>

        <form onSubmit={handleChangePassword}>
          <div className="card__content">
            <div className="grid-2">
              <div className="field">
                <label className="field__label">Username</label>
                <input
                  type="text"
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="field">
                <label className="field__label">New Password</label>
                <input
                  type="password"
                  className="input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New strong password"
                />
              </div>
            </div>
          </div>

          <div className="card__footer card__footer--end">
            <button
              type="submit"
              className="btn btn--secondary btn--sm"
              disabled={savingPassword}
            >
              {savingPassword ? <span className="btn__spinner" /> : null}
              <span>{savingPassword ? 'Updating...' : 'Update Admin Password'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Cloudflare D1 Status Card */}
      <div className="card">
        <div className="card__header-row">
          <div className="row row-gap-3">
            <div className="icon-tile icon-tile--emerald">
              <Database size={16} />
            </div>
            <div>
              <h3 className="card__title">Cloudflare D1 Database</h3>
              <p className="card__description">Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335 (revlytics-db)</p>
            </div>
          </div>
          <span className="badge badge--success">Connected</span>
        </div>
        <div className="card__content">
          <div className="grid-3">
            <div className="stat-tile">
              <div className="stat-tile__label">Credentials Table</div>
              <div className="stat-tile__value">`credentials`</div>
              <div className="stat-tile__meta stat-tile__meta--emerald">Active & Hashed</div>
            </div>

            <div className="stat-tile">
              <div className="stat-tile__label">Service Details</div>
              <div className="stat-tile__value">`service_details`</div>
              <div className="stat-tile__meta stat-tile__meta--indigo">21 Schema Columns</div>
            </div>

            <div className="stat-tile">
              <div className="stat-tile__label">Article CMS</div>
              <div className="stat-tile__value">`rev_db` & `blogs`</div>
              <div className="stat-tile__meta stat-tile__meta--purple">Live Structured Data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
