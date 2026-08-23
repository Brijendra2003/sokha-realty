'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { Building2, Users, Award, MapPin } from 'lucide-react';

const STATS = [
  { icon: Building2, value: 42,    suffix: '+',  label: 'Projects Delivered',   detail: 'Across Mumbai & MMR' },
  { icon: Users,     value: 5000,  suffix: '+',  label: 'Happy Families',        detail: 'Trusted homeowners'   },
  { icon: Award,     value: 30,    suffix: '+',  label: 'Years of Excellence',   detail: 'Est. 1995'            },
  { icon: MapPin,    value: 18,    suffix: '',    label: 'Prime Locations',       detail: 'In Greater Mumbai'    },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView }   = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step     = (target / duration) * 16;

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="section-py bg-charcoal-800 dark:bg-charcoal-900 relative overflow-hidden">
      {/* Decorative gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold-gradient opacity-40" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold-gradient opacity-40" />

      {/* Background pattern */}
      <div className="absolute inset-0 bg-noise opacity-50" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 mx-auto mb-4 rounded-sm bg-gold-500/10 border border-gold-500/20 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors duration-300">
                <stat.icon className="w-5 h-5 text-gold-400" />
              </div>

              {/* Value */}
              <p className="text-4xl md:text-5xl font-bold text-gradient-gold mb-1">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>

              {/* Label */}
              <p className="font-body text-sm font-semibold text-white mb-1">{stat.label}</p>
              <p className="font-mono text-xs text-charcoal-400">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
