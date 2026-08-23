'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const TESTIMONIALS = [
  {
    name: 'Rahul & Priya Sharma',
    project: 'Sokha Serene Heights, Powai',
    text: 'We have been living in our Sokha home for 3 years now. The quality of construction is exceptional — not a single crack or issue. The team was responsive right through the process.',
    rating: 5,
    type: '3 BHK Resident',
  },
  {
    name: 'Vikram Malhotra',
    project: 'Sokha Greens, Kandivali',
    text: 'Invested in a 2 BHK as a rental property. Sokha Realty delivered on time, and the rental yield has been consistently strong. Highly professional team.',
    rating: 5,
    type: 'Investor',
  },
  {
    name: 'Ananya & Siddharth Joshi',
    project: 'Sokha Residences, Thane',
    text: 'From site visits to possession, every interaction was smooth. The apartment quality is top-notch. Our children love the amenities and the green spaces.',
    rating: 5,
    type: '2 BHK Resident',
  },
  {
    name: 'Deepak Nair',
    project: 'Sokha Commercial Centre, Andheri',
    text: 'Purchased commercial space for my office. The location, design, and infrastructure are exactly what I needed. Sokha Realty lives up to its premium reputation.',
    rating: 5,
    type: 'Commercial Owner',
  },
];

export function Testimonials() {
  const [active,   setActive]   = useState(0);
  const [isAutoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const id = setInterval(() => {
      setActive(a => (a + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(id);
  }, [isAutoPlay]);

  const go = (dir: 'prev' | 'next') => {
    setAutoPlay(false);
    setActive(a =>
      dir === 'next'
        ? (a + 1) % TESTIMONIALS.length
        : (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
    );
  };

  const t = TESTIMONIALS[active];

  return (
    <section className="section-py bg-ivory-100 dark:bg-charcoal-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-50" />

      <div className="container-max relative z-10">
        <div className="text-center mb-14">
          <span className="section-label">Testimonials</span>
          <h2 className="heading-lg text-charcoal-800 dark:text-ivory-100">
            What Our Residents Say
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Quote card */}
          <div className="card p-8 md:p-12 text-center relative overflow-hidden">
            {/* Big quote mark */}
            <Quote className="absolute top-6 right-6 w-12 h-12 text-gold-200 dark:text-gold-900" />

            {/* Stars */}
            <div className="flex items-center justify-center gap-1 mb-6">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
              ))}
            </div>

            {/* Quote text */}
            <blockquote className="font-display text-xl md:text-2xl text-charcoal-700 dark:text-ivory-100 leading-relaxed italic mb-8">
              "{t.text}"
            </blockquote>

            {/* Attribution */}
            <div>
              <p className="font-body font-semibold text-charcoal-800 dark:text-ivory-100">{t.name}</p>
              <p className="font-mono text-xs text-gold-500 mt-1">{t.type} · {t.project}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button onClick={() => go('prev')} className="w-10 h-10 rounded-full flex items-center justify-center border border-ivory-300 dark:border-charcoal-600 hover:border-gold-400 hover:text-gold-400 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setAutoPlay(false); setActive(i); }}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    i === active
                      ? 'w-6 h-2 bg-gold-500'
                      : 'w-2 h-2 bg-ivory-300 dark:bg-charcoal-600 hover:bg-gold-300'
                  )}
                />
              ))}
            </div>

            <button onClick={() => go('next')} className="w-10 h-10 rounded-full flex items-center justify-center border border-ivory-300 dark:border-charcoal-600 hover:border-gold-400 hover:text-gold-400 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
