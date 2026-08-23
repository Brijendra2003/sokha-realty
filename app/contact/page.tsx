import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/common/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Sokha Realty. Visit our office, call us, or send a message — we\'re here to help you find your dream home in Mumbai.',
  alternates: { canonical: '/contact' },
};

const CONTACT_INFO = [
  { icon: MapPin, title: 'Office Address', lines: ['Sokha Realty, 4th Floor,', 'Andheri West, Mumbai – 400053'] },
  { icon: Phone,  title: 'Phone',          lines: ['+91 98765 43210', '+91 22 4567 8900'] },
  { icon: Mail,   title: 'Email',          lines: ['info@sokharealty.com', 'sales@sokharealty.com'] },
  { icon: Clock,  title: 'Office Hours',   lines: ['Mon – Sat: 10:00 AM – 7:00 PM', 'Sunday: By appointment'] },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-charcoal-900 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="container-max relative z-10 text-center">
            <span className="section-label !text-gold-400">Get In Touch</span>
            <h1 className="heading-xl text-white max-w-2xl mx-auto text-balance">
              Let's Talk About Your <em className="text-gradient-gold not-italic">Dream Home</em>
            </h1>
            <p className="font-body text-charcoal-300 max-w-xl mx-auto mt-6">
              Whether you have a question about a project or want to schedule a visit — we're here to help.
            </p>
          </div>
        </section>

        <section className="section-py bg-ivory-100 dark:bg-charcoal-900">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10">

              {/* Left: Info + Map */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  {CONTACT_INFO.map(info => (
                    <div key={info.title} className="card p-5">
                      <div className="w-10 h-10 rounded-sm bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center mb-3">
                        <info.icon className="w-4 h-4 text-gold-500" />
                      </div>
                      <h3 className="font-display font-semibold text-charcoal-800 dark:text-ivory-100 mb-1">
                        {info.title}
                      </h3>
                      {info.lines.map(line => (
                        <p key={line} className="text-sm text-charcoal-500 dark:text-charcoal-300">{line}</p>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="card overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60356.95!2d72.8479!3d19.1197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA3JzEwLjkiTiA3MsKwNTAnNTIuNCJF!5e0!3m2!1sen!2sin!4v1600000000"
                    className="w-full h-[360px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sokha Realty office location"
                  />
                </div>
              </div>

              {/* Right: Contact Form */}
              <div>
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
