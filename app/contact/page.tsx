import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';
import { ContactForm } from '@/components/common/ContactForm';
import { Blob, Sprig } from '@/components/ui/Decor';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Sokha Realty. Visit our office, call us, or send a message — we\'re here to help you find your dream home in Mumbai.',
  alternates: { canonical: '/contact' },
};

const CONTACT_INFO = [
  { icon: MapPin, title: 'Office Address', blob: 'blob-champagne', lines: ['Sokha Realty, 4th Floor,', 'Andheri West, Mumbai – 400053'] },
  { icon: Phone,  title: 'Phone',          blob: 'blob-clay',      lines: ['+91 98765 43210', '+91 22 4567 8900'] },
  { icon: Mail,   title: 'Email',          blob: 'blob-sage',      lines: ['info@sokharealty.com', 'sales@sokharealty.com'] },
  { icon: Clock,  title: 'Office Hours',   blob: 'blob-champagne', lines: ['Mon – Sat: 10:00 AM – 7:00 PM', 'Sunday: By appointment'] },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Get In Touch"
          title="Let's talk about"
          accent="your next home."
          lead="A question about a project, a site visit to book, or just an honest opinion on the market — we're happy to help."
          tone="clay"
        />

        <section className="relative overflow-hidden bg-white pb-24 pt-16 dark:bg-navy-800 md:pb-32">
          <div className="pointer-events-none absolute inset-0">
            <Blob tone="sage" className="-right-28 top-24 h-80 w-80" />
            <Sprig className="left-[3%] bottom-24 hidden h-32 w-24 rotate-12 text-clay-400/40 xl:block" />
          </div>

          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_440px]">

              {/* Left: Info + Map */}
              <div>
                <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {CONTACT_INFO.map(info => (
                    <div key={info.title} className="card-lift group p-7">
                      <div className={`icon-blob mb-5 h-12 w-12 ${info.blob}`}>
                        <info.icon className="h-5 w-5" />
                      </div>
                      <h3 className="mb-2 font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
                        {info.title}
                      </h3>
                      {info.lines.map(line => (
                        <p key={line} className="font-body text-sm text-navy-500 dark:text-sand-400">{line}</p>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="overflow-hidden rounded-[28px] border border-sand-300 shadow-soft dark:border-navy-600">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60356.95!2d72.8479!3d19.1197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzEwLjkiTiA3MsKwNTAnNTIuNCJF!5e0!3m2!1sen!2sin!4v1600000000"
                    className="h-[380px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sokha Realty office location"
                  />
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
