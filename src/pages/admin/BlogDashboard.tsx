import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Badge } from '../../components/ui/input';
import { Dialog } from '../../components/ui/dialog';
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from '../../components/ui/tabs';
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
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white">
            Blog CMS & Groq AI Studio
          </h2>
          <p className="text-xs text-zinc-400">
            Generate, edit, and publish high-converting travel hospitality articles directly to Cloudflare D1 (`rev_db`).
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="gradient"
            onClick={() => setIsAiModalOpen(true)}
          >
            <Sparkles className="size-4" /> New AI Blog with Groq
          </Button>

          <Button
            variant="secondary"
            onClick={handleNewArticle}
          >
            <Plus className="size-4" /> New Blank Article
          </Button>
        </div>
      </div>

      {successMsg && (
        <div className="flex items-center gap-2 rounded-md bg-emerald-950/50 p-3 text-xs text-emerald-400 border border-emerald-800">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-md bg-red-950/50 p-3 text-xs text-red-400 border border-red-800">
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Articles Table Card */}
      <Card className="border-zinc-800 bg-zinc-900/40">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <CardTitle>Published Articles in Cloudflare D1</CardTitle>
            <CardDescription>
              Live CMS articles queryable via `/api/rev_db` and `/blog/:slug`
            </CardDescription>
          </div>

          {/* Search Input */}
          <div className="w-full sm:w-64 relative">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search articles..."
              className="pl-8 h-8 text-xs"
            />
            <Search className="absolute left-2.5 top-2 size-3.5 text-zinc-500" />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-zinc-400 space-y-2">
              <div className="size-6 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent mx-auto" />
              <p className="text-xs">Loading articles from Cloudflare D1...</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="p-12 text-center text-zinc-500 space-y-3">
              <BookOpen className="size-8 mx-auto opacity-50 text-zinc-400" />
              <p className="text-sm font-medium text-zinc-300">No articles found</p>
              <p className="text-xs text-zinc-500">Generate your first travel article with Groq AI in seconds.</p>
              <Button variant="gradient" size="sm" onClick={() => setIsAiModalOpen(true)}>
                <Sparkles className="size-3.5 mr-1" /> Generate with Groq AI
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((art) => (
                  <TableRow key={art.slug || art.id}>
                    <TableCell>
                      <div className="font-semibold text-zinc-100 text-sm">
                        {art.heading}
                      </div>
                      <div className="text-xs text-indigo-400 font-mono">
                        /blog/{art.slug}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="purple">{art.category || 'Travel Insights'}</Badge>
                    </TableCell>
                    <TableCell className="text-xs text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <User className="size-3.5 text-zinc-500" />
                        {art.author || 'Elena Rostova'}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-zinc-500" />
                        {art.date || art.created_at?.split('T')[0] || '2026-08-29'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`/blog/${art.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-colors"
                        >
                          <Eye className="size-3" /> View
                        </a>
                        <button
                          onClick={() => handleEditArticle(art)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition-colors cursor-pointer"
                        >
                          <Edit className="size-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(art.slug)}
                          className="inline-flex items-center p-1.5 rounded bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs transition-colors cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Groq AI Blog Generator Dialog */}
      <Dialog
        open={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        title="✨ Generate SEO Travel Article with Groq AI"
        description="Powered by Groq's ultra-fast Llama 3.3 70B model. Generates full H2 sections, meta tags, and structured data."
      >
        <form onSubmit={handleGenerateBlog} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Article Topic / Focus Subject *
            </label>
            <Input
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="e.g. How Luxury Eco-Resorts Triple Direct Bookings with Frictionless Mobile UX"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Editorial Tone
              </label>
              <Input
                value={aiTone}
                onChange={(e) => setAiTone(e.target.value)}
                placeholder="Luxury & Authoritative"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Target Audience
              </label>
              <Input
                value={aiAudience}
                onChange={(e) => setAiAudience(e.target.value)}
                placeholder="Luxury Resort Directors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              SEO Keywords to Target (Comma separated)
            </label>
            <Input
              value={aiKeywords}
              onChange={(e) => setAiKeywords(e.target.value)}
              placeholder="direct bookings, boutique resort, hospitality UX, CRS integration"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-2">
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
              <Sparkles className="size-4" /> Generate Article Now
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
      >
        <div className="space-y-4">
          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Article Heading (`heading` / H1) *
              </label>
              <Input
                value={editingArticle.heading}
                onChange={(e) => setEditingArticle({ ...editingArticle, heading: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                SEO Meta Title (`meta_heading`)
              </label>
              <Input
                value={editingArticle.meta_heading || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, meta_heading: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Meta Description (`meta_data`)
              </label>
              <Input
                value={editingArticle.meta_data || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, meta_data: e.target.value })}
              />
            </div>
          </div>

          {/* Category, Author, Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Category
              </label>
              <Input
                value={editingArticle.category || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Author
              </label>
              <Input
                value={editingArticle.author || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-300">
                Date (YYYY-MM-DD)
              </label>
              <Input
                value={editingArticle.date || ''}
                onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })}
              />
            </div>
          </div>

          {/* Featured Image URL */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Featured Image URL (`image_url`)
            </label>
            <Input
              value={editingArticle.image_url || ''}
              onChange={(e) => setEditingArticle({ ...editingArticle, image_url: e.target.value })}
            />
          </div>

          {/* Executive Summary */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Executive Summary (`description`)
            </label>
            <Textarea
              value={editingArticle.description || ''}
              onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })}
              className="min-h-[60px]"
            />
          </div>

          {/* Narrative Paragraph */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Intro Narrative Paragraph (`paragraph`)
            </label>
            <Textarea
              value={editingArticle.paragraph || ''}
              onChange={(e) => setEditingArticle({ ...editingArticle, paragraph: e.target.value })}
              className="min-h-[70px]"
            />
          </div>

          {/* Quote */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Highlight Quote (`useful_quote`)
            </label>
            <Input
              value={editingArticle.useful_quote || ''}
              onChange={(e) => setEditingArticle({ ...editingArticle, useful_quote: e.target.value })}
            />
          </div>

          {/* H2 Sections */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              H2 Sections (`sections_h2_para` JSON Array)
            </label>
            <Textarea
              value={rawSectionsJson}
              onChange={(e) => setRawSectionsJson(e.target.value)}
              className="font-mono text-xs min-h-[120px]"
            />
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-300">
              Tags (`tags` JSON Array)
            </label>
            <Input
              value={rawTagsJson}
              onChange={(e) => setRawTagsJson(e.target.value)}
              className="font-mono text-xs"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-3">
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
              <CheckCircle2 className="size-4" /> Publish to Cloudflare D1
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default BlogDashboard;
