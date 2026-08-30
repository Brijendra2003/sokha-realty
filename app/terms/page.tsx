import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms on which Sokha Realty makes sokharealty.com available — permitted use, intellectual property, the status of information on the site, liability and governing law.",
  alternates: { canonical: "/terms" },
};

const UPDATED = "30 August 2026";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    content: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use
          of <strong>sokharealty.com</strong> and any associated sub-domains,
          landing pages and forms (the &ldquo;Platform&rdquo;), operated by{" "}
          <strong>Sokha Realty Pvt. Ltd.</strong>, a company incorporated in India
          with its registered office in Mumbai, Maharashtra.
        </p>
        <p>
          By accessing the Platform, browsing a project page, submitting an enquiry
          or subscribing to updates, you agree to be bound by these Terms and by our{" "}
          <Link href="/privacy">Privacy Policy</Link>,{" "}
          <Link href="/disclaimer">Disclaimer</Link> and{" "}
          <Link href="/rera">RERA Disclosures</Link>, each of which forms part of
          these Terms. If you do not agree, please stop using the Platform.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <p>
        You must be at least 18 years old and competent to contract under the Indian
        Contract Act, 1872 to use the Platform or submit an enquiry. If you use the
        Platform on behalf of a company, partnership or trust, you confirm that you
        are authorised to bind that entity to these Terms.
      </p>
    ),
  },
  {
    id: "no-offer",
    title: "Information on the Platform is not an offer",
    content: (
      <>
        <p>
          Everything published on the Platform — including project descriptions,
          images, renders, floor plans, area statements, amenity lists, price
          indications, payment schedules and completion timelines — is{" "}
          <strong>indicative and for general information only</strong>. It does not
          constitute an offer, an invitation to offer, or any contractual
          representation or warranty by Sokha Realty.
        </p>
        <p>
          No binding contract for the sale or allotment of any unit comes into
          existence until:
        </p>
        <ol>
          <li>
            a written application form has been accepted by us in writing, and
          </li>
          <li>
            an Agreement for Sale has been executed between the parties and duly
            registered under the Registration Act, 1908.
          </li>
        </ol>
        <p>
          In the event of any inconsistency between the Platform and the registered
          Agreement for Sale or the details filed with the Maharashtra Real Estate
          Regulatory Authority, <strong>those documents prevail</strong>. Please
          read the full <Link href="/disclaimer">Disclaimer</Link> before relying on
          anything published here.
        </p>
      </>
    ),
  },
  {
    id: "permitted-use",
    title: "Permitted use",
    content: (
      <>
        <p>
          We grant you a limited, personal, non-exclusive, non-transferable and
          revocable licence to access the Platform for the purpose of evaluating our
          projects, applying for a role, or contacting us. You agree that you will
          not:
        </p>
        <ul>
          <li>
            copy, reproduce, republish or redistribute any content from the Platform
            for commercial purposes without our prior written consent;
          </li>
          <li>
            scrape, crawl, harvest or use automated means to extract data, listings,
            images or contact details;
          </li>
          <li>
            attempt to gain unauthorised access to any part of the Platform, its
            servers, databases or admin areas;
          </li>
          <li>
            introduce malware, or interfere with the availability or integrity of
            the Platform;
          </li>
          <li>
            submit false, misleading or third-party contact details, or impersonate
            any person;
          </li>
          <li>
            hold yourself out as an agent, broker, channel partner or representative
            of Sokha Realty without a valid written appointment from us;
          </li>
          <li>
            use the Platform in a manner that violates any applicable law, or that
            infringes the rights of any third party.
          </li>
        </ul>
        <p>
          We may suspend or terminate your access at any time, without notice, if we
          reasonably believe you have breached these Terms.
        </p>
      </>
    ),
  },
  {
    id: "enquiries",
    title: "Enquiries, applications and communications",
    content: (
      <>
        <p>
          When you submit an enquiry, career application, newsletter subscription or
          any other form on the Platform, you confirm that the information you
          provide is true, accurate and your own.
        </p>
        <p>
          You authorise Sokha Realty and its authorised channel partners to contact
          you by phone, SMS, email, WhatsApp or other electronic means regarding your
          enquiry and our projects. This consent operates notwithstanding any
          registration on the National Customer Preference Register / Do Not Disturb
          registry, and continues until you withdraw it by writing to{" "}
          <a href="mailto:privacy@sokharealty.com">privacy@sokharealty.com</a>.
        </p>
        <p>
          We are under no obligation to respond to, act upon, or preserve any
          enquiry. Submitting an application for employment does not create any
          obligation on us to interview or engage you.
        </p>
      </>
    ),
  },
  {
    id: "user-content",
    title: "Content you submit",
    content: (
      <p>
        You retain ownership of documents and information you upload, such as a
        résumé. By uploading it, you grant us a non-exclusive, royalty-free licence
        to store, reproduce and process it for the purpose it was submitted for, in
        line with our <Link href="/privacy">Privacy Policy</Link>. You confirm that
        you have the right to share the material and that it does not infringe
        anyone else&rsquo;s rights or contain unlawful content. We may remove any
        submission at our discretion.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    content: (
      <>
        <p>
          The Platform and all material on it — including the &ldquo;Sokha
          Realty&rdquo; name and logo, project names, text, photographs,
          architectural renders, walkthroughs, floor plans, layouts, graphics,
          software and page design — are owned by or licensed to Sokha Realty and
          are protected by Indian and international copyright, trade mark and design
          law.
        </p>
        <p>
          You may view pages and print or download a copy for your own,
          non-commercial reference, provided you do not remove any copyright or
          proprietary notice. All other rights are reserved. Any unauthorised use
          may attract civil and criminal liability.
        </p>
        <p>
          If you believe material on the Platform infringes your intellectual
          property, write to{" "}
          <a href="mailto:legal@sokharealty.com">legal@sokharealty.com</a> with
          details of the work and the allegedly infringing page.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party links and services",
    content: (
      <p>
        The Platform may link to or embed third-party services such as maps, videos,
        social media, home-loan providers, channel partner sites and the MahaRERA
        portal. We do not control those services, do not endorse their content, and
        are not responsible for their availability, accuracy or practices. Your use
        of a third-party service is governed by that party&rsquo;s own terms.
      </p>
    ),
  },
  {
    id: "availability",
    title: "Availability of the Platform",
    content: (
      <p>
        We aim to keep the Platform available but do not guarantee uninterrupted or
        error-free access. We may modify, suspend or discontinue any part of the
        Platform, including individual project pages, at any time without notice.
        Content is published on an &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; basis and may become out of date; we are under no
        obligation to update it.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, Sokha Realty, its directors,
          employees, agents and channel partners shall not be liable for any
          indirect, incidental, special, consequential or punitive loss, or for any
          loss of profit, revenue, business, goodwill, data or anticipated savings,
          arising out of or in connection with your use of, or inability to use, the
          Platform.
        </p>
        <p>
          Our aggregate liability in connection with the Platform, whether in
          contract, tort (including negligence), statute or otherwise, is limited to
          INR 10,000 (Rupees Ten Thousand only).
        </p>
        <p>
          Nothing in these Terms excludes or limits liability that cannot lawfully
          be excluded or limited, including liability for fraud or for obligations
          owed to an allottee under the Real Estate (Regulation and Development)
          Act, 2016 and the registered Agreement for Sale.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    content: (
      <p>
        You agree to indemnify and hold harmless Sokha Realty, its directors,
        officers, employees and agents against any claim, demand, loss, liability,
        cost or expense (including reasonable legal fees) arising from your breach of
        these Terms, your misuse of the Platform, your infringement of any
        third-party right, or any content you submit.
      </p>
    ),
  },
  {
    id: "force-majeure",
    title: "Force majeure",
    content: (
      <p>
        We are not liable for any failure or delay in performance caused by events
        beyond our reasonable control, including acts of God, flood, fire, epidemic,
        civil unrest, strikes, changes in law or government order, failure of
        utilities, internet or hosting infrastructure, or cyber attack.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    content: (
      <>
        <p>
          These Terms are governed by the laws of India. Subject to the paragraph
          below, the courts at <strong>Mumbai, Maharashtra</strong> have exclusive
          jurisdiction over any dispute arising out of or relating to the Platform or
          these Terms.
        </p>
        <p>
          Any dispute that cannot be resolved amicably within 30 days of written
          notice shall be referred to arbitration by a sole arbitrator appointed by
          Sokha Realty in accordance with the Arbitration and Conciliation Act, 1996.
          The seat and venue of arbitration shall be Mumbai and the proceedings shall
          be conducted in English.
        </p>
        <p>
          Nothing in this clause affects your right to approach the Maharashtra Real
          Estate Regulatory Authority, the Real Estate Appellate Tribunal, or a
          consumer forum where the law entitles you to do so.
        </p>
      </>
    ),
  },
  {
    id: "general",
    title: "General",
    content: (
      <ul>
        <li>
          <strong>Severability</strong> — if any provision is held unenforceable, the
          remainder continues in full force.
        </li>
        <li>
          <strong>Waiver</strong> — our failure to enforce a provision is not a
          waiver of our right to enforce it later.
        </li>
        <li>
          <strong>Entire agreement</strong> — these Terms, together with the Privacy
          Policy, Disclaimer and RERA Disclosures, are the entire agreement between
          us regarding the Platform.
        </li>
        <li>
          <strong>Assignment</strong> — you may not assign your rights under these
          Terms; we may assign ours to a group company or successor.
        </li>
        <li>
          <strong>Changes</strong> — we may revise these Terms at any time. The
          &ldquo;last updated&rdquo; date above reflects the current version, and
          continued use after that date constitutes acceptance.
        </li>
      </ul>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of Service"
      intro="The rules that apply when you use sokharealty.com — what the information on this site does and does not mean, what you may do with it, and how disputes are handled."
      updated={UPDATED}
      effective={UPDATED}
      sections={sections}
      preamble={
        <div className="legal-callout">
          <strong>The most important point.</strong> Nothing on this website is an
          offer or a contract. Prices, plans, areas, amenities and timelines shown
          here are indicative. Your rights as a purchaser come from the registered
          Agreement for Sale and the details filed with MahaRERA — not from this
          site.
        </div>
      }
    />
  );
}
