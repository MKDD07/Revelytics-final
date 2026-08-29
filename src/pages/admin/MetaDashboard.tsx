import React, { useState, useEffect } from 'react';
import './main-dashboard.css';
import { Sparkles, Save, CheckCircle2, Search, Code2, AlertCircle, RefreshCw, Cpu } from 'lucide-react';
import { getMetadataForPath } from '../../utils/seoData';
import { getStoredGroqModel, setStoredGroqModel } from '../../utils/groqModels';

export const MetaDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'core' | 'services'>('services');
  const [selectedSlug, setSelectedSlug] = useState('luxury-resort-branding');
  const [selectedModel, setSelectedModel] = useState(getStoredGroqModel());
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Form State matching D1 `service_details` schema
  const [formData, setFormData] = useState({
    slug: 'luxury-resort-branding',
    service_name: 'Luxury Resort Branding',
    category: 'Branding & Identity',
    meta_title: 'Luxury Resort Branding & Visual Identity | Revlytics',
    meta_description: 'Elevate your luxury resort with bespoke brand strategy, kinetic visual design, and premium experiential identity crafted for direct bookings.',
    meta_keywords: 'luxury resort branding, hospitality brand strategy, hotel visual identity, luxury resort marketing',
    og_image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    summary: 'Crafting indelible identities that turn luxury boutique properties into must-visit global travel destinations.',
    features: JSON.stringify(['+ Immersive Brand Positioning', '+ Visual & Kinetic Identity Systems', '+ Touchpoint & Amenity Design', '+ Direct Booking Storytelling'], null, 2),
    approach_title: 'Our Methodological Design Architecture',
    approach_steps: JSON.stringify([
      { title: 'Discovery & Heritage', text: 'Immersion into resort history, guest demographics, and landscape.' },
      { title: 'Visual & Kinetic Systems', text: 'Creation of typography, fluid design tokens, and digital guidelines.' },
      { title: 'Direct Booking Funnel', text: 'Translating brand equity into direct reservations and loyalty.' }
    ], null, 2),
    process_title: '4-Step Travel Brand Acceleration',
    process_steps: JSON.stringify([
      { step: '01', title: 'Brand Audit & Positioning', desc: 'Analyzing existing brand perception and direct booking gaps.' },
      { step: '02', title: 'Sensory Identity System', desc: 'Crafting palettes, typography, and interactive digital design.' },
      { step: '03', title: 'Web Experience Rollout', desc: 'Implementing fast, conversion-engineered direct booking pages.' },
      { step: '04', title: 'Launch & Guest Acquisition', desc: 'Deploying multi-channel campaigns to maximize direct guests.' }
    ], null, 2),
    process_cta_text: 'Start Brand Transformation',
    process_cta_link: '/contact',
    pexels_query_2: 'luxury resort hotel pool tropical',
    why_choose_subtitle: 'Why Hospitality Leaders Trust Revlytics',
    why_choose_title: 'Engineered for High Direct Booking Yield',
    why_choose_items: JSON.stringify([
      { title: '40%+ Higher Direct Yield', desc: 'Eliminate high OTA commissions with brand loyalty.' },
      { title: 'Sub-Second Page Performance', desc: 'Lighthouse 95+ speed on all mobile devices.' },
      { title: 'Tailored Hospitality CRS/PMS', desc: 'Direct integrations with SynXis, Cloudbeds, Mews.' }
    ], null, 2),
    faqs: JSON.stringify([
      { question: 'How long does a resort branding transformation take?', answer: 'Typically 3 to 6 weeks from strategy to rollout.' },
      { question: 'Can you work with our existing booking engine?', answer: 'Yes, we integrate seamlessly with major hotel CRS and PMS platforms.' }
    ], null, 2),
    schema_markup: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Luxury Resort Branding',
      provider: { '@type': 'Organization', name: 'Revlytics' },
    }, null, 2),
  });

  const corePageSlugs = [
    { slug: 'home', name: 'Home Page (/)' },
    { slug: 'services', name: 'Services Index (/services)' },
    { slug: 'blog', name: 'Blog Index (/blog)' },
    { slug: 'faq', name: 'FAQ Page (/faq)' },
    { slug: 'contact', name: 'Contact Page (/contact)' },
  ];

  const serviceSlugs = [
    { slug: 'luxury-resort-branding', name: 'Luxury Resort Branding' },
    { slug: 'direct-booking-engine-ux', name: 'Direct Booking Engine UX' },
    { slug: 'destination-marketing-seo', name: 'Destination Marketing & SEO' },
    { slug: 'virtual-travel-experience-3d', name: 'Virtual Travel Experience & 3D' },
    { slug: 'hospitality-mobile-app-suite', name: 'Hospitality Mobile App Suite' },
    { slug: 'ui-ux-design', name: 'UI/UX Design' },
    { slug: 'web-development', name: 'Web Development' },
    { slug: 'brand-identity', name: 'Brand Identity' },
    { slug: 'digital-marketing', name: 'Digital Marketing' },
    { slug: 'motion-graphics', name: 'Motion Graphics' },
  ];

  // Load metadata when selected slug changes
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      setErrorMsg('');

      try {
        if (selectedCategory === 'services') {
          const res = await fetch(`/api/service-details/${selectedSlug}`);
          if (res.ok) {
            const json = (await res.json()) as any;
            if (json.data && isMounted) {
              const d = json.data;
              setFormData({
                slug: selectedSlug,
                service_name: d.service_name || selectedSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                category: d.category || 'Services',
                meta_title: d.meta_title || `${d.service_name || selectedSlug} | Revlytics`,
                meta_description: d.meta_description || 'Transform your hospitality brand with Revlytics digital acceleration.',
                meta_keywords: d.meta_keywords || 'hospitality, direct bookings, travel digital',
                og_image: d.og_image || 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
                summary: d.summary || '',
                features: typeof d.features === 'string' ? d.features : JSON.stringify(d.features || [], null, 2),
                approach_title: d.approach_title || '',
                approach_steps: typeof d.approach_steps === 'string' ? d.approach_steps : JSON.stringify(d.approach_steps || [], null, 2),
                process_title: d.process_title || '',
                process_steps: typeof d.process_steps === 'string' ? d.process_steps : JSON.stringify(d.process_steps || [], null, 2),
                process_cta_text: d.process_cta_text || 'Inquire Now',
                process_cta_link: d.process_cta_link || '/contact',
                pexels_query_2: d.pexels_query_2 || '',
                why_choose_subtitle: d.why_choose_subtitle || '',
                why_choose_title: d.why_choose_title || '',
                why_choose_items: typeof d.why_choose_items === 'string' ? d.why_choose_items : JSON.stringify(d.why_choose_items || [], null, 2),
                faqs: typeof d.faqs === 'string' ? d.faqs : JSON.stringify(d.faqs || [], null, 2),
                schema_markup: typeof d.schema_markup === 'string' ? d.schema_markup : JSON.stringify(d.schema_markup || {}, null, 2),
              });
              setLoading(false);
              return;
            }
          }
        }

        const meta = getMetadataForPath(selectedCategory === 'services' ? `/services/${selectedSlug}` : selectedSlug === 'home' ? '/' : `/${selectedSlug}`);
        if (isMounted) {
          setFormData((prev) => ({
            ...prev,
            slug: selectedSlug,
            service_name: selectedSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            meta_title: meta.title,
            meta_description: meta.description,
            meta_keywords: meta.keywords,
            og_image: meta.ogImage,
            schema_markup: JSON.stringify(meta.schema, null, 2),
          }));
        }
      } catch (err: any) {
        console.warn('Failed to load detail:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => {
      isMounted = false;
    };
  }, [selectedSlug, selectedCategory]);

  // AI Generator via Groq API
  const handleAIGenerate = async () => {
    setAiGenerating(true);
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
          pageType: selectedCategory === 'services' ? 'service' : 'page',
          name: formData.service_name || selectedSlug,
          description: formData.meta_description,
          keywords: formData.meta_keywords,
          model: selectedModel,
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'AI generation failed. Check your Groq API key in Settings.');
      }

      const ai = data.data;
      setFormData((prev) => ({
        ...prev,
        meta_title: ai.meta_title || prev.meta_title,
        meta_description: ai.meta_description || prev.meta_description,
        meta_keywords: ai.meta_keywords || prev.meta_keywords,
      }));
    } catch (err: any) {
      setErrorMsg(err.message || 'Groq AI generation error');
    } finally {
      setAiGenerating(false);
    }
  };

  // Save changes to D1
  const handleSave = async () => {
    setSaveStatus('saving');
    setErrorMsg('');

    try {
      const token = localStorage.getItem('revlytics_admin_token');

      if (selectedCategory === 'services') {
        const res = await fetch('/api/admin/service-details', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        const data = (await res.json()) as any;
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to save to service_details in D1');
        }
      } else {
        const res = await fetch('/api/admin/pages-meta', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            pageName: selectedSlug,
            slug: selectedSlug === 'home' ? 'home-hero' : selectedSlug,
            meta_title: formData.meta_title,
            meta_description: formData.meta_description,
            meta_keywords: formData.meta_keywords,
            og_image: formData.og_image,
          }),
        });
        const data = (await res.json()) as any;
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to save page meta in D1');
        }
      }

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2500);
    } catch (err: any) {
      setSaveStatus('error');
      setErrorMsg(err.message || 'Error saving to database');
    }
  };

  return (
    <div>
      {/* Top Action Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            Page Metadata & Service Details
          </h2>
          <p className="admin-page-desc">
            Manage live SEO meta tags, Google SERP snippet previews, and Cloudflare D1 `service_details`.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px' }}>
          {/* Model Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '4px 8px' }}>
            <Cpu size={14} color="#7e22ce" />
            <select
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setStoredGroqModel(e.target.value);
              }}
              style={{ background: 'transparent', border: 'none', fontSize: '12px', color: '#0f172a', outline: 'none', cursor: 'pointer' }}
            >
              <optgroup label="Meta Llama">
                <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile</option>
                <option value="llama-3.1-70b-versatile">llama-3.1-70b-versatile</option>
                <option value="llama-3.1-8b-instant">llama-3.1-8b-instant</option>
                <option value="llama-3.2-11b-vision-preview">llama-3.2-11b-vision-preview</option>
              </optgroup>
              <optgroup label="OpenAI">
                <option value="openai/gpt-oss-120b">openai/gpt-oss-120b</option>
                <option value="openai/gpt-oss-20b">openai/gpt-oss-20b</option>
              </optgroup>
              <optgroup label="Alibaba Cloud (Qwen)">
                <option value="qwen/qwen3.6-27b">qwen/qwen3.6-27b</option>
                <option value="qwen/qwen3.8-27b">qwen/qwen3.8-27b</option>
              </optgroup>
              <optgroup label="DeepSeek & Mistral">
                <option value="deepseek-r1-distill-llama-70b">deepseek-r1-distill-llama-70b</option>
                <option value="mixtral-8x7b-32768">mixtral-8x7b-32768</option>
                <option value="gemma2-9b-it">gemma2-9b-it</option>
              </optgroup>
            </select>
          </div>

          <button
            className="admin-btn admin-btn-outline"
            onClick={handleAIGenerate}
            disabled={aiGenerating}
          >
            <Sparkles size={14} color="#6366f1" /> {aiGenerating ? 'Generating...' : 'Generate with Groq AI'}
          </button>

          <button
            className="admin-btn admin-btn-gradient"
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saved' ? (
              <>
                <CheckCircle2 size={14} /> Saved to D1
              </>
            ) : (
              <>
                <Save size={14} /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="admin-alert-error">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="admin-layout-sidebar">
        {/* Page Selector Sidebar */}
        <div className="admin-card" style={{ height: 'fit-content' }}>
          <div className="admin-card-header">
            <div>
              <h3 className="admin-card-title">Select Page</h3>
              <div className="admin-card-subtitle">Choose route to edit</div>
            </div>
          </div>
          <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Category Toggle */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', background: '#f1f5f9', padding: '4px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <button
                onClick={() => {
                  setSelectedCategory('services');
                  setSelectedSlug(serviceSlugs[0].slug);
                }}
                className={`admin-tab-btn ${selectedCategory === 'services' ? 'active' : ''}`}
                style={{ justifyContent: 'center' }}
              >
                Services (10)
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('core');
                  setSelectedSlug(corePageSlugs[0].slug);
                }}
                className={`admin-tab-btn ${selectedCategory === 'core' ? 'active' : ''}`}
                style={{ justifyContent: 'center' }}
              >
                Core Pages (5)
              </button>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '480px', overflowY: 'auto' }}>
              {(selectedCategory === 'services' ? serviceSlugs : corePageSlugs).map((p) => {
                const isActive = selectedSlug === p.slug;
                return (
                  <button
                    key={p.slug}
                    onClick={() => setSelectedSlug(p.slug)}
                    className={`admin-page-item ${isActive ? 'active' : ''}`}
                  >
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{p.name}</span>
                    {isActive && <div className="admin-status-dot" style={{ backgroundColor: '#6366f1' }} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* SERP Google Preview Card */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={16} color="#6366f1" />
                <h3 className="admin-card-title">Google Search SERP Snippet Preview</h3>
              </div>
              <span className="admin-badge admin-badge-outline">SERP Preview</span>
            </div>
            <div className="admin-card-body">
              <div className="admin-serp-box">
                <div className="admin-serp-url">
                  https://www.revlytics.in › {selectedCategory === 'services' ? `services › ${selectedSlug}` : selectedSlug}
                </div>
                <div className="admin-serp-title">
                  {formData.meta_title || 'Revlytics | High-Performance Travel Digital Agency'}
                </div>
                <div className="admin-serp-snippet">
                  {formData.meta_description || 'Revlytics is a travel digital acceleration agency helping luxury resorts scale direct bookings.'}
                </div>
              </div>
            </div>
          </div>

          {/* Form Fields: Meta Title, Description, Keywords */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div>
                <h3 className="admin-card-title">Core SEO & OpenGraph Meta Tags</h3>
                <div className="admin-card-subtitle">Target character counts ensure ideal search engine display.</div>
              </div>
            </div>
            <div className="admin-card-body">
              {/* Meta Title */}
              <div className="admin-form-group">
                <div className="admin-form-label">
                  <span>{'SEO Meta Title Tag (<title>)'}</span>
                  <span className="admin-code-font" style={{ color: formData.meta_title.length > 60 ? '#dc2626' : '#16a34a' }}>
                    {formData.meta_title.length} / 60 chars (Ideal: 50-60)
                  </span>
                </div>
                <input
                  type="text"
                  className="admin-input"
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  placeholder="Service Name | Revlytics"
                />
              </div>

              {/* Meta Description */}
              <div className="admin-form-group">
                <div className="admin-form-label">
                  <span>{'Meta Description (<meta name="description">)'}</span>
                  <span className="admin-code-font" style={{ color: formData.meta_description.length > 165 || formData.meta_description.length < 120 ? '#d97706' : '#16a34a' }}>
                    {formData.meta_description.length} / 160 chars (Ideal: 140-160)
                  </span>
                </div>
                <textarea
                  className="admin-textarea"
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="Compelling description summarizing the offering and encouraging direct booking inquiries..."
                  style={{ minHeight: '70px' }}
                />
              </div>

              {/* Keywords & OG Image */}
              <div className="admin-grid-2">
                <div className="admin-form-group">
                  <div className="admin-form-label">
                    <span>Keywords</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.meta_keywords}
                    onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                    placeholder="hospitality, direct bookings, resort branding"
                  />
                </div>

                <div className="admin-form-group">
                  <div className="admin-form-label">
                    <span>OpenGraph Image URL (Absolute HTTPS)</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.og_image}
                    onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                    placeholder="https://images.pexels.com/..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* D1 `service_details` Specific Columns (If category is service) */}
          {selectedCategory === 'services' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h3 className="admin-card-title">Cloudflare D1 `service_details` Schema Columns</h3>
                  <div className="admin-card-subtitle">
                    Full 21-column database mapping for `{formData.slug}`
                  </div>
                </div>
                <span className="admin-badge admin-badge-purple">service_details</span>
              </div>
              <div className="admin-card-body">
                {/* Service Name & Category */}
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <div className="admin-form-label">
                      <span>Service Name (`service_name`)</span>
                    </div>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.service_name}
                      onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <div className="admin-form-label">
                      <span>Category (`category`)</span>
                    </div>
                    <input
                      type="text"
                      className="admin-input"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                </div>

                {/* Summary */}
                <div className="admin-form-group">
                  <div className="admin-form-label">
                    <span>Executive Summary (`summary`)</span>
                  </div>
                  <textarea
                    className="admin-textarea"
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Summary paragraph displayed in hero and overview..."
                  />
                </div>

                {/* Features & Approach Title */}
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <div className="admin-form-label">
                      <span>Features (`features` JSON)</span>
                    </div>
                    <textarea
                      className="admin-textarea admin-code-font"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <div className="admin-form-label">
                      <span>Approach Steps (`approach_steps` JSON)</span>
                    </div>
                    <textarea
                      className="admin-textarea admin-code-font"
                      value={formData.approach_steps}
                      onChange={(e) => setFormData({ ...formData, approach_steps: e.target.value })}
                    />
                  </div>
                </div>

                {/* Process Steps & Why Choose */}
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <div className="admin-form-label">
                      <span>Process Steps (`process_steps` JSON)</span>
                    </div>
                    <textarea
                      className="admin-textarea admin-code-font"
                      value={formData.process_steps}
                      onChange={(e) => setFormData({ ...formData, process_steps: e.target.value })}
                    />
                  </div>

                  <div className="admin-form-group">
                    <div className="admin-form-label">
                      <span>Why Choose Items (`why_choose_items` JSON)</span>
                    </div>
                    <textarea
                      className="admin-textarea admin-code-font"
                      value={formData.why_choose_items}
                      onChange={(e) => setFormData({ ...formData, why_choose_items: e.target.value })}
                    />
                  </div>
                </div>

                {/* Service Specific FAQs */}
                <div className="admin-form-group">
                  <div className="admin-form-label">
                    <span>Service Specific FAQs (`faqs` JSON)</span>
                  </div>
                  <textarea
                    className="admin-textarea admin-code-font"
                    value={formData.faqs}
                    onChange={(e) => setFormData({ ...formData, faqs: e.target.value })}
                  />
                </div>

                {/* Pexels Query 2 */}
                <div className="admin-form-group">
                  <div className="admin-form-label">
                    <span>Pexels Visual Stream Query (`pexels_query_2`)</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={formData.pexels_query_2}
                    onChange={(e) => setFormData({ ...formData, pexels_query_2: e.target.value })}
                    placeholder="e.g. luxury resort hotel pool tropical"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Schema.org JSON-LD Editor */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code2 size={16} color="#6366f1" />
                <h3 className="admin-card-title">Schema.org JSON-LD Structured Data</h3>
              </div>
              <div className="admin-card-subtitle">{'Injected directly into page <head> for rich Google search result badges.'}</div>
            </div>
            <div className="admin-card-body">
              <textarea
                className="admin-textarea admin-code-font"
                value={formData.schema_markup}
                onChange={(e) => setFormData({ ...formData, schema_markup: e.target.value })}
                style={{ minHeight: '100px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaDashboard;
