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
    <div style={{ maxWidth: '896px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 className="admin-page-title">
          Settings & Integrations
        </h2>
        <p className="admin-page-desc">
          Manage your Groq AI API keys, default model selector, administrator credentials, and Cloudflare D1 database.
        </p>
      </div>

      {statusMsg && (
        <div className="admin-alert-success">
          <CheckCircle2 size={16} />
          <span>{statusMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="admin-alert-error">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Groq API Integration Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#eef2ff', color: '#6366f1', border: '1px solid #c7d2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} />
            </div>
            <div>
              <h3 className="admin-card-title">Groq AI API Integration</h3>
              <div className="admin-card-subtitle">Configure your Groq API key and select your preferred LLM model</div>
            </div>
          </div>

          {hasGroqKey ? (
            <span className="admin-badge admin-badge-success">Connected</span>
          ) : (
            <span className="admin-badge admin-badge-warning">Setup Required</span>
          )}
        </div>

        <form onSubmit={handleSaveGroqKey}>
          <div className="admin-card-body">
            <div className="admin-form-group">
              <div className="admin-form-label">
                <span>Groq API Key (`gsk_...`)</span>
              </div>
              <input
                type="password"
                className="admin-input admin-code-font"
                value={groqKey}
                onChange={(e) => setGroqKey(e.target.value)}
                placeholder={hasGroqKey ? '•••••••••••••••••••• (Configured in D1 credentials)' : 'gsk_xxxxxxxxxxxxxxxxxxxx'}
              />
              <p style={{ fontSize: '11px', color: '#64748b', margin: '6px 0 0 0' }}>
                Get your key at <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" style={{ color: '#6366f1' }}>console.groq.com/keys</a>.
              </p>
            </div>

            {/* Groq Model Selector Option */}
            <div style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
              <div className="admin-form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={14} color="#7e22ce" /> Default AI Model Selection
                </span>
                <span className="admin-code-font" style={{ color: '#7e22ce' }}>
                  Active: {selectedModel}
                </span>
              </div>

              <select
                className="admin-select"
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
                <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
                  <input
                    type="text"
                    className="admin-input admin-code-font"
                    value={customModel}
                    onChange={(e) => setCustomModel(e.target.value)}
                    placeholder="e.g. openai/gpt-oss-120b"
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={handleCustomModelSave}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {testResult && (
              <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '6px', background: '#eef2ff', border: '1px solid #c7d2fe', fontSize: '12px', color: '#4338ca' }}>
                ✓ {testResult}
              </div>
            )}
          </div>

          <div className="admin-card-footer">
            <button
              type="button"
              className="admin-btn admin-btn-outline admin-btn-sm"
              onClick={handleTestGroq}
              disabled={testingKey}
            >
              <RefreshCw size={13} /> {testingKey ? 'Testing...' : 'Test AI Connection'}
            </button>

            <button
              type="submit"
              className="admin-btn admin-btn-gradient admin-btn-sm"
              disabled={savingKey}
            >
              <Key size={13} /> {savingKey ? 'Saving...' : 'Save Groq API Key'}
            </button>
          </div>
        </form>
      </div>

      {/* Admin Password Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Shield size={16} />
            </div>
            <div>
              <h3 className="admin-card-title">Admin Credentials</h3>
              <div className="admin-card-subtitle">Update administrator password in Cloudflare D1 `credentials` table</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleChangePassword}>
          <div className="admin-card-body">
            <div className="admin-grid-2">
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <div className="admin-form-label">
                  <span>Username</span>
                </div>
                <input
                  type="text"
                  className="admin-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <div className="admin-form-label">
                  <span>New Password</span>
                </div>
                <input
                  type="password"
                  className="admin-input"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New strong password"
                />
              </div>
            </div>
          </div>

          <div className="admin-card-footer" style={{ justifyContent: 'flex-end' }}>
            <button
              type="submit"
              className="admin-btn admin-btn-secondary admin-btn-sm"
              disabled={savingPassword}
            >
              {savingPassword ? 'Updating...' : 'Update Admin Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Cloudflare D1 Status Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database size={16} />
            </div>
            <div>
              <h3 className="admin-card-title">Cloudflare D1 Database</h3>
              <div className="admin-card-subtitle">Database ID: 939a2da3-3705-413d-a89f-dd10e1e08335 (revlytics-db)</div>
            </div>
          </div>
          <span className="admin-badge admin-badge-success">Connected</span>
        </div>
        <div className="admin-card-body">
          <div className="admin-grid-3">
            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Credentials Table</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>`credentials`</div>
              <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '2px' }}>Active & Hashed</div>
            </div>

            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Service Details</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>`service_details`</div>
              <div style={{ fontSize: '12px', color: '#6366f1', marginTop: '2px' }}>21 Schema Columns</div>
            </div>

            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Article CMS</div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#0f172a', marginTop: '4px' }}>`rev_db` & `blogs`</div>
              <div style={{ fontSize: '12px', color: '#7e22ce', marginTop: '2px' }}>Live Structured Data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDashboard;
