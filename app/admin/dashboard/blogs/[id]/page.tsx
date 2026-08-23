'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Save, Loader2, Upload, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { createBlog, updateBlog } from "@/lib/firestore-client";
import { uploadFile, makeStoragePath } from '@/lib/storage';
import { generateSlug, readingTime } from '@/lib/utils';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import type { Blog } from '@/types';

const EMPTY_BLOG: Omit<Blog, 'id' | 'publishedAt' | 'updatedAt'> = {
  slug: '', title: '', excerpt: '', content: '', coverImageUrl: '',
  author: 'Sokha Realty Team', category: 'Real Estate Tips', tags: [],
  readTime: 1, isFeatured: false,
  metaTitle: '', metaDescription: '', metaKeywords: [],
};

const CATEGORIES = ['Real Estate Tips', 'Market Trends', 'Home Buying Guide', 'Investment', 'Lifestyle', 'Legal & Finance'];

export default function BlogEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [form,    setForm]    = useState(EMPTY_BLOG);
  const [loading, setLoading] = useState(!isNew);
  const [saving,  setSaving]  = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'blogs', id));
        if (snap.exists()) setForm({ ...EMPTY_BLOG, ...snap.data() } as typeof EMPTY_BLOG);
      } catch {
        toast.error('Failed to load article');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isNew]);

  function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleTitleChange(title: string) {
    set('title', title);
    if (isNew) set('slug', generateSlug(title));
  }

  function handleContentChange(content: string) {
    set('content', content);
    set('readTime', readingTime(content));
  }

  async function handleCoverUpload(file: File) {
    setUploadingCover(true);
    try {
      const url = await uploadFile(file, makeStoragePath('blogs', form.slug || 'untitled', file));
      set('coverImageUrl', url);
      toast.success('Cover image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploadingCover(false);
    }
  }

  async function handleSave() {
    if (!form.title || !form.slug || !form.content) {
      toast.error('Title, slug, and content are required');
      return;
    }
    setSaving(true);
    try {
      if (isNew) {
        await createBlog(form);
      } else {
        await updateBlog(id, form);
      }

      fetch('/api/seo/index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: form.slug, type: 'blog' }),
      }).catch(() => {});

      toast.success(isNew ? 'Article published!' : 'Article updated!');
      router.push('/admin/dashboard/blogs');
    } catch (err) {
      toast.error('Failed to save article');
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-10 text-center"><Loader2 className="w-5 h-5 animate-spin mx-auto text-gold-500" /></div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard/blogs" className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-ivory-200 dark:hover:bg-charcoal-700 text-charcoal-500">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-ivory-100">
            {isNew ? 'New Article' : 'Edit Article'}
          </h1>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary !py-2.5 !px-6 text-sm disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : isNew ? 'Publish' : 'Update'}
        </button>
      </div>

      <div className="space-y-6">
        <div className="card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div className="sm:col-span-2">
              <label className="form-label">Title</label>
              <input className="form-input" value={form.title} onChange={e => handleTitleChange(e.target.value)} placeholder="5 Things to Check Before Buying a Home in Mumbai" />
            </div>
            <div>
              <label className="form-label">Slug</label>
              <input className="form-input font-mono" value={form.slug} onChange={e => set('slug', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Category</label>
              <select className="form-input" value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Author</label>
              <input className="form-input" value={form.author} onChange={e => set('author', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Tags (comma separated)</label>
              <input className="form-input" value={form.tags.join(', ')} onChange={e => set('tags', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
            </div>
            <div className="sm:col-span-2">
              <label className="form-label">Excerpt</label>
              <textarea className="form-input resize-none" rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="A short summary shown on listing pages…" />
            </div>
            <div>
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} className="w-4 h-4 accent-gold-500" />
                <span className="text-sm text-charcoal-600 dark:text-charcoal-300">Featured on homepage</span>
              </label>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100 mb-4">Cover Image</h2>
          {form.coverImageUrl ? (
            <div className="relative h-48 rounded-lg overflow-hidden">
              <Image src={form.coverImageUrl} alt="Cover" fill className="object-cover" />
              <button onClick={() => set('coverImageUrl', '')} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-charcoal-900/70 text-white flex items-center justify-center hover:bg-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 p-10 rounded-lg border-2 border-dashed border-ivory-300 dark:border-charcoal-600 cursor-pointer hover:border-gold-400">
              <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleCoverUpload(e.target.files[0])} />
              {uploadingCover ? <Loader2 className="w-6 h-6 animate-spin text-gold-500" /> : <Upload className="w-6 h-6 text-charcoal-400" />}
              <span className="text-sm text-charcoal-500">Upload cover image</span>
            </label>
          )}
        </div>

        {/* Content */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100">Article Content</h2>
            <span className="text-xs text-charcoal-400 font-mono">~{form.readTime} min read</span>
          </div>
          <RichTextEditor value={form.content} onChange={handleContentChange} placeholder="Write your article here…" />
        </div>

        {/* SEO */}
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100 mb-4">SEO Meta</h2>
          <div className="space-y-4">
            <div>
              <label className="form-label">Meta Title</label>
              <input className="form-input" value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Meta Description</label>
              <textarea className="form-input resize-none" rows={2} value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Meta Keywords (comma separated)</label>
              <input className="form-input" value={form.metaKeywords.join(', ')} onChange={e => set('metaKeywords', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8 pb-10">
        <button onClick={handleSave} disabled={saving} className="btn-primary !py-3 !px-8 disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : isNew ? 'Publish Article' : 'Update Article'}
        </button>
      </div>
    </div>
  );
}
