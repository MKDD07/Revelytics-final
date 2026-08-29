import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Badge } from '../../components/ui/input';
import { Dialog } from '../../components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableCell } from '../../components/ui/tabs';
import {
  Sparkles,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  FileText,
  Calendar,
  User,
  Tag,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

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

  // Filtered Articles
  const filteredArticles = articles.filter(
    (a) =>
      a.heading?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open Editor for new blank article
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

  // Open Editor for existing article
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

  // Generate Article via Groq API
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

  // Save/Publish Article to D1
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

  // Delete Article from D1
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em' }}>
            Blog Management & Groq AI Studio
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#a1a1aa' }}>
            Generate, edit, and publish high-converting travel hospitality articles directly into Cloudflare D1 (`rev_db`).
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Button
            variant="gradient"
            onClick={() => setIsAiModalOpen(true)}
            style={{ fontWeight: 600 }}
          >
            <Sparkles size={16} /> New AI Blog with Groq
          </Button>

          <Button
            variant="secondary"
            onClick={handleNewArticle}
          >
            <Plus size={16} /> New Blank Article
          </Button>
        </div>
      </div>

      {successMsg && (
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
          {successMsg}
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

      {/* Articles Table Card */}
      <Card>
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <CardTitle>Published Articles in Cloudflare D1</CardTitle>
              <CardDescription>
                Live CMS articles queryable via `/api/rev_db` and `/blog/:slug`
              </CardDescription>
            </div>

            {/* Search Input */}
            <div style={{ width: '280px', position: 'relative' }}>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by title, slug, tag..."
                style={{ paddingLeft: '36px', height: '36px', fontSize: '13px' }}
              />
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '11px', color: '#71717a' }} />
            </div>
          </div>
        </CardHeader>

        <CardContent style={{ padding: 0 }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#a1a1aa' }}>
              <div className="inline-block animate-spin" style={{ width: 24, height: 24, border: '2px solid #818cf8', borderTopColor: 'transparent', borderRadius: '50%', marginBottom: '12px' }} />
              <p style={{ margin: 0, fontSize: '13px' }}>Loading articles from Cloudflare D1...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center', color: '#71717a' }}>
              <BookOpen size={36} style={{ margin: '0 auto 12px auto', opacity: 0.5 }} />
              <p style={{ margin: 0, fontSize: '15px', color: '#a1a1aa', fontWeight: 500 }}>No articles found</p>
              <p style={{ margin: '4px 0 16px 0', fontSize: '13px' }}>Generate your first travel article with Groq AI in 10 seconds.</p>
              <Button variant="gradient" onClick={() => setIsAiModalOpen(true)}>
                <Sparkles size={15} /> Generate with Groq AI
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article Title & Slug</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead style={{ textAlign: 'right' }}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <tbody>
                {filteredArticles.map((art) => (
                  <TableRow key={art.slug || art.id}>
                    <TableCell>
                      <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '14px', marginBottom: '2px' }}>
                        {art.heading}
                      </div>
                      <div style={{ fontSize: '12px', color: '#818cf8', fontFamily: 'monospace' }}>
                        /blog/{art.slug}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="purple">{art.category || 'Travel Insights'}</Badge>
                    </TableCell>
                    <TableCell style={{ fontSize: '13px', color: '#d4d4d8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={13} color="#71717a" />
                        {art.author || 'Elena Rostova'}
                      </div>
                    </TableCell>
                    <TableCell style={{ fontSize: '13px', color: '#a1a1aa' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Calendar size={13} color="#71717a" />
                        {art.date || art.created_at?.split('T')[0] || '2026-08-29'}
                      </div>
                    </TableCell>
                    <TableCell style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <a
                          href={`/blog/${art.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            color: '#d4d4d8',
                            fontSize: '12px',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Eye size={13} /> View
                        </a>
                        <button
                          onClick={() => handleEditArticle(art)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            backgroundColor: '#27272a',
                            color: '#ffffff',
                            fontSize: '12px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Edit size={13} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.slug)}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '6px',
                            backgroundColor: 'rgba(239, 68, 68, 0.15)',
                            color: '#f87171',
                            fontSize: '12px',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Groq AI Blog Generator Dialog */}
      <Dialog
        open={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="✨ Generate SEO Travel Article with Groq AI"
        description="Powered by Groq's ultra-fast Llama 3.3 70B Versatile model. Generates full H2 sections, meta tags, quotes, and JSON structures."
        maxWidth="620px"
      >
        <form onSubmit={handleGenerateBlog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
              Article Topic / Focus Subject *
            </label>
            <Input
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="e.g. How Luxury Eco-Resorts Triple Direct Bookings with Frictionless Mobile UX"
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                Editorial Tone
              </label>
              <Input
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                placeholder="Luxury & Authoritative"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                Target Audience
              </label>
              <Input
                value={aiAudience}
                onChange={(e) => setAiAudience(e.target.value)}
                placeholder="Luxury Resort Directors"
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
              SEO Keywords to Target (Comma separated)
            </label>
            <Input
              value={aiKeywords}
              onChange={(e) => setAiKeywords(e.target.value)}
              placeholder="direct bookings, boutique resort, hospitality UX, CRS integration"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAiModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              loading={isGenerating}
            >
              <Sparkles size={16} /> Generate Article Now
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Edit / Review Article Dialog */}
      <Dialog
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        title={editingArticle.heading ? `Edit Article: ${editingArticle.heading}` : 'Create New Article'}
        description="Review, modify, and publish this article to Cloudflare D1."
        maxWidth="800px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title & Slug */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                Article Heading (`heading` / H1) *
              </label>
              <Input
                value={editingArticle.heading}
                onChange={(e) => setEditingArticle({ ...editingArticle, heading: e.target.value })}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                URL Slug (`slug`) *
              </label>
              <Input
                value={editingArticle.slug}
                onChange={(e) => setEditingArticle({ ...editingArticle, slug: e.target.value })}
                placeholder="url-safe-kebab-case"
                required
              />
            </div>
          </div>

          {/* Meta Title & Meta Description */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                SEO Meta Title (`meta_heading`)
              </label>
              <Input
                value={editingArticle.meta_heading || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, meta_heading: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                Meta Description (`meta_data`)
              </label>
              <Input
                value={editingArticle.meta_data || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, meta_data: e.target.value })}
              />
            </div>
          </div>

          {/* Category, Author, Date */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                Category
              </label>
              <Input
                value={editingArticle.category || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                Author
              </label>
              <Input
                value={editingArticle.author || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
                Date (YYYY-MM-DD)
              </label>
              <Input
                value={editingArticle.date || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
              />
            </div>
          </div>

          {/* Featured Image URL */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
              Featured Image URL (`image_url`)
            </label>
            <Input
              value={editingArticle.image_url || ''}
              onChange={(e) => setEditingArticle({ ...editingArticle, image_url: e.target.value })}
            />
          </div>

          {/* Executive Summary */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
              Executive Summary (`description`)
            </label>
            <Textarea
              value={editingArticle.description || ''}
              onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
              style={{ minHeight: '65px' }}
            />
          </div>

          {/* Narrative Paragraph */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
              Intro Narrative Paragraph (`paragraph`)
            </label>
            <Textarea
              value={editingArticle.paragraph || ''}
              onChange={(e) => setEditingArticle({ ...editingArticle, paragraph: e.target.value })}
              style={{ minHeight: '85px' }}
            />
          </div>

          {/* Quote */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
              Highlight Quote (`useful_quote`)
            </label>
            <Input
              value={editingArticle.useful_quote || ''}
              onChange={(e) => setEditingArticle({ ...editingArticle, useful_quote: e.target.value })}
            />
          </div>

          {/* H2 Sections (JSON) */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
              H2 Sections (`sections_h2_para` JSON Array)
            </label>
            <Textarea
              value={rawSectionsJson}
              onChange={(e) => setRawSectionsJson(e.target.value)}
              style={{ fontFamily: 'monospace', fontSize: '12px', minHeight: '140px' }}
            />
          </div>

          {/* Tags */}
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#e4e4e7', marginBottom: '6px' }}>
              Tags (`tags` JSON Array)
            </label>
            <Input
              value={rawTagsJson}
              onChange={(e) => setRawTagsJson(e.target.value)}
              style={{ fontFamily: 'monospace', fontSize: '12px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditorOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="gradient"
              onClick={handleSaveArticle}
              loading={isSaving}
            >
              <CheckCircle2 size={16} /> Publish to Cloudflare D1
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BlogDashboard;
