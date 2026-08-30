import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sokha Realty collects, uses, stores and protects your personal data when you use sokharealty.com, submit an enquiry, apply for a role or subscribe to updates.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "30 August 2026";

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Scope of this policy",
    content: (
      <>
        <p>
          This Privacy Policy explains how <strong>Sokha Realty Pvt. Ltd.</strong>{" "}
          (&ldquo;Sokha Realty&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles
          personal data collected through the website{" "}
          <strong>sokharealty.com</strong>, its sub-domains, landing pages, and any
          forms, chat widgets or campaigns operated by us (together, the
          &ldquo;Platform&rdquo;).
        </p>
        <p>
          It is published in accordance with the Digital Personal Data Protection
          Act, 2023, the Information Technology Act, 2000 and the Information
          Technology (Reasonable Security Practices and Procedures and Sensitive
          Personal Data or Information) Rules, 2011.
        </p>
        <p>
          By using the Platform or submitting an enquiry, you confirm that you have
          read this policy. If you do not agree with it, please do not submit your
          information to us.
        </p>
      </>
    ),
  },
  {
    id: "data-we-collect",
    title: "Personal data we collect",
    content: (
      <>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Enquiry &amp; site-visit forms</strong> — name, mobile number,
            email address, preferred configuration, budget range, preferred
            location and any message you write.
          </li>
          <li>
            <strong>Career applications</strong> — name, contact details, résumé /
            CV, work history, qualifications, current and expected compensation,
            and anything else contained in the documents you upload.
          </li>
          <li>
            <strong>Newsletter subscription</strong> — email address.
          </li>
          <li>
            <strong>Correspondence</strong> — records of calls, emails, WhatsApp
            messages and in-person meetings relating to your enquiry.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            IP address, approximate city-level location, browser and device type,
            operating system, and referring URL.
          </li>
          <li>
            Pages viewed, projects opened, time spent, scroll depth and clicks,
            collected through cookies and similar technologies.
          </li>
          <li>
            Campaign identifiers (such as UTM parameters and click IDs) that tell
            us which advertisement or channel brought you to the Platform.
          </li>
        </ul>

        <h3>What we do not collect</h3>
        <p>
          We do not ask for and do not want your passwords, full bank account
          numbers, card numbers, UPI PINs, Aadhaar/PAN images or one-time
          passwords through this website. Booking-stage documentation is collected
          offline through our sales office under a separate, signed process.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use your data",
    content: (
      <>
        <p>We process personal data for the following purposes:</p>
        <ul>
          <li>
            <strong>Responding to you</strong> — to call, email or message you
            about the project you enquired about, share brochures, price sheets and
            floor plans, and schedule site visits.
          </li>
          <li>
            <strong>Sales administration</strong> — to record your requirement,
            allocate a relationship manager, and maintain a history of your
            interactions with us.
          </li>
          <li>
            <strong>Recruitment</strong> — to assess your application, conduct
            interviews and, where relevant, keep your profile on file for future
            openings.
          </li>
          <li>
            <strong>Marketing</strong> — to send launch announcements, offers,
            construction updates and newsletters, where you have not opted out.
          </li>
          <li>
            <strong>Improving the Platform</strong> — to analyse aggregate usage,
            fix defects, and measure the performance of our advertising.
          </li>
          <li>
            <strong>Legal and regulatory</strong> — to comply with obligations
            under RERA, taxation, anti-money-laundering and other applicable laws,
            and to establish or defend legal claims.
          </li>
        </ul>
        <div className="legal-callout mt-6">
          <strong>A note on calls and messages.</strong> When you submit an enquiry
          you are giving us permission to contact you on the number provided, even
          if that number is registered on the DND / NCPR registry. You can withdraw
          this permission at any time by writing to{" "}
          <a href="mailto:privacy@sokharealty.com">privacy@sokharealty.com</a>.
        </div>
      </>
    ),
  },
  {
    id: "legal-basis",
    title: "Lawful basis and consent",
    content: (
      <>
        <p>
          We rely on your <strong>consent</strong> for marketing communications and
          for non-essential cookies. You give that consent by ticking the relevant
          box or by submitting a form that clearly says what it is for.
        </p>
        <p>
          We rely on <strong>legitimate uses</strong> permitted under the Digital
          Personal Data Protection Act, 2023 — such as responding to an enquiry you
          voluntarily made, complying with a legal obligation, or protecting our
          rights — for the remaining processing described above.
        </p>
        <p>
          You may withdraw consent at any time. Withdrawal does not affect anything
          we lawfully did before you withdrew it, and we may still need to retain
          certain records to meet statutory obligations.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Who we share data with",
    content: (
      <>
        <p>
          We do not sell your personal data. We share it only in the following
          situations:
        </p>
        <ul>
          <li>
            <strong>Service providers (data processors)</strong> — hosting,
            database, media storage, email, analytics, CRM and spreadsheet
            providers who process data on our written instructions. These currently
            include cloud infrastructure and productivity services operated by
            Google LLC, Firebase, Cloudinary and similar vendors.
          </li>
          <li>
            <strong>Channel partners and authorised agents</strong> — where your
            enquiry originated from, or is being serviced by, a RERA-registered
            channel partner appointed by us.
          </li>
          <li>
            <strong>Professional advisers</strong> — lawyers, auditors and
            consultants bound by confidentiality.
          </li>
          <li>
            <strong>Authorities</strong> — regulators, courts or law-enforcement
            agencies where disclosure is required by law.
          </li>
          <li>
            <strong>Business transfers</strong> — an acquirer or successor entity in
            the event of a merger, restructuring or sale of assets, subject to this
            policy continuing to apply.
          </li>
        </ul>
        <p>
          Some of these providers store data on servers located outside India. Where
          that happens, we transfer data only to jurisdictions not restricted by the
          Central Government and require contractual safeguards from the provider.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and tracking",
    content: (
      <>
        <p>
          Cookies are small files placed on your device. We use them for the
          following purposes:
        </p>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Purpose</th>
              <th>Can you disable it?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Essential</td>
              <td>
                Page routing, security, remembering your light/dark theme choice
              </td>
              <td>No — the site will not work correctly</td>
            </tr>
            <tr>
              <td>Analytics</td>
              <td>Understanding which projects and pages get attention</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Advertising</td>
              <td>
                Measuring campaign performance and showing relevant ads elsewhere
              </td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
        <p>
          You can block or delete cookies in your browser settings. Doing so may
          break parts of the Platform. We also honour the{" "}
          <em>Global Privacy Control</em> and browser Do-Not-Track signals where
          technically feasible.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    content: (
      <>
        <ul>
          <li>
            <strong>Enquiries that do not convert</strong> — up to 24 months from
            your last interaction with us.
          </li>
          <li>
            <strong>Customers</strong> — for the duration of the relationship and
            for 8 years thereafter, to satisfy statutory, tax and RERA
            record-keeping requirements.
          </li>
          <li>
            <strong>Career applications</strong> — 12 months from the date of
            application unless you ask us to remove them sooner.
          </li>
          <li>
            <strong>Newsletter subscribers</strong> — until you unsubscribe.
          </li>
          <li>
            <strong>Website logs and analytics</strong> — typically 14 months in
            identifiable form.
          </li>
        </ul>
        <p>
          When a retention period ends we delete the data or irreversibly anonymise
          it.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "How we protect your data",
    content: (
      <>
        <p>
          We maintain reasonable security practices proportionate to the sensitivity
          of the data we hold, including:
        </p>
        <ul>
          <li>TLS encryption for all data in transit to and from the Platform.</li>
          <li>
            Encryption at rest and access controls on our databases and file
            storage.
          </li>
          <li>
            Role-based access, so staff see only the records they need for their
            work.
          </li>
          <li>
            reCAPTCHA and rate limiting on public forms to prevent scraping and
            abuse.
          </li>
          <li>Periodic review of vendor security posture and access logs.</li>
        </ul>
        <p>
          No system is completely secure. If a personal data breach occurs that is
          likely to affect you, we will notify you and the Data Protection Board of
          India as required by law.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    content: (
      <>
        <p>Subject to applicable law, you may ask us to:</p>
        <ul>
          <li>
            <strong>Access</strong> — confirm what personal data we hold about you
            and obtain a summary of how it is processed.
          </li>
          <li>
            <strong>Correct</strong> — rectify inaccurate or incomplete data, or
            update it.
          </li>
          <li>
            <strong>Erase</strong> — delete data that is no longer necessary for the
            purpose it was collected for.
          </li>
          <li>
            <strong>Withdraw consent</strong> — stop marketing communications, or
            withdraw permission for a specific processing activity.
          </li>
          <li>
            <strong>Nominate</strong> — appoint another individual to exercise these
            rights on your behalf in the event of death or incapacity.
          </li>
          <li>
            <strong>Grieve</strong> — raise a complaint about how we have handled
            your data.
          </li>
        </ul>
        <p>
          To exercise any of these, email{" "}
          <a href="mailto:privacy@sokharealty.com">privacy@sokharealty.com</a> from
          the address you registered with, or write to our Grievance Officer below.
          We respond within 30 days. We may ask you to verify your identity before
          acting on a request.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children's data",
    content: (
      <p>
        The Platform is intended for adults evaluating a property purchase or a
        career with us. We do not knowingly collect personal data of anyone under
        18. If you believe a child has provided us data, write to{" "}
        <a href="mailto:privacy@sokharealty.com">privacy@sokharealty.com</a> and we
        will delete it.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "Third-party sites and embeds",
    content: (
      <p>
        Our pages may embed maps, videos and social media content, and may link to
        websites we do not operate — including those of channel partners, banks
        offering home loans, and the MahaRERA portal. Those parties have their own
        privacy policies and we are not responsible for their practices. Please read
        their policies before sharing anything with them. See also our{" "}
        <Link href="/disclaimer">Disclaimer</Link>.
      </p>
    ),
  },
  {
    id: "grievance",
    title: "Grievance Officer",
    content: (
      <>
        <p>
          In accordance with the Information Technology Act, 2000 and the rules made
          thereunder, the contact details of our Grievance Officer are:
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Name</strong>
              </td>
              <td>Grievance Officer, Sokha Realty Pvt. Ltd.</td>
            </tr>
            <tr>
              <td>
                <strong>Address</strong>
              </td>
              <td>
                Sokha Realty, 4th Floor, Andheri West, Mumbai&nbsp;&ndash;&nbsp;400
                053, Maharashtra, India
              </td>
            </tr>
            <tr>
              <td>
                <strong>Email</strong>
              </td>
              <td>
                <a href="mailto:grievance@sokharealty.com">
                  grievance@sokharealty.com
                </a>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Phone</strong>
              </td>
              <td>+91 98765 43210 (Mon&ndash;Sat, 10:00&ndash;18:00 IST)</td>
            </tr>
          </tbody>
        </table>
        <p>
          If you are not satisfied with our response, you may escalate the matter to
          the Data Protection Board of India.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    content: (
      <p>
        We may update this policy to reflect changes in our practices or in the law.
        The &ldquo;last updated&rdquo; date at the top of this page always shows the
        current version. Where a change materially affects your rights, we will
        notify you by email or through a prominent notice on the Platform before it
        takes effect. Continued use of the Platform after that date means you accept
        the revised policy.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      intro="We collect only what we need to answer your enquiry, keep it for only as long as we must, and never sell it. This page sets out exactly what that means in practice."
      updated={UPDATED}
      effective={UPDATED}
      sections={sections}
      preamble={
        <div className="legal-callout">
          <strong>In short.</strong> We collect your name and contact details when
          you enquire about a project, apply for a role, or subscribe to updates. We
          use them to respond to you and to send updates you have asked for. We
          share them only with the vendors and partners who help us serve you. You
          can ask us to correct or delete your data at any time by writing to{" "}
          <a href="mailto:privacy@sokharealty.com">privacy@sokharealty.com</a>. This
          summary is for convenience only — the full text below governs.
        </div>
      }
    />
  );
}
