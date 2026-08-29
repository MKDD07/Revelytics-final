import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Badge } from '../../components/ui/input';
import { Sparkles, Save, CheckCircle2, Search, Code2 } from 'lucide-react';
import { getMetadataForPath } from '../../utils/seoData';

export const MetaDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'core' | 'services'>('services');
  const [selectedSlug, setSelectedSlug] = useState('luxury-resort-branding');
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
          // Fetch from service-details endpoint
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

        // Fallback to static dictionary
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Action Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Page Metadata & Service Details Dashboard
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#a1a1aa' }}>
            Manage live SEO meta tags, OpenGraph previews, Schema.org JSON-LD, and D1 `service_details` schema.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Button
            variant="outline"
            onClick={handleAIGenerate}
            loading={aiGenerating}
            style={{ borderColor: '#6366f1', color: '#a5b4fc' }}
          >
            <Sparkles size={16} /> Generate with Groq AI
          </Button>

          <Button
            variant="gradient"
            onClick={handleSave}
            loading={saveStatus === 'saving'}
          >
            {saveStatus === 'saved' ? (
              <>
                <CheckCircle2 size={16} /> Saved to D1
              </>
            ) : (
              <>
                <Save size={16} /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

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

      {/* Main Grid: Page Selector on Left, Editor on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '24px' }}>
        {/* Page Selector Sidebar Card */}
        <Card style={{ height: 'fit-content' }}>
          <CardHeader style={{ padding: '16px 20px' }}>
            <CardTitle style={{ fontSize: '15px' }}>Select Page</CardTitle>
            <CardDescription style={{ fontSize: '12px' }}>Choose route to inspect and edit</CardDescription>
          </CardHeader>
          <CardContent style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Category Toggle */}
            <div style={{ display: 'flex', gap: '4px', backgroundColor: '#18181b', padding: '3px', borderRadius: '8px' }}>
              <button
                onClick={() => {
                  setSelectedCategory('services');
                  setSelectedSlug(serviceSlugs[0].slug);
                }}
                style={{
                  flex: 1,
                  padding: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === 'services' ? '#27272a' : 'transparent',
                  color: selectedCategory === 'services' ? '#ffffff' : '#a1a1aa',
                }}
              >
                Services (10)
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('core');
                  setSelectedSlug(corePageSlugs[0].slug);
                }}
                style={{
                  flex: 1,
                  padding: '6px',
                  fontSize: '12px',
                  fontWeight: 500,
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  backgroundColor: selectedCategory === 'core' ? '#27272a' : 'transparent',
                  color: selectedCategory === 'core' ? '#ffffff' : '#a1a1aa',
                }}
              >
                Core Pages (5)
              </button>
            </div>

            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '500px', overflowY: 'auto' }}>
              {(selectedCategory === 'services' ? serviceSlugs : corePageSlugs).map((p) => {
                const isActive = selectedSlug === p.slug;
                return (
                  <button
                    key={p.slug}
                    onClick={() => setSelectedSlug(p.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      textAlign: 'left',
                      border: isActive ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid transparent',
                      backgroundColor: isActive ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                      color: isActive ? '#ffffff' : '#a1a1aa',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span style={{ fontWeight: isActive ? 600 : 400 }}>{p.name}</span>
                    {isActive && <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#818cf8' }} />}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Editor Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* SERP Google Preview Card */}
          <Card>
            <CardHeader style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <CardTitle style={{ fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Search size={16} color="#818cf8" /> Live Google Search SERP Snippet Preview
                </CardTitle>
                <Badge variant="outline">Desktop & Mobile</Badge>
              </div>
            </CardHeader>
            <CardContent style={{ padding: '16px 20px' }}>
              <div
                style={{
                  padding: '14px 18px',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  color: '#1f1f1f',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ fontSize: '12px', color: '#202124', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                  <span>https://www.revlytics.in › {selectedCategory === 'services' ? `services › ${selectedSlug}` : selectedSlug}</span>
                </div>
                <div style={{ fontSize: '18px', color: '#1a0dab', fontWeight: 500, lineHeight: 1.3, marginBottom: '4px' }}>
                  {formData.meta_title || 'Revlytics | Travel Digital Acceleration'}
                </div>
                <div style={{ fontSize: '13px', color: '#4d5156', lineHeight: 1.4 }}>
                  {formData.meta_description || 'Revlytics is a travel digital acceleration agency helping luxury resorts, boutique hotels, and destinations scale direct bookings.'}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Fields: Meta Title, Description, Keywords */}
          <Card>
            <CardHeader>
              <CardTitle>Core SEO & OpenGraph Meta Tags</CardTitle>
              <CardDescription>Target character counts ensure ideal search engine display without truncation.</CardDescription>
            </CardHeader>
            <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Meta Title */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#e4e4e7' }}>
                    {'SEO Meta Title Tag (<title>)'}
                  </label>
                  <span
                    style={{
                      fontSize: '12px',
                      color: formData.meta_title.length > 60 ? '#f87171' : '#4ade80',
                      fontWeight: 500,
                    }}
                  >
                    {formData.meta_title.length} / 60 chars (Ideal: 50-60)
                  </span>
                </div>
                <Input
                  value={formData.meta_title}
                  onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                  placeholder="Service Name | Revlytics"
                />
              </div>

              {/* Meta Description */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 500, color: '#e4e4e7' }}>
                    {'Meta Description (<meta name="description">)'}
                  </label>
                  <span
                    style={{
                      fontSize: '12px',
                      color:
                        formData.meta_description.length > 165 || formData.meta_description.length < 120
                          ? '#facc15'
                          : '#4ade80',
                      fontWeight: 500,
                    }}
                  >
                    {formData.meta_description.length} / 160 chars (Ideal: 140-160)
                  </span>
                </div>
                <Textarea
                  value={formData.meta_description}
                  onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                  placeholder="Compelling description summarizing the offering and encouraging direct booking inquiries..."
                  style={{ minHeight: '75px' }}
                />
              </div>

              {/* Keywords & OG Image URL */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                    Keywords
                  </label>
                  <Input
                    value={formData.meta_keywords}
                    onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                    placeholder="hospitality, direct bookings, resort branding"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                    OpenGraph Image URL (Absolute HTTPS)
                  </label>
                  <Input
                    value={formData.og_image}
                    onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                    placeholder="https://images.pexels.com/..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* D1 `service_details` Specific Columns (If category is service) */}
          {selectedCategory === 'services' && (
            <Card>
              <CardHeader>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <CardTitle>Cloudflare D1 `service_details` Schema Columns</CardTitle>
                    <CardDescription>
                      Full 21-column database mapping for `{formData.slug}`
                    </CardDescription>
                  </div>
                  <Badge variant="purple">D1 Table: service_details</Badge>
                </div>
              </CardHeader>
              <CardContent style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Service Name & Category */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                      Service Name (`service_name`)
                    </label>
                    <Input
                      value={formData.service_name}
                      onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                      Category (`category`)
                    </label>
                    <Input
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                    Executive Summary (`summary`)
                  </label>
                  <Textarea
                    value={formData.summary}
                    onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                    placeholder="Summary paragraph displayed in hero and overview..."
                  />
                </div>

                {/* Features & Approach Title */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                      Features (`features` JSON/Array)
                    </label>
                    <Textarea
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      style={{ fontFamily: 'monospace', fontSize: '12px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                      Approach Steps (`approach_steps` JSON)
                    </label>
                    <Textarea
                      value={formData.approach_steps}
                      onChange={(e) => setFormData({ ...formData, approach_steps: e.target.value })}
                      style={{ fontFamily: 'monospace', fontSize: '12px' }}
                    />
                  </div>
                </div>

                {/* Process Steps & Why Choose Items */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                      Process Steps (`process_steps` JSON)
                    </label>
                    <Textarea
                      value={formData.process_steps}
                      onChange={(e) => setFormData({ ...formData, process_steps: e.target.value })}
                      style={{ fontFamily: 'monospace', fontSize: '12px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                      Why Choose Items (`why_choose_items` JSON)
                    </label>
                    <Textarea
                      value={formData.why_choose_items}
                      onChange={(e) => setFormData({ ...formData, why_choose_items: e.target.value })}
                      style={{ fontFamily: 'monospace', fontSize: '12px' }}
                    />
                  </div>
                </div>

                {/* Service Specific FAQs */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                    Service Specific FAQs (`faqs` JSON)
                  </label>
                  <Textarea
                    value={formData.faqs}
                    onChange={(e) => setFormData({ ...formData, faqs: e.target.value })}
                    style={{ fontFamily: 'monospace', fontSize: '12px' }}
                  />
                </div>

                {/* Pexels Query 2 */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                    Pexels Visual Stream Query (`pexels_query_2`)
                  </label>
                  <Input
                    value={formData.pexels_query_2}
                    onChange={(e) => setFormData({ ...formData, pexels_query_2: e.target.value })}
                    placeholder="e.g. luxury resort hotel pool tropical"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Schema.org JSON-LD Editor */}
          <Card>
            <CardHeader>
              <CardTitle style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code2 size={16} color="#818cf8" /> Schema.org JSON-LD Structured Data
              </CardTitle>
              <CardDescription>{'Injected directly into page <head> for rich Google search result badges.'}</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={formData.schema_markup}
                onChange={(e) => setFormData({ ...formData, schema_markup: e.target.value })}
                style={{ fontFamily: 'monospace', fontSize: '12px', minHeight: '120px' }}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MetaDashboard;
