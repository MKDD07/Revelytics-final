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
  X,
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

  // Dialog State: AI Generation Modal
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState('');
  const [aiTone, setAiTone] = useState('Luxury & Authoritative');
  const [aiKeywords, setAiKeywords] = useState('direct bookings, boutique resort, hospitality UX');
  const [aiAudience, setAiAudience] = useState('Luxury Hotel Owners & Resort General Managers');
  const [isGenerating, setIsGenerating] = useState(false);

  // Dialog State: Edit/Create Article Modal
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleItem>({
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
    sections_h2_para: [],
    tags: ['DirectBookings', 'HospitalityTech'],
  });

  const [rawSectionsJson, setRawSectionsJson] = useState('[]');
  const [rawTagsJson, setRawTagsJson] = useState('[]');

  // Load articles from D1
  const loadArticles = async () => {
    setLoading(true);
    setErrorMsg('');
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

  const handleNewArticle = () => {
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
      sections_h2_para: [
        { title: 'The Direct Booking Imperative in 2026', para: 'Why luxury resorts must rethink their guest acquisition...' },
        { title: 'Designing Frictionless Mobile Funnels', para: 'Key conversion engineering patterns for mobile checkout...' }
      ],
      tags: ['HospitalityTech', 'DirectBookings'],
    };
    setEditingArticle(initial);
    setRawSectionsJson(JSON.stringify(initial.sections_h2_para, null, 2));
    setRawTagsJson(JSON.stringify(initial.tags, null, 2));
    setIsEditorOpen(true);
  };

  const handleEditArticle = (item: ArticleItem) => {
    setEditingArticle(item);
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
    setIsEditorOpen(true);
  };

  const handleGenerateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
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
          topic: aiTopic,
          tone: aiTone,
          keywords: aiKeywords,
          targetAudience: aiAudience,
          model: selectedModel,
        }),
      });

      const data = (await res.json()) as any;
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate blog. Verify your Groq API key.');
      }

      const generated = data.data;
      setEditingArticle(generated);
      setRawSectionsJson(JSON.stringify(generated.sections_h2_para || [], null, 2));
      setRawTagsJson(JSON.stringify(generated.tags || [], null, 2));

      setIsAiModalOpen(false);
      setIsEditorOpen(true);
      setSuccessMsg('✨ Article generated with Groq AI! Review and publish below.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Groq AI generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveArticle = async () => {
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
        ...editingArticle,
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

      setIsEditorOpen(false);
      setSuccessMsg(`✓ Article "${editingArticle.heading}" published to Cloudflare D1!`);
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
            className="btn btn--primary"
            onClick={() => setIsAiModalOpen(true)}
          >
            <Sparkles size={14} /> New AI Blog with Groq
          </button>

          <button
            className="btn btn--outline"
            onClick={handleNewArticle}
          >
            <Plus size={14} /> New Blank Article
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
              <p className="empty-state__hint">Generate your first travel article with Groq AI in seconds.</p>
              <button className="btn btn--primary btn--sm" onClick={() => setIsAiModalOpen(true)}>
                <Sparkles size={13} /> Generate with Groq AI
              </button>
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
                          onClick={() => handleEditArticle(art)}
                          className="table-action"
                        >
                          <Edit size={12} /> Edit
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

      {/* Groq AI Blog Generator Modal */}
      {isAiModalOpen && (
        <div className="dialog-overlay" onClick={() => setIsAiModalOpen(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog__header">
              <div>
                <h3 className="dialog__title">✨ Generate SEO Travel Article with Groq AI</h3>
                <p className="dialog__description">
                  Select your preferred LLM model and generate comprehensive structured articles.
                </p>
              </div>
              <button
                className="dialog__close"
                onClick={() => setIsAiModalOpen(false)}
                aria-label="Close dialog"
              >
                <X size={15} />
              </button>
            </div>
            <div className="dialog__body">
              <form onSubmit={handleGenerateBlog} className="stack-4">
                <div className="field">
                  <label className="field__label">Article Topic / Focus Subject *</label>
                  <input
                    type="text"
                    className="input"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="e.g. How Luxury Eco-Resorts Triple Direct Bookings with Frictionless Mobile UX"
                    required
                  />
                </div>

                <div className="grid-2">
                  <div className="field">
                    <label className="field__label">Editorial Tone</label>
                    <input
                      type="text"
                      className="input"
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value)}
                      placeholder="Luxury & Authoritative"
                    />
                  </div>

                  <div className="field">
                    <label className="field__label">Target Audience</label>
                    <input
                      type="text"
                      className="input"
                      value={aiAudience}
                      onChange={(e) => setAiAudience(e.target.value)}
                      placeholder="Luxury Resort Directors"
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="field__label">SEO Keywords to Target (Comma separated)</label>
                  <input
                    type="text"
                    className="input"
                    value={aiKeywords}
                    onChange={(e) => setAiKeywords(e.target.value)}
                    placeholder="direct bookings, boutique resort, hospitality UX, CRS integration"
                  />
                </div>

                <div className="field">
                  <div className="field__label-row">
                    <label className="field__label">
                      <Cpu size={14} color="var(--color-purple-text)" /> Groq LLM Model
                    </label>
                    <span className="text-mono" style={{ fontSize: '11px', color: 'var(--color-purple-text)' }}>
                      {selectedModel}
                    </span>
                  </div>
                  <select
                    className="select"
                    value={selectedModel}
                    onChange={(e) => {
                      setSelectedModel(e.target.value);
                      setStoredGroqModel(e.target.value);
                    }}
                  >
                    <optgroup label="Meta Llama">
                      <option value="llama-3.3-70b-versatile">llama-3.3-70b-versatile (Recommended - 128k)</option>
                      <option value="llama-3.1-70b-versatile">llama-3.1-70b-versatile</option>
                      <option value="llama-3.1-8b-instant">llama-3.1-8b-instant (Ultra Fast)</option>
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

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => setIsAiModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn--primary"
                    disabled={isGenerating}
                  >
                    {isGenerating ? <span className="btn__spinner" /> : <Sparkles size={14} />}
                    <span>{isGenerating ? 'Generating...' : 'Generate Article Now'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Review Article Modal */}
      {isEditorOpen && (
        <div className="dialog-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog__header">
              <div>
                <h3 className="dialog__title">
                  {editingArticle.heading ? `Edit Article: ${editingArticle.heading}` : 'Create New Article'}
                </h3>
                <p className="dialog__description">Review, modify, and publish this article to Cloudflare D1.</p>
              </div>
              <button
                className="dialog__close"
                onClick={() => setIsEditorOpen(false)}
                aria-label="Close dialog"
              >
                <X size={15} />
              </button>
            </div>
            <div className="dialog__body">
              <div className="stack-4">
                {/* Title & Slug */}
                <div className="grid-2">
                  <div className="field">
                    <label className="field__label">Article Heading (`heading` / H1) *</label>
                    <input
                      type="text"
                      className="input"
                      value={editingArticle.heading}
                      onChange={(e) => setEditingArticle({ ...editingArticle, heading: e.target.value })}
                      required
                    />
                  </div>

                  <div className="field">
                    <label className="field__label">URL Slug (`slug`) *</label>
                    <input
                      type="text"
                      className="input"
                      value={editingArticle.slug}
                      onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
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
                      value={editingArticle.meta_heading || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, meta_heading: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label className="field__label">Meta Description (`meta_data`)</label>
                    <input
                      type="text"
                      className="input"
                      value={editingArticle.meta_data || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, meta_data: e.target.value })}
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
                      value={editingArticle.category || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label className="field__label">Author</label>
                    <input
                      type="text"
                      className="input"
                      value={editingArticle.author || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                    />
                  </div>

                  <div className="field">
                    <label className="field__label">Date (YYYY-MM-DD)</label>
                    <input
                      type="text"
                      className="input"
                      value={editingArticle.date || ''}
                      onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                    />
                  </div>
                </div>

                {/* Featured Image URL */}
                <div className="field">
                  <label className="field__label">Featured Image URL (`image_url`)</label>
                  <input
                    type="text"
                    className="input"
                    value={editingArticle.image_url || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, image_url: e.target.value })}
                  />
                </div>

                {/* Executive Summary */}
                <div className="field">
                  <label className="field__label">Executive Summary (`description`)</label>
                  <textarea
                    className="textarea"
                    value={editingArticle.description || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
                  />
                </div>

                {/* Narrative Paragraph */}
                <div className="field">
                  <label className="field__label">Intro Narrative Paragraph (`paragraph`)</label>
                  <textarea
                    className="textarea"
                    value={editingArticle.paragraph || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, paragraph: e.target.value })}
                  />
                </div>

                {/* Highlight Quote */}
                <div className="field">
                  <label className="field__label">Highlight Quote (`useful_quote`)</label>
                  <input
                    type="text"
                    className="input"
                    value={editingArticle.useful_quote || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, useful_quote: e.target.value })}
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

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={() => setIsEditorOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={handleSaveArticle}
                    disabled={isSaving}
                  >
                    {isSaving ? <span className="btn__spinner" /> : <CheckCircle2 size={14} />}
                    <span>{isSaving ? 'Publishing...' : 'Publish to Cloudflare D1'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;
