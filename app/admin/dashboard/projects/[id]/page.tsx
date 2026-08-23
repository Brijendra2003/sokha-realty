'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import {
  Plus, Trash2, Upload, Loader2, Save, ArrowLeft, X, ImagePlus,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  createProject,
  updateProject,
  getProjects,
} from "@/lib/firestore-client";
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadFile, makeStoragePath } from '@/lib/storage';
import { generateSlug } from '@/lib/utils';
import type {
  Project, ProjectHighlight, ProjectAmenity, ProjectConfiguration, FloorPlan, ConnectivityPoint,
} from '@/types';
import Link from 'next/link';

const EMPTY_PROJECT: Omit<Project, 'id' | 'createdAt' | 'updatedAt'> = {
  slug: '', name: '', tagline: '', location: '',
  status: 'Upcoming', category: 'Residential',
  elevationImageUrl: '', galleryImages: [],
  highlights: [], amenities: [], configurations: [], floorPlans: [], connectivity: [],
  googleMapsEmbedUrl: '', rera: '', priceRange: '',
  isFeatured: false, metaTitle: '', metaDescription: '', metaKeywords: [],
};

export default function ProjectEditorPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === 'new';

  const [form,     setForm]     = useState<Omit<Project, 'id' | 'createdAt' | 'updatedAt'>>(EMPTY_PROJECT);
  const [loading,  setLoading]  = useState(!isNew);
  const [saving,   setSaving]   = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'projects', id));
        if (snap.exists()) {
          const data = snap.data();
          setForm({
            ...EMPTY_PROJECT,
            ...data,
          } as Omit<Project, 'id' | 'createdAt' | 'updatedAt'>);
        }
      } catch {
        toast.error('Failed to load project');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isNew]);

  function set<K extends keyof typeof form>(key: K, value: typeof form[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    set('name', name);
    if (isNew) set('slug', generateSlug(name));
  }

  async function handleHeroUpload(file: File) {
    setUploadingHero(true);
    try {
      const path = makeStoragePath('projects', form.slug || 'untitled', file);
      const url  = await uploadFile(file, path);
      set('elevationImageUrl', url);
      toast.success('Elevation image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploadingHero(false);
    }
  }

  async function handleGalleryUpload(files: FileList) {
    try {
      const urls = await Promise.all(
        Array.from(files).map(f => uploadFile(f, makeStoragePath('projects/gallery', form.slug || 'untitled', f)))
      );
      set('galleryImages', [...form.galleryImages, ...urls]);
      toast.success(`${urls.length} image(s) uploaded`);
    } catch {
      toast.error('Gallery upload failed');
    }
  }

  // ── Highlights ──
  const addHighlight = () => set('highlights', [...form.highlights, { icon: 'Sparkles', label: '', value: '' }]);
  const updateHighlight = (i: number, field: keyof ProjectHighlight, val: string) => {
    const next = [...form.highlights];
    next[i] = { ...next[i], [field]: val };
    set('highlights', next);
  };
  const removeHighlight = (i: number) => set('highlights', form.highlights.filter((_, idx) => idx !== i));

  // ── Amenities ──
  const addAmenityGroup = () => set('amenities', [...form.amenities, { category: '', items: [] }]);
  const updateAmenityCategory = (i: number, val: string) => {
    const next = [...form.amenities];
    next[i] = { ...next[i], category: val };
    set('amenities', next);
  };
  const updateAmenityItems = (i: number, val: string) => {
    const next = [...form.amenities];
    next[i] = { ...next[i], items: val.split(',').map(s => s.trim()).filter(Boolean) };
    set('amenities', next);
  };
  const removeAmenityGroup = (i: number) => set('amenities', form.amenities.filter((_, idx) => idx !== i));

  // ── Configurations ──
  const addConfig = () => set('configurations', [...form.configurations, { type: '', area: '', price: '' }]);
  const updateConfig = (i: number, field: keyof ProjectConfiguration, val: string) => {
    const next = [...form.configurations];
    next[i] = { ...next[i], [field]: val };
    set('configurations', next);
  };
  const removeConfig = (i: number) => set('configurations', form.configurations.filter((_, idx) => idx !== i));

  // ── Floor Plans ──
  const addFloorPlan = () => set('floorPlans', [...form.floorPlans, { type: '', imageUrl: '', area: '' }]);
  const updateFloorPlan = (i: number, field: keyof FloorPlan, val: string) => {
    const next = [...form.floorPlans];
    next[i] = { ...next[i], [field]: val };
    set('floorPlans', next);
  };
  const removeFloorPlan = (i: number) => set('floorPlans', form.floorPlans.filter((_, idx) => idx !== i));
  async function handleFloorPlanUpload(i: number, file: File) {
    try {
      const url = await uploadFile(file, makeStoragePath('projects/floorplans', form.slug || 'untitled', file));
      updateFloorPlan(i, 'imageUrl', url);
      toast.success('Floor plan uploaded');
    } catch {
      toast.error('Upload failed');
    }
  }

  // ── Connectivity ──
  const addConnectivity = () => set('connectivity', [...form.connectivity, { name: '', distance: '', direction: '' }]);
  const updateConnectivity = (i: number, field: keyof ConnectivityPoint, val: string) => {
    const next = [...form.connectivity];
    next[i] = { ...next[i], [field]: val };
    set('connectivity', next);
  };
  const removeConnectivity = (i: number) => set('connectivity', form.connectivity.filter((_, idx) => idx !== i));

  async function handleSave() {
    if (!form.name || !form.slug || !form.location) {
      toast.error('Name, slug, and location are required');
      return;
    }
    setSaving(true);
    try {
      let projectId = id;
      if (isNew) {
        projectId = await createProject(form);
      } else {
        await updateProject(id, form);
      }

      // Trigger auto-indexing in the background
      fetch('/api/seo/index', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: form.slug, type: 'project' }),
      }).catch(() => {});

      toast.success(isNew ? 'Project created!' : 'Project updated!');
      router.push('/admin/dashboard/projects');
    } catch (err) {
      toast.error('Failed to save project');
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-10 text-center text-charcoal-400"><Loader2 className="w-5 h-5 animate-spin mx-auto" /></div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard/projects" className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-ivory-200 dark:hover:bg-charcoal-700 text-charcoal-500">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="font-display text-2xl font-semibold text-charcoal-800 dark:text-ivory-100">
            {isNew ? 'New Project' : 'Edit Project'}
          </h1>
        </div>
        <button onClick={handleSave} disabled={saving} className="btn-primary !py-2.5 !px-6 text-sm disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : 'Save Project'}
        </button>
      </div>

      <div className="space-y-8">

        {/* Basic Info */}
        <Section title="Basic Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field label="Project Name">
              <input className="form-input" value={form.name} onChange={e => handleNameChange(e.target.value)} placeholder="Sokha Serene Heights" />
            </Field>
            <Field label="URL Slug">
              <input className="form-input font-mono" value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="sokha-serene-heights" />
            </Field>
            <Field label="Tagline">
              <input className="form-input" value={form.tagline} onChange={e => set('tagline', e.target.value)} placeholder="Where comfort meets elegance" />
            </Field>
            <Field label="Location">
              <input className="form-input" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Powai, Mumbai" />
            </Field>
            <Field label="Status">
              <select className="form-input" value={form.status} onChange={e => set('status', e.target.value as Project['status'])}>
                <option>Upcoming</option><option>Ongoing</option><option>Completed</option>
              </select>
            </Field>
            <Field label="Category">
              <select className="form-input" value={form.category} onChange={e => set('category', e.target.value as Project['category'])}>
                <option>Residential</option><option>Commercial</option><option>Luxury</option><option>Affordable</option>
              </select>
            </Field>
            <Field label="Price Range">
              <input className="form-input" value={form.priceRange} onChange={e => set('priceRange', e.target.value)} placeholder="₹85 L – ₹1.5 Cr" />
            </Field>
            <Field label="RERA Number">
              <input className="form-input font-mono" value={form.rera} onChange={e => set('rera', e.target.value)} placeholder="P51800000000" />
            </Field>
            <Field label="Featured">
              <label className="flex items-center gap-2 mt-2">
                <input type="checkbox" checked={form.isFeatured} onChange={e => set('isFeatured', e.target.checked)} className="w-4 h-4 accent-gold-500" />
                <span className="text-sm text-charcoal-600 dark:text-charcoal-300">Show on homepage</span>
              </label>
            </Field>
          </div>
        </Section>

        {/* Elevation Image */}
        <Section title="Elevation Image (Hero)">
          {form.elevationImageUrl ? (
            <div className="relative h-56 rounded-lg overflow-hidden">
              <Image src={form.elevationImageUrl} alt="Elevation" fill className="object-cover" />
              <button onClick={() => set('elevationImageUrl', '')} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-charcoal-900/70 text-white flex items-center justify-center hover:bg-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 p-10 rounded-lg border-2 border-dashed border-ivory-300 dark:border-charcoal-600 cursor-pointer hover:border-gold-400">
              <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleHeroUpload(e.target.files[0])} />
              {uploadingHero ? <Loader2 className="w-6 h-6 animate-spin text-gold-500" /> : <Upload className="w-6 h-6 text-charcoal-400" />}
              <span className="text-sm text-charcoal-500">Upload full-width elevation image</span>
            </label>
          )}
        </Section>

        {/* Gallery */}
        <Section title="Gallery Images">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
            {form.galleryImages.map((img, i) => (
              <div key={i} className="relative h-24 rounded-sm overflow-hidden group">
                <Image src={img} alt="" fill className="object-cover" />
                <button
                  onClick={() => set('galleryImages', form.galleryImages.filter((_, idx) => idx !== i))}
                  className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            <label className="h-24 rounded-sm border-2 border-dashed border-ivory-300 dark:border-charcoal-600 flex items-center justify-center cursor-pointer hover:border-gold-400">
              <input type="file" accept="image/*" multiple className="hidden" onChange={e => e.target.files && handleGalleryUpload(e.target.files)} />
              <ImagePlus className="w-5 h-5 text-charcoal-400" />
            </label>
          </div>
        </Section>

        {/* Highlights */}
        <Section title="Project Highlights" onAdd={addHighlight}>
          {form.highlights.map((h, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-start mb-3">
              <input className="form-input" placeholder="Icon (e.g. Trees)" value={h.icon} onChange={e => updateHighlight(i, 'icon', e.target.value)} />
              <input className="form-input" placeholder="Label (e.g. Open Space)" value={h.label} onChange={e => updateHighlight(i, 'label', e.target.value)} />
              <input className="form-input" placeholder="Value (e.g. 70%)" value={h.value} onChange={e => updateHighlight(i, 'value', e.target.value)} />
              <RemoveBtn onClick={() => removeHighlight(i)} />
            </div>
          ))}
        </Section>

        {/* Amenities */}
        <Section title="Amenities" onAdd={addAmenityGroup}>
          {form.amenities.map((a, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_2fr_auto] gap-3 items-start mb-3">
              <input className="form-input" placeholder="Category (e.g. Recreation)" value={a.category} onChange={e => updateAmenityCategory(i, e.target.value)} />
              <input className="form-input" placeholder="Items, comma separated" value={a.items.join(', ')} onChange={e => updateAmenityItems(i, e.target.value)} />
              <RemoveBtn onClick={() => removeAmenityGroup(i)} />
            </div>
          ))}
        </Section>

        {/* Configurations */}
        <Section title="Configurations & Pricing" onAdd={addConfig}>
          {form.configurations.map((c, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-start mb-3">
              <input className="form-input" placeholder="Type (e.g. 2 BHK)" value={c.type} onChange={e => updateConfig(i, 'type', e.target.value)} />
              <input className="form-input" placeholder="Area (e.g. 950 sq.ft.)" value={c.area} onChange={e => updateConfig(i, 'area', e.target.value)} />
              <input className="form-input" placeholder="Price (e.g. ₹85L)" value={c.price} onChange={e => updateConfig(i, 'price', e.target.value)} />
              <RemoveBtn onClick={() => removeConfig(i)} />
            </div>
          ))}
        </Section>

        {/* Floor Plans */}
        <Section title="Floor Plans" onAdd={addFloorPlan}>
          {form.floorPlans.map((fp, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-3 items-center mb-3">
              <input className="form-input" placeholder="Type (e.g. 2 BHK)" value={fp.type} onChange={e => updateFloorPlan(i, 'type', e.target.value)} />
              <input className="form-input" placeholder="Area" value={fp.area} onChange={e => updateFloorPlan(i, 'area', e.target.value)} />
              <label className="btn-secondary !py-2.5 !px-3 text-xs cursor-pointer">
                <input type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFloorPlanUpload(i, e.target.files[0])} />
                {fp.imageUrl ? 'Replace' : 'Upload'}
              </label>
              <RemoveBtn onClick={() => removeFloorPlan(i)} />
            </div>
          ))}
        </Section>

        {/* Connectivity */}
        <Section title="Connectivity" onAdd={addConnectivity}>
          {form.connectivity.map((c, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-start mb-3">
              <input className="form-input" placeholder="Name (e.g. Powai Lake)" value={c.name} onChange={e => updateConnectivity(i, 'name', e.target.value)} />
              <input className="form-input" placeholder="Distance (e.g. 1.2 km)" value={c.distance} onChange={e => updateConnectivity(i, 'distance', e.target.value)} />
              <input className="form-input" placeholder="Group (e.g. Landmarks)" value={c.direction} onChange={e => updateConnectivity(i, 'direction', e.target.value)} />
              <RemoveBtn onClick={() => removeConnectivity(i)} />
            </div>
          ))}
        </Section>

        {/* Map */}
        <Section title="Location Map">
          <Field label="Google Maps Embed URL">
            <input className="form-input" value={form.googleMapsEmbedUrl} onChange={e => set('googleMapsEmbedUrl', e.target.value)} placeholder="https://www.google.com/maps/embed?pb=..." />
          </Field>
        </Section>

        {/* SEO */}
        <Section title="SEO Meta">
          <div className="space-y-4">
            <Field label="Meta Title">
              <input className="form-input" value={form.metaTitle} onChange={e => set('metaTitle', e.target.value)} placeholder="Sokha Serene Heights | Sokha Realty" />
            </Field>
            <Field label="Meta Description">
              <textarea className="form-input resize-none" rows={2} value={form.metaDescription} onChange={e => set('metaDescription', e.target.value)} />
            </Field>
            <Field label="Meta Keywords (comma separated)">
              <input className="form-input" value={form.metaKeywords.join(', ')} onChange={e => set('metaKeywords', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
            </Field>
          </div>
        </Section>
      </div>

      <div className="flex justify-end mt-8 pb-10">
        <button onClick={handleSave} disabled={saving} className="btn-primary !py-3 !px-8 disabled:opacity-60">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving…' : 'Save Project'}
        </button>
      </div>
    </div>
  );
}

function Section({ title, onAdd, children }: { title: string; onAdd?: () => void; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100">{title}</h2>
        {onAdd && (
          <button onClick={onAdd} className="btn-secondary !py-2 !px-4 text-xs">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
    </div>
  );
}

function RemoveBtn({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-10 h-10 flex items-center justify-center rounded-sm text-charcoal-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 flex-shrink-0">
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
