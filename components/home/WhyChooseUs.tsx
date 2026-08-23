'use client';

import { Shield, Gem, Clock, Headphones, Leaf, Award } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

const FEATURES = [
  {
    icon:   Shield,
    title:  'Quality Assured',
    desc:   'Stringent quality checks at every stage. Materials sourced from certified vendors.',
    color:  'text-blue-400',
    bg:     'bg-blue-400/10 border-blue-400/20',
  },
  {
    icon:   Gem,
    title:  'Premium Design',
    desc:   'Award-winning architects and interior designers create spaces you\'ll cherish.',
    color:  'text-gold-400',
    bg:     'bg-gold-400/10 border-gold-400/20',
  },
  {
    icon:   Clock,
    title:  'On-Time Delivery',
    desc:   '95% of our projects delivered on schedule. Your investment is in safe hands.',
    color:  'text-green-400',
    bg:     'bg-green-400/10 border-green-400/20',
  },
  {
    icon:   Headphones,
    title:  'Post-Sales Support',
    desc:   'Dedicated relationship managers for every homeowner — even after handover.',
    color:  'text-purple-400',
    bg:     'bg-purple-400/10 border-purple-400/20',
  },
  {
    icon:   Leaf,
    title:  'Sustainable Homes',
    desc:   'IGBC-aligned green building practices. Rainwater harvesting, solar provisions.',
    color:  'text-emerald-400',
    bg:     'bg-emerald-400/10 border-emerald-400/20',
  },
  {
    icon:   Award,
    title:  'Award-Winning',
    desc:   '12 National Real Estate Awards for excellence in design and construction.',
    color:  'text-amber-400',
    bg:     'bg-amber-400/10 border-amber-400/20',
  },
];

export function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-py bg-white dark:bg-charcoal-800 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="max-w-xl mb-14">
          <span className="section-label">Why Sokha Realty</span>
          <h2 className="heading-lg text-charcoal-800 dark:text-ivory-100">
            The Sokha Promise
          </h2>
          <p className="font-body text-charcoal-500 dark:text-charcoal-300 mt-3">
            We don't just build homes — we build trust, relationships, and communities that stand the test of time.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className={cn(
                'card p-6 group cursor-default',
                'transition-all duration-500',
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              )}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className={`w-11 h-11 rounded-sm border flex items-center justify-center mb-4 ${feat.bg} group-hover:scale-110 transition-transform duration-300`}>
                <feat.icon className={`w-5 h-5 ${feat.color}`} />
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100 mb-2">
                {feat.title}
              </h3>
              <p className="font-body text-sm text-charcoal-500 dark:text-charcoal-300 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
