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
    <div>
      {/* Top Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-title">
            Blog CMS & Groq AI Studio
          </h2>
          <p className="admin-page-desc">
            Generate, edit, and publish high-converting travel hospitality articles directly to Cloudflare D1 (`rev_db`).
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="admin-btn admin-btn-gradient"
            onClick={() => setIsAiModalOpen(true)}
          >
            <Sparkles size={14} /> New AI Blog with Groq
          </button>

          <button
            className="admin-btn admin-btn-secondary"
            onClick={handleNewArticle}
          >
            <Plus size={14} /> New Blank Article
          </button>
        </div>
      </div>

      {successMsg && (
        <div className="admin-alert-success">
          <CheckCircle2 size={16} />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="admin-alert-error">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Articles Table Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <div>
            <h3 className="admin-card-title">Published Articles in Cloudflare D1</h3>
            <div className="admin-card-subtitle">
              Live CMS articles queryable via `/api/rev_db` and `/blog/:slug`
            </div>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '240px' }}>
            <input
              type="text"
              className="admin-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              style={{ paddingLeft: '32px', height: '34px', fontSize: '12px' }}
            />
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '10px' }} />
          </div>
        </div>

        <div className="admin-table-wrap">
          {loading ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
              <p style={{ fontSize: '13px' }}>Loading articles from Cloudflare D1...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
              <BookOpen size={32} color="#94a3b8" style={{ margin: '0 auto 8px auto', display: 'block' }} />
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#334155', margin: '0 0 4px 0' }}>No articles found</p>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px 0' }}>Generate your first travel article with Groq AI in seconds.</p>
              <button className="admin-btn admin-btn-gradient admin-btn-sm" onClick={() => setIsAiModalOpen(true)}>
                <Sparkles size={13} /> Generate with Groq AI
              </button>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Article Title & Slug</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Published Date</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles.map((art) => (
                  <tr key={art.slug || art.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0f172a' }}>
                        {art.heading}
                      </div>
                      <div className="admin-code-font" style={{ color: '#6366f1', marginTop: '2px' }}>
                        /blog/{art.slug}
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-purple">{art.category || 'Travel Insights'}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569' }}>
                        <User size={13} color="#94a3b8" />
                        {art.author || 'Elena Rostova'}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' }}>
                        <Calendar size={13} color="#94a3b8" />
                        {art.date || art.created_at?.split('T')[0] || '2026-08-29'}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <a
                          href={`/blog/${art.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          <Eye size={12} /> View
                        </a>
                        <button
                          onClick={() => handleEditArticle(art)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          <Edit size={12} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.slug)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
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
        <div className="admin-dialog-overlay" onClick={() => setIsAiModalOpen(false)}>
          <div className="admin-dialog-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-dialog-header">
              <div>
                <h3 className="admin-card-title">✨ Generate SEO Travel Article with Groq AI</h3>
                <div className="admin-card-subtitle">
                  Select your preferred LLM model and generate comprehensive structured articles.
                </div>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="admin-dialog-body">
              <form onSubmit={handleGenerateBlog} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span>Article Topic / Focus Subject *</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="e.g. How Luxury Eco-Resorts Triple Direct Bookings with Frictionless Mobile UX"
                    required
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <div className="admin-form-label">
                      <span>Editorial Tone</span>
                    </div>
                    <input
                      type="text"
                      className="admin-input"
                      value={aiTone}
                      onChange={(e) => setAiTone(e.target.value)}
                      placeholder="Luxury & Authoritative"
                    />
                  </div>

                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <div className="admin-form-label">
                      <span>Target Audience</span>
                    </div>
                    <input
                      type="text"
                      className="admin-input"
                      value={aiAudience}
                      onChange={(e) => setAiAudience(e.target.value)}
                      placeholder="Luxury Resort Directors"
                    />
                  </div>
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span>SEO Keywords to Target (Comma separated)</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={aiKeywords}
                    onChange={(e) => setAiKeywords(e.target.value)}
                    placeholder="direct bookings, boutique resort, hospitality UX, CRS integration"
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Cpu size={14} color="#7e22ce" /> Groq LLM Model
                    </span>
                    <span className="admin-code-font" style={{ color: '#7e22ce' }}>
                      {selectedModel}
                    </span>
                  </div>
                  <select
                    className="admin-select"
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

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '8px' }}>
                  <button
                    type="button"
                    className="admin-btn admin-btn-outline"
                    onClick={() => setIsAiModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="admin-btn admin-btn-gradient"
                    disabled={isGenerating}
                  >
                    <Sparkles size={14} /> {isGenerating ? 'Generating...' : 'Generate Article Now'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit / Review Article Modal */}
      {isEditorOpen && (
        <div className="admin-dialog-overlay" onClick={() => setIsEditorOpen(false)}>
          <div className="admin-dialog-container" onClick={(e) => e.stopPropagation()}>
            <div className="admin-dialog-header">
              <div>
                <h3 className="admin-card-title">
                  {editingArticle.heading ? `Edit Article: ${editingArticle.heading}` : 'Create New Article'}
                </h3>
                <div className="admin-card-subtitle">Review, modify, and publish this article to Cloudflare D1.</div>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={18} />
              </button>
            </div>
            <div className="admin-dialog-body" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Title & Slug */}
              <div className="admin-grid-2">
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span>Article Heading (`heading` / H1) *</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingArticle.heading}
                    onChange={(e) => setEditingArticle({ ...editingArticle, heading: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span>URL Slug (`slug`) *</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingArticle.slug}
                    onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                    placeholder="url-safe-kebab-case"
                    required
                  />
                </div>
              </div>

              {/* Meta Title & Meta Description */}
              <div className="admin-grid-2">
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span>SEO Meta Title (`meta_heading`)</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingArticle.meta_heading || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, meta_heading: e.target.value })}
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span>Meta Description (`meta_data`)</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingArticle.meta_data || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, meta_data: e.target.value })}
                  />
                </div>
              </div>

              {/* Category, Author, Date */}
              <div className="admin-grid-3">
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span>Category</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingArticle.category || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span>Author</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingArticle.author || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
                  />
                </div>

                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <div className="admin-form-label">
                    <span>Date (YYYY-MM-DD)</span>
                  </div>
                  <input
                    type="text"
                    className="admin-input"
                    value={editingArticle.date || ''}
                    onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
                  />
                </div>
              </div>

              {/* Featured Image URL */}
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <div className="admin-form-label">
                  <span>Featured Image URL (`image_url`)</span>
                </div>
                <input
                  type="text"
                  className="admin-input"
                  value={editingArticle.image_url || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, image_url: e.target.value })}
                />
              </div>

              {/* Executive Summary */}
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <div className="admin-form-label">
                  <span>Executive Summary (`description`)</span>
                </div>
                <textarea
                  className="admin-textarea"
                  value={editingArticle.description || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
                  style={{ minHeight: '60px' }}
                />
              </div>

              {/* Narrative Paragraph */}
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <div className="admin-form-label">
                  <span>Intro Narrative Paragraph (`paragraph`)</span>
                </div>
                <textarea
                  className="admin-textarea"
                  value={editingArticle.paragraph || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, paragraph: e.target.value })}
                  style={{ minHeight: '70px' }}
                />
              </div>

              {/* Highlight Quote */}
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <div className="admin-form-label">
                  <span>Highlight Quote (`useful_quote`)</span>
                </div>
                <input
                  type="text"
                  className="admin-input"
                  value={editingArticle.useful_quote || ''}
                  onChange={(e) => setEditingArticle({ ...editingArticle, useful_quote: e.target.value })}
                />
              </div>

              {/* H2 Sections */}
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <div className="admin-form-label">
                  <span>H2 Sections (`sections_h2_para` JSON Array)</span>
                </div>
                <textarea
                  className="admin-textarea admin-code-font"
                  value={rawSectionsJson}
                  onChange={(e) => setRawSectionsJson(e.target.value)}
                  style={{ minHeight: '120px' }}
                />
              </div>

              {/* Tags */}
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <div className="admin-form-label">
                  <span>Tags (`tags` JSON Array)</span>
                </div>
                <input
                  type="text"
                  className="admin-input admin-code-font"
                  value={rawTagsJson}
                  onChange={(e) => setRawTagsJson(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '8px' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  onClick={() => setIsEditorOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-gradient"
                  onClick={handleSaveArticle}
                  disabled={isSaving}
                >
                  <CheckCircle2 size={14} /> {isSaving ? 'Publishing...' : 'Publish to Cloudflare D1'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;
