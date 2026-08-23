import Link from 'next/link';
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, ArrowRight } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

const LINKS = {
  company:  [
    { label: 'About Us',    href: '/about'    },
    { label: 'Projects',    href: '/projects' },
    { label: 'Blog',        href: '/blogs'    },
    { label: 'Career',      href: '/career'   },
    { label: 'Contact Us',  href: '/contact'  },
  ],
  legal: [
    { label: 'Privacy Policy',    href: '/privacy'    },
    { label: 'Terms of Service',  href: '/terms'      },
    { label: 'RERA Disclosures',  href: '/rera'       },
    { label: 'Disclaimer',        href: '/disclaimer' },
  ],
};

const SOCIALS = [
  { icon: Instagram, href: 'https://instagram.com/sokharealty', label: 'Instagram' },
  { icon: Facebook,  href: 'https://facebook.com/sokharealty',  label: 'Facebook'  },
  { icon: Linkedin,  href: 'https://linkedin.com/company/sokharealty', label: 'LinkedIn' },
  { icon: Youtube,   href: 'https://youtube.com/@sokharealty',  label: 'YouTube'   },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-800 dark:bg-charcoal-900 text-ivory-200 border-t border-charcoal-700">

      {/* Newsletter Strip */}
      <div className="border-b border-charcoal-700">
        <div className="container-max py-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="section-label !text-gold-400">Stay Updated</p>
              <h3 className="font-display text-xl font-medium text-white">
                New Project Launches &amp; Offers
              </h3>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-sm bg-gold-gradient flex items-center justify-center flex-shrink-0">
                <span className="font-display text-charcoal-900 font-bold text-lg">S</span>
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-white tracking-tight">Sokha Realty</p>
                <p className="font-mono text-2xs tracking-[0.15em] uppercase text-gold-400">Est. 1995</p>
              </div>
            </Link>
            <p className="text-sm text-charcoal-300 leading-relaxed mb-6 max-w-xs">
              Three decades of building landmarks across Mumbai. Quality construction, premium living, trusted by 5,000+ families.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 flex items-center justify-center rounded-sm bg-charcoal-700 hover:bg-gold-500 hover:text-charcoal-900 text-charcoal-300 transition-all duration-200 border border-charcoal-600 hover:border-gold-500"
                >
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-gold-400 mb-5">Company</h4>
            <ul className="space-y-3">
              {LINKS.company.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-sm text-charcoal-300 hover:text-gold-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-gold-400 mb-5">Legal</h4>
            <ul className="space-y-3">
              {LINKS.legal.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex items-center gap-2 text-sm text-charcoal-300 hover:text-gold-400 transition-colors group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-gold-400 mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-charcoal-300">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Sokha Realty, 4th Floor, Andheri West, Mumbai – 400053</span>
              </li>
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-charcoal-300 hover:text-gold-400 transition-colors">
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:info@sokharealty.com" className="flex items-center gap-3 text-sm text-charcoal-300 hover:text-gold-400 transition-colors">
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  info@sokharealty.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="font-mono text-2xs tracking-wider uppercase text-charcoal-500 mb-1">MahaRERA Reg. No.</p>
              <p className="text-sm text-charcoal-300 font-mono">P51800000000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-700">
        <div className="container-max py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-charcoal-500 text-center">
            © {new Date().getFullYear()} Sokha Realty Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-xs text-charcoal-600 text-center">
            * All images are for representational purposes only. RERA registration required.
          </p>
        </div>
      </div>
    </footer>
  );
}
