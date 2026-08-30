import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "RERA Disclosures",
  description:
    "MahaRERA registration details for Sokha Realty projects, promoter information, and how to independently verify every project on the official MahaRERA portal.",
  alternates: { canonical: "/rera" },
};

const UPDATED = "30 August 2026";

const MAHARERA_URL = "https://maharera.maharashtra.gov.in";

/**
 * Registration register.
 * Replace these placeholder rows with the actual registration numbers issued
 * for each project before the site goes live.
 */
const REGISTRATIONS = [
  {
    project: "Sokha Vantage",
    location: "Andheri West, Mumbai",
    regNo: "P51800000001",
    validTill: "31 Dec 2028",
  },
  {
    project: "Sokha Meridian",
    location: "Powai, Mumbai",
    regNo: "P51800000002",
    validTill: "30 Jun 2029",
  },
  {
    project: "Sokha Crest",
    location: "Thane West, Thane",
    regNo: "P51700000003",
    validTill: "31 Mar 2030",
  },
];

const sections: LegalSection[] = [
  {
    id: "statement",
    title: "Statutory statement",
    content: (
      <>
        <p>
          Sokha Realty Pvt. Ltd. is a promoter registered under the{" "}
          <strong>Real Estate (Regulation and Development) Act, 2016</strong>{" "}
          (&ldquo;RERA&rdquo;) and the Maharashtra Real Estate (Regulation and
          Development) Rules made thereunder. Every project we market on this
          website that is required to be registered has been registered with the{" "}
          <strong>Maharashtra Real Estate Regulatory Authority (MahaRERA)</strong>.
        </p>
        <p>
          In compliance with Section 11 of the Act, the registration number of each
          project, along with the MahaRERA website address, is displayed on this
          page, on the relevant project page, and in every advertisement we issue.
        </p>
        <div className="legal-callout mt-6">
          <strong>Verify before you rely.</strong> Do not rely on this page alone.
          Independently verify every registration number on the official portal at{" "}
          <a href={MAHARERA_URL} target="_blank" rel="noopener noreferrer">
            maharera.maharashtra.gov.in
          </a>
          . The particulars filed with the Authority prevail over anything published
          on this website.
        </div>
      </>
    ),
  },
  {
    id: "registrations",
    title: "Project registration numbers",
    content: (
      <>
        <p>
          The following projects are registered with MahaRERA. Registration details
          are updated as new phases are launched and as approvals are extended.
        </p>
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Location</th>
              <th>MahaRERA Reg. No.</th>
              <th>Valid till</th>
            </tr>
          </thead>
          <tbody>
            {REGISTRATIONS.map((r) => (
              <tr key={r.regNo}>
                <td>
                  <strong>{r.project}</strong>
                </td>
                <td>{r.location}</td>
                <td className="font-mono">{r.regNo}</td>
                <td className="font-mono">{r.validTill}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          A project not listed above is either not yet launched, not yet registered,
          or not required to be registered under Section 3(2) of the Act. We do not
          advertise, market, book, sell or offer for sale any unit in a project
          requiring registration before that registration has been granted.
        </p>
      </>
    ),
  },
  {
    id: "promoter",
    title: "Promoter details",
    content: (
      <table>
        <tbody>
          <tr>
            <td>
              <strong>Registered name</strong>
            </td>
            <td>Sokha Realty Pvt. Ltd.</td>
          </tr>
          <tr>
            <td>
              <strong>Registered office</strong>
            </td>
            <td>
              4th Floor, Andheri West, Mumbai&nbsp;&ndash;&nbsp;400 053,
              Maharashtra, India
            </td>
          </tr>
          <tr>
            <td>
              <strong>CIN</strong>
            </td>
            <td className="font-mono">U70100MH1995PTC000000</td>
          </tr>
          <tr>
            <td>
              <strong>Promoter type</strong>
            </td>
            <td>Private limited company</td>
          </tr>
          <tr>
            <td>
              <strong>Contact</strong>
            </td>
            <td>
              <a href="mailto:rera@sokharealty.com">rera@sokharealty.com</a> · +91
              98765 43210
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "how-to-verify",
    title: "How to verify a project yourself",
    content: (
      <>
        <ol>
          <li>
            Visit{" "}
            <a href={MAHARERA_URL} target="_blank" rel="noopener noreferrer">
              maharera.maharashtra.gov.in
            </a>
            .
          </li>
          <li>
            Open <strong>Registration &rarr; Registered Projects</strong> and search
            by the registration number, the project name, or the promoter name
            &ldquo;Sokha Realty&rdquo;.
          </li>
          <li>
            Review the sanctioned plans, layout, approvals, land title certificate,
            encumbrance details, proposed completion date, and the quarterly
            progress updates filed by the promoter.
          </li>
          <li>
            Confirm the <strong>carpet area</strong> declared for the unit you are
            considering, and compare it against what you have been told.
          </li>
          <li>
            Check the registration status and validity period. An expired or revoked
            registration is a material fact you should confirm before paying any
            amount.
          </li>
        </ol>
        <p>
          You can also verify whether the person you are dealing with is a{" "}
          <strong>RERA-registered real estate agent</strong> using the{" "}
          <em>Registered Real Estate Agents</em> search on the same portal.
        </p>
      </>
    ),
  },
  {
    id: "what-rera-covers",
    title: "What registration does and does not mean",
    content: (
      <>
        <h3>Registration means</h3>
        <ul>
          <li>
            The project&rsquo;s approvals, plans and title documents have been filed
            with the Authority and are available for public inspection.
          </li>
          <li>
            70% of the amounts collected from allottees must be deposited in a
            separate designated bank account and used only for construction and land
            cost of that project.
          </li>
          <li>
            Units are sold on <strong>carpet area</strong> as defined in Section
            2(k) of the Act — not on built-up or super built-up area.
          </li>
          <li>
            The promoter is liable to rectify structural defects and defects in
            workmanship notified within 5 years of possession.
          </li>
          <li>
            The promoter must obtain the consent of at least two-thirds of allottees
            before altering sanctioned plans or the common areas.
          </li>
        </ul>

        <h3>Registration does not mean</h3>
        <ul>
          <li>
            That MahaRERA endorses, recommends or guarantees the project, the
            promoter, the quality of construction, or any investment return.
          </li>
          <li>
            That the completion date is guaranteed — it is the date declared by the
            promoter and may be extended in the circumstances the Act permits.
          </li>
          <li>
            That prices, payment plans or amenities shown in marketing material are
            fixed. Only the registered Agreement for Sale binds the parties.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights as an allottee",
    content: (
      <>
        <p>Under the Act you are entitled to:</p>
        <ul>
          <li>
            obtain information about sanctioned plans, layout plans, and the stage-
            wise time schedule of completion;
          </li>
          <li>
            know the stage-wise time schedule of completion of the project,
            including provisions for water, sanitation, electricity and other
            amenities;
          </li>
          <li>
            claim possession of the apartment and the common areas as per the
            declaration given by the promoter;
          </li>
          <li>
            claim a refund with interest, or compensation, if the promoter fails to
            comply with or contravenes the Agreement for Sale;
          </li>
          <li>
            receive documents including the occupancy certificate and the completion
            certificate.
          </li>
        </ul>
        <p>
          You are correspondingly required to make payments as agreed, and to
          participate in the formation of the association of allottees and the
          registration of the conveyance deed.
        </p>
      </>
    ),
  },
  {
    id: "agents",
    title: "Channel partners and agents",
    content: (
      <>
        <p>
          Sokha Realty works with real estate agents who are registered with
          MahaRERA and appointed by us in writing. Please note:
        </p>
        <ul>
          <li>
            Always ask for the agent&rsquo;s MahaRERA registration number and verify
            it on the official portal.
          </li>
          <li>
            <strong>
              Never pay any booking amount, token or consideration in cash, or into
              the personal account of any individual.
            </strong>{" "}
            All payments must be made by cheque, NEFT/RTGS or UPI into the
            designated project bank account named in the Agreement for Sale, in
            favour of the registered promoter entity.
          </li>
          <li>
            We are not bound by any representation, assurance, discount or timeline
            given by an agent that is not recorded in writing in the registered
            Agreement for Sale.
          </li>
        </ul>
        <p>
          If someone claims to represent us and you wish to confirm it, email{" "}
          <a href="mailto:rera@sokharealty.com">rera@sokharealty.com</a>.
        </p>
      </>
    ),
  },
  {
    id: "grievance",
    title: "Complaints and grievance redressal",
    content: (
      <>
        <p>
          Raise a concern with us first at{" "}
          <a href="mailto:rera@sokharealty.com">rera@sokharealty.com</a>. We
          acknowledge within 3 working days and aim to resolve within 30 days.
        </p>
        <p>
          If you remain dissatisfied, you may file a complaint against the promoter
          under Section 31 of the Act:
        </p>
        <ol>
          <li>
            Online through the MahaRERA portal at{" "}
            <a href={MAHARERA_URL} target="_blank" rel="noopener noreferrer">
              maharera.maharashtra.gov.in
            </a>{" "}
            under <strong>Complaints</strong>, on payment of the prescribed fee; or
          </li>
          <li>
            Before the MahaRERA Conciliation Forum, where both parties agree to
            conciliation; or
          </li>
          <li>
            By appeal to the Maharashtra Real Estate Appellate Tribunal against an
            order of the Authority.
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "disclaimer",
    title: "Disclosure disclaimer",
    content: (
      <p>
        The registration numbers and particulars on this page are reproduced in good
        faith from our filings and are updated periodically. Typographical errors or
        timing gaps between a filing and this page are possible. The record held by
        MahaRERA is authoritative. Nothing on this page is a substitute for
        independent legal advice or for reading the registered Agreement for Sale.
        See also our <Link href="/disclaimer">Disclaimer</Link> and{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    ),
  },
];

export default function ReraDisclosuresPage() {
  return (
    <LegalLayout
      eyebrow="Regulatory"
      title="RERA Disclosures"
      intro="Every project we market that requires registration is registered with MahaRERA. Here are the numbers, the promoter details, and how to check all of it for yourself on the official portal."
      updated={UPDATED}
      sections={sections}
      preamble={
        <div className="legal-callout">
          <strong>MahaRERA registration.</strong> Project-wise registration numbers
          are listed in section 02 below and on each project page. Verify them at{" "}
          <a href={MAHARERA_URL} target="_blank" rel="noopener noreferrer">
            maharera.maharashtra.gov.in
          </a>
          . Units are sold on <strong>carpet area</strong> as defined under Section
          2(k) of the RERA Act, 2016.
        </div>
      }
    />
  );
}
