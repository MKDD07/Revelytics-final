import React, { useState, useEffect } from 'react';
import './main-dashboard.css';
import {
  Sparkles,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Calendar,
  User,
  BookOpen,
  AlertCircle,
  Cpu,
  RefreshCw,
  Play,
  Layers,
} from 'lucide-react';
import { getStoredGroqModel, setStoredGroqModel } from '../../utils/groqModels';

interface ArticleItem {
  id?: number;
  slug: string;
  heading: string;
  subheading?: string;
  meta_heading?: string;
  meta_data?: string;
  category?: string;
  author?: string;
  date?: string;
  image_url?: string;
  description?: string;
  paragraph?: string;
  useful_quote?: string;
  sections_h2_para?: any;
  tags?: any;
  created_at?: string;
}

export const BlogDashboard: React.FC = () => {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState(getStoredGroqModel());
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Inline AI Generator Prompt State (NO MODAL)
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiTone, setAiTone] = useState('Luxury & Authoritative');
  const [aiKeywords, setAiKeywords] = useState('direct bookings, boutique resort, hospitality UX');
  const [aiAudience, setAiAudience] = useState('Luxury Hotel Owners & Resort General Managers');
  const [showAiOptions, setShowAiOptions] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  // Active Draft / Editor State
  const [isSaving, setIsSaving] = useState(false);
  const [activeArticle, setActiveArticle] = useState<ArticleItem>({
    slug: '',
    heading: '',
    meta_heading: '',
    meta_data: '',
    category: 'Travel Insights',
    author: 'Elena Rostova',
    date: new Date().toISOString().split('T')[0],
    image_url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
    description: '',
    paragraph: '',
    useful_quote: '',
    sections_h2_para: [
      { title: 'The Direct Booking Imperative in 2026', para: 'Why luxury resorts must rethink their guest acquisition...' },
      { title: 'Designing Frictionless Mobile Funnels', para: 'Key conversion engineering patterns for mobile checkout...' }
    ],
    tags: ['HospitalityTech', 'DirectBookings'],
  });

  const [rawSectionsJson, setRawSectionsJson] = useState('[]');
  const [rawTagsJson, setRawTagsJson] = useState('[]');

  // Load articles from D1
  const loadArticles = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blogs');
      if (res.ok) {
        const json = (await res.json()) as any;
        if (json.data && Array.isArray(json.data)) {
          setArticles(json.data);
        }
      }
    } catch (err: any) {
      console.warn('Failed to load articles from D1:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const filteredArticles = articles.filter(
    (a) =>
      a.heading?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewBlank = () => {
    const today = new Date().toISOString().split('T')[0];
    const initial: ArticleItem = {
      slug: '',
      heading: '',
      meta_heading: '',
      meta_data: '',
      category: 'Travel Insights',
      author: 'Elena Rostova',
      date: today,
      image_url: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200',
      description: '',
      paragraph: '',
      useful_quote: '',
      sections_h2_para: [],
      tags: ['HospitalityTech', 'DirectBookings'],
    };
    setActiveArticle(initial);
    setRawSectionsJson('[]');
    setRawTagsJson(JSON.stringify(initial.tags, null, 2));
    setCanContinue(false);
  };

  const handleSelectArticle = (item: ArticleItem) => {
    setActiveArticle(item);
    let parsedSections = item.sections_h2_para;
    if (typeof parsedSections === 'string') {
      try {
        parsedSections = JSON.parse(parsedSections);
      } catch {
        parsedSections = [];
      }
    }
    let parsedTags = item.tags;
    if (typeof parsedTags === 'string') {
      try {
        parsedTags = JSON.parse(parsedTags);
      } catch {
        parsedTags = [];
      }
    }
    setRawSectionsJson(JSON.stringify(parsedSections || [], null, 2));
    setRawTagsJson(JSON.stringify(parsedTags || [], null, 2));
    setCanContinue(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Generate or Continue Generation from Prompt (NO MODAL)
  const handleGenerateBlog = async (isContinue = false) => {
    const promptToUse = aiPrompt.trim() || activeArticle.heading;
    if (!promptToUse && !isContinue) {
      setErrorMsg('Please enter a topic or prompt for AI generation.');
      return;
    }

    setIsGenerating(true);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('revlytics_admin_token');
      const res = await fetch('/api/ai/generate-blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          topic: promptToUse,
          prompt: promptToUse,
          tone: aiTone,
          keywords: aiKeywords,
          targetAudience: aiAudience,
          model: selectedModel,
          isContinue,
          currentDraft: isContinue ? activeArticle : undefined,
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate blog. Check your Groq API key in Settings.');
      }

      const generated = data.data;
      const merged: ArticleItem = {
        slug: generated.slug || activeArticle.slug || (generated.heading || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        heading: generated.heading || activeArticle.heading,
        meta_heading: generated.meta_heading || activeArticle.meta_heading || generated.heading,
        meta_data: generated.meta_data || activeArticle.meta_data || generated.description,
        category: generated.category || activeArticle.category || 'Travel Insights',
        author: generated.author || activeArticle.author || 'Elena Rostova',
        date: generated.date || activeArticle.date || new Date().toISOString().split('T')[0],
        image_url: generated.image_url || activeArticle.image_url,
        description: generated.description || activeArticle.description,
        paragraph: generated.paragraph || activeArticle.paragraph,
        useful_quote: generated.useful_quote || activeArticle.useful_quote,
        sections_h2_para: generated.sections_h2_para && generated.sections_h2_para.length > 0 ? generated.sections_h2_para : activeArticle.sections_h2_para,
        tags: generated.tags || activeArticle.tags,
      };

      setActiveArticle(merged);
      setRawSectionsJson(JSON.stringify(merged.sections_h2_para || [], null, 2));
      setRawTagsJson(JSON.stringify(merged.tags || [], null, 2));
      setCanContinue(true);

      setSuccessMsg(isContinue ? '✓ Article generation continued and completed!' : '✨ Blog draft generated from prompt with Groq AI!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Groq AI generation error. You can click "Continue Generation" to resume.');
      setCanContinue(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveArticle = async () => {
    if (!activeArticle.heading || !activeArticle.slug) {
      setErrorMsg('Article Heading and URL Slug are required.');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      let sectionsParsed: any = [];
      let tagsParsed: any = [];
      try {
        sectionsParsed = JSON.parse(rawSectionsJson);
      } catch {
        sectionsParsed = rawSectionsJson;
      }
      try {
        tagsParsed = JSON.parse(rawTagsJson);
      } catch {
        tagsParsed = rawTagsJson;
      }

      const payload = {
        ...activeArticle,
        sections_h2_para: sectionsParsed,
        tags: tagsParsed,
      };

      const token = localStorage.getItem('revlytics_admin_token');
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to publish blog to D1');
      }

      setSuccessMsg(`✓ Article "${activeArticle.heading}" saved and published to Cloudflare D1!`);
      setTimeout(() => setSuccessMsg(''), 4000);
      loadArticles();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error publishing article');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteArticle = async (slug: string) => {
    if (!window.confirm(`Are you sure you want to delete article "${slug}" from Cloudflare D1?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('revlytics_admin_token');
      const res = await fetch(`/api/admin/blogs/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete article');
      }
      setSuccessMsg(`Deleted article "${slug}".`);
      setTimeout(() => setSuccessMsg(''), 3000);
      loadArticles();
    } catch (err: any) {
      setErrorMsg(err.message || 'Error deleting article');
    }
  };

  return (
    <div className="stack-6">
      {/* Top Header */}
      <div className="page-header">
        <div>
          <h2 className="page-header__title">
            Blog CMS & Groq AI Studio
          </h2>
          <p className="page-header__subtitle">
            Generate, edit, and publish high-converting travel hospitality articles directly to Cloudflare D1 (`rev_db`).
          </p>
        </div>

        <div className="page-header__actions">
          <button
            className="btn btn--outline"
            onClick={handleNewBlank}
          >
            <Plus size={14} /> New Blank Article
          </button>

          <button
            className="btn btn--primary"
            onClick={handleSaveArticle}
            disabled={isSaving}
          >
            {isSaving ? <span className="btn__spinner" /> : <CheckCircle2 size={14} />}
            <span>{isSaving ? 'Publishing...' : 'Save & Publish to D1'}</span>
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="alert alert--success">
          <CheckCircle2 size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="alert alert--error">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* INLINE PROMPT GENERATOR (NO MODAL) */}
      <div className="card">
        <div className="card__eyebrow-row">
          <div className="icon-tile icon-tile--indigo">
            <Sparkles size={16} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 className="card__title">✨ Groq AI Prompt-Based Blog Generator</h3>
            <p className="card__description">Enter your topic or prompt below to automatically write structured articles.</p>
          </div>

          <div className="model-select-wrap">
            <Cpu size={14} />
            <select
              className="select--bare"
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                setStoredGroqModel(e.target.value);
              }}
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
        </div>

        <div className="card__content stack-3">
          {/* Main Prompt Field */}
          <div className="field">
            <div className="row row-gap-2">
              <input
                type="text"
                className="input"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleGenerateBlog(false);
                }}
                placeholder="Enter prompt / topic (e.g. How Luxury Eco-Resorts Triple Direct Bookings with Frictionless Mobile UX)..."
              />
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => handleGenerateBlog(false)}
                disabled={isGenerating}
              >
                {isGenerating ? <span className="btn__spinner" /> : <Sparkles size={14} />}
                <span>{isGenerating ? 'Generating...' : 'Generate with Groq'}</span>
              </button>

              {/* Continue If Failed At Between */}
              {canContinue && (
                <button
                  type="button"
                  className="btn btn--outline-indigo"
                  onClick={() => handleGenerateBlog(true)}
                  disabled={isGenerating}
                  title="Resume or complete generation from the current draft"
                >
                  <RefreshCw size={13} />
                  <span>Continue Generation</span>
                </button>
              )}
            </div>
          </div>

          {/* Collapsible Fine-Tuning Options */}
          <div>
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              onClick={() => setShowAiOptions(!showAiOptions)}
              style={{ color: 'var(--color-indigo-text)', padding: '2px 0' }}
            >
              {showAiOptions ? '▲ Hide Prompt Parameters' : '▼ Customize Tone, Keywords & Target Audience'}
            </button>

            {showAiOptions && (
              <div className="grid-3" style={{ marginTop: '10px' }}>
                <div className="field">
                  <label className="field__label">Tone</label>
                  <input
                    type="text"
                    className="input input--sm"
                    value={aiTone}
                    onChange={(e) => setAiTone(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label className="field__label">SEO Keywords</label>
                  <input
                    type="text"
                    className="input input--sm"
                    value={aiKeywords}
                    onChange={(e) => setAiKeywords(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label className="field__label">Target Audience</label>
                  <input
                    type="text"
                    className="input input--sm"
                    value={aiAudience}
                    onChange={(e) => setAiAudience(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ARTICLE EDITOR WORKSPACE */}
      <div className="card">
        <div className="card__header-row">
          <div>
            <h3 className="card__title">
              {activeArticle.heading ? `Editing: ${activeArticle.heading}` : 'Article Workspace'}
            </h3>
            <p className="card__description">Review generated content and edit live columns before publishing</p>
          </div>

          <span className="badge badge--purple">{activeArticle.category || 'Draft'}</span>
        </div>

        <div className="card__content stack-4">
          {/* Title & Slug */}
          <div className="grid-2">
            <div className="field">
              <label className="field__label">Article Heading (`heading` / H1) *</label>
              <input
                type="text"
                className="input"
                value={activeArticle.heading}
                onChange={(e) => setActiveArticle({ ...activeArticle, heading: e.target.value })}
                placeholder="Article Headline"
                required
              />
            </div>

            <div className="field">
              <label className="field__label">URL Slug (`slug`) *</label>
              <input
                type="text"
                className="input"
                value={activeArticle.slug}
                onChange={(e) => setActiveArticle({ ...activeArticle, slug: e.target.value })}
                placeholder="url-safe-kebab-case"
                required
              />
            </div>
          </div>

          {/* Meta Title & Meta Description */}
          <div className="grid-2">
            <div className="field">
              <label className="field__label">SEO Meta Title (`meta_heading`)</label>
              <input
                type="text"
                className="input"
                value={activeArticle.meta_heading || ''}
                onChange={(e) => setActiveArticle({ ...activeArticle, meta_heading: e.target.value })}
              />
            </div>

            <div className="field">
              <label className="field__label">Meta Description (`meta_data`)</label>
              <input
                type="text"
                className="input"
                value={activeArticle.meta_data || ''}
                onChange={(e) => setActiveArticle({ ...activeArticle, meta_data: e.target.value })}
              />
            </div>
          </div>

          {/* Category, Author, Date */}
          <div className="grid-3">
            <div className="field">
              <label className="field__label">Category</label>
              <input
                type="text"
                className="input"
                value={activeArticle.category || ''}
                onChange={(e) => setActiveArticle({ ...activeArticle, category: e.target.value })}
              />
            </div>

            <div className="field">
              <label className="field__label">Author</label>
              <input
                type="text"
                className="input"
                value={activeArticle.author || ''}
                onChange={(e) => setActiveArticle({ ...activeArticle, author: e.target.value })}
              />
            </div>

            <div className="field">
              <label className="field__label">Date (YYYY-MM-DD)</label>
              <input
                type="text"
                className="input"
                value={activeArticle.date || ''}
                onChange={(e) => setActiveArticle({ ...activeArticle, date: e.target.value })}
              />
            </div>
          </div>

          {/* Featured Image URL */}
          <div className="field">
            <label className="field__label">Featured Image URL (`image_url`)</label>
            <input
              type="text"
              className="input"
              value={activeArticle.image_url || ''}
              onChange={(e) => setActiveArticle({ ...activeArticle, image_url: e.target.value })}
            />
          </div>

          {/* Executive Summary */}
          <div className="field">
            <label className="field__label">Executive Summary (`description`)</label>
            <textarea
              className="textarea"
              value={activeArticle.description || ''}
              onChange={(e) => setActiveArticle({ ...activeArticle, description: e.target.value })}
            />
          </div>

          {/* Narrative Paragraph */}
          <div className="field">
            <label className="field__label">Intro Narrative Paragraph (`paragraph`)</label>
            <textarea
              className="textarea"
              value={activeArticle.paragraph || ''}
              onChange={(e) => setActiveArticle({ ...activeArticle, paragraph: e.target.value })}
            />
          </div>

          {/* Highlight Quote */}
          <div className="field">
            <label className="field__label">Highlight Quote (`useful_quote`)</label>
            <input
              type="text"
              className="input"
              value={activeArticle.useful_quote || ''}
              onChange={(e) => setActiveArticle({ ...activeArticle, useful_quote: e.target.value })}
            />
          </div>

          {/* H2 Sections */}
          <div className="field">
            <label className="field__label">H2 Sections (`sections_h2_para` JSON Array)</label>
            <textarea
              className="textarea textarea--mono"
              value={rawSectionsJson}
              onChange={(e) => setRawSectionsJson(e.target.value)}
              style={{ minHeight: '120px' }}
            />
          </div>

          {/* Tags */}
          <div className="field">
            <label className="field__label">Tags (`tags` JSON Array)</label>
            <input
              type="text"
              className="input input--mono"
              value={rawTagsJson}
              onChange={(e) => setRawTagsJson(e.target.value)}
            />
          </div>
        </div>

        <div className="card__footer">
          <div className="row row-gap-2">
            {canContinue && (
              <button
                type="button"
                className="btn btn--outline-indigo btn--sm"
                onClick={() => handleGenerateBlog(true)}
                disabled={isGenerating}
              >
                <RefreshCw size={13} />
                <span>Continue AI Writing</span>
              </button>
            )}
          </div>

          <button
            type="button"
            className="btn btn--primary btn--sm"
            onClick={handleSaveArticle}
            disabled={isSaving}
          >
            {isSaving ? <span className="btn__spinner" /> : <CheckCircle2 size={13} />}
            <span>Publish to Cloudflare D1</span>
          </button>
        </div>
      </div>

      {/* Articles Table Card */}
      <div className="card">
        <div className="card__header-row">
          <div>
            <h3 className="card__title">Published Articles in Cloudflare D1</h3>
            <p className="card__description">
              Live CMS articles queryable via `/api/rev_db` and `/blog/:slug`
            </p>
          </div>

          {/* Search Input */}
          <div className="search-field" style={{ width: '220px' }}>
            <Search size={13} />
            <input
              type="text"
              className="input input--sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
            />
          </div>
        </div>

        <div className="card__content card__content--flush">
          {loading ? (
            <div className="empty-state">
              <div className="spinner" />
              <p className="empty-state__title">Loading articles from Cloudflare D1...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={32} />
              <p className="empty-state__title">No articles found</p>
              <p className="empty-state__hint">Type a prompt in the top box to generate your first article with Groq AI.</p>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Article Title & Slug</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Published Date</th>
                  <th className="align-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((art) => (
                  <tr key={art.slug || art.id}>
                    <td>
                      <div className="table-primary-text">
                        {art.heading}
                      </div>
                      <div className="table-sub-text">
                        /blog/{art.slug}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge--purple">{art.category || 'Travel Insights'}</span>
                    </td>
                    <td>
                      <div className="row row-gap-1 text-soft" style={{ fontSize: '12px' }}>
                        <User size={13} color="var(--color-text-faint)" />
                        <span>{art.author || 'Elena Rostova'}</span>
                      </div>
                    </td>
                    <td>
                      <div className="row row-gap-1 text-faint" style={{ fontSize: '12px' }}>
                        <Calendar size={13} />
                        <span>{art.date || art.created_at?.split('T')[0] || '2026-08-29'}</span>
                      </div>
                    </td>
                    <td className="align-right">
                      <div className="table-actions">
                        <a
                          href={`/blog/${art.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="table-action"
                        >
                          <Eye size={12} /> View
                        </a>
                        <button
                          onClick={() => handleSelectArticle(art)}
                          className="table-action"
                        >
                          <Edit size={12} /> Load in Editor
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.slug)}
                          className="table-action table-action--danger"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDashboard;
