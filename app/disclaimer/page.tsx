import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "What the images, plans, areas, prices and timelines on sokharealty.com actually represent — and what governs your purchase instead.",
  alternates: { canonical: "/disclaimer" },
};

const UPDATED = "30 August 2026";

const sections: LegalSection[] = [
  {
    id: "general",
    title: "General",
    content: (
      <>
        <p>
          This website is maintained by <strong>Sokha Realty Pvt. Ltd.</strong> for
          the sole purpose of providing general information about the company and
          its projects. It is not, and must not be construed as, an offer, an
          invitation to offer, a solicitation, or an advertisement to sell within the
          meaning of any law.
        </p>
        <p>
          By continuing to browse this website, you acknowledge that you are doing so
          voluntarily, on your own enquiry, and that no part of the content
          constitutes advice on which you should rely without independent
          verification.
        </p>
      </>
    ),
  },
  {
    id: "images",
    title: "Images, renders and walkthroughs",
    content: (
      <>
        <p>
          All images, three-dimensional renders, elevations, walkthroughs, videos,
          landscaping views and interior visuals on this website are{" "}
          <strong>artistic impressions</strong> created by our design consultants.
          They are indicative only.
        </p>
        <ul>
          <li>
            Furniture, fittings, appliances, décor, artwork, wall finishes,
            wallpapers, false ceilings, planters and landscaping shown are{" "}
            <strong>not part of the standard offering</strong> and are not supplied
            with the unit unless expressly listed in the registered Agreement for
            Sale.
          </li>
          <li>
            Surrounding buildings, skylines, greenery, water bodies and views shown
            are illustrative. Actual views from a unit depend on its floor,
            orientation and future development on neighbouring plots, over which we
            have no control.
          </li>
          <li>
            Model flats and sample units are for display. Dimensions, finishes and
            fixtures in a model flat may differ from the unit delivered.
          </li>
          <li>
            Colours reproduced on a screen vary by device and are not an accurate
            representation of the actual finish.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "plans-and-areas",
    title: "Plans, dimensions and area statements",
    content: (
      <>
        <p>
          Floor plans, unit layouts, master plans, key plans and area statements
          published here are indicative and are subject to change, to approval by the
          competent authorities, and to variation during construction.
        </p>
        <div className="legal-callout my-6">
          <strong>Carpet area governs.</strong> All units are offered and sold on
          the basis of <strong>carpet area</strong> as defined under Section 2(k) of
          the Real Estate (Regulation and Development) Act, 2016. Any reference on
          this website to built-up area, super built-up area, saleable area or
          loading is for general understanding only and does not form the basis of
          sale.
        </div>
        <ul>
          <li>
            Dimensions shown are approximate, generally measured to unfinished
            surfaces, and exclude the thickness of finishes such as plaster,
            cladding and skirting.
          </li>
          <li>
            Plans are not to scale unless a scale bar is expressly shown.
          </li>
          <li>
            Ducts, shafts, service areas, structural members and machine rooms may
            not be fully depicted.
          </li>
        </ul>
        <p>
          The plans annexed to and the areas stated in the registered Agreement for
          Sale, and the particulars filed with MahaRERA, are the only authoritative
          record.
        </p>
      </>
    ),
  },
  {
    id: "amenities",
    title: "Amenities and specifications",
    content: (
      <p>
        Amenities, facilities, brands and specifications listed on this website are
        proposed and subject to change without notice, including on account of
        design revisions, statutory approvals, availability of materials, or
        directions of the competent authority. Certain amenities may be delivered in
        phases, may be shared between phases or towers, may require the formation of
        the association of allottees, and may be subject to usage charges,
        memberships or maintenance contributions. Brand names, where mentioned, may
        be substituted with products of equivalent or better specification.
      </p>
    ),
  },
  {
    id: "pricing",
    title: "Prices, payment plans and offers",
    content: (
      <>
        <p>
          Any price, price range, per-square-foot rate, payment schedule, offer,
          scheme, discount or waiver mentioned on this website is{" "}
          <strong>indicative, non-binding, and valid only for the period and on
          the terms we specify in writing</strong>. Prices are exclusive of GST,
          stamp duty, registration charges, statutory levies, maintenance deposits,
          club charges, parking charges, infrastructure charges and other amounts
          payable under the Agreement for Sale, unless stated otherwise.
        </p>
        <p>
          Prices are subject to revision at our sole discretion without prior notice.
          No price is confirmed until an application is accepted by us in writing.
        </p>
      </>
    ),
  },
  {
    id: "timelines",
    title: "Timelines and possession",
    content: (
      <p>
        Completion and possession dates referred to on this website are the promoter
        &rsquo;s current expectation and are indicative only. The binding date is the
        proposed date of completion declared to MahaRERA and recorded in the
        registered Agreement for Sale, subject to the extensions, force majeure
        events and remedies provided under the Real Estate (Regulation and
        Development) Act, 2016.
      </p>
    ),
  },
  {
    id: "location",
    title: "Location, connectivity and distances",
    content: (
      <p>
        Maps, location plans, connectivity charts and travel times are schematic,
        not to scale, and are compiled from publicly available sources. Distances and
        durations are approximate and vary with the route, mode of transport and
        traffic. References to proposed or under-construction infrastructure —
        metro lines, roads, flyovers, schools, hospitals or commercial developments —
        are based on publicly announced plans by third parties. We do not represent
        or warrant that any such infrastructure will be built, will be completed on
        any timeline, or will remain as announced.
      </p>
    ),
  },
  {
    id: "no-investment-advice",
    title: "No investment advice or assured returns",
    content: (
      <>
        <p>
          Nothing on this website constitutes financial, investment, tax or legal
          advice. Real estate values can fall as well as rise.
        </p>
        <p>
          <strong>
            Sokha Realty does not offer, promise or guarantee any rental income,
            buy-back, assured return, guaranteed appreciation or exit at a
            predetermined price.
          </strong>{" "}
          Any person representing otherwise is doing so without our authority. Please
          consult your own financial and legal advisers before committing to a
          purchase.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-party content and links",
    content: (
      <p>
        This website may host embedded maps, videos, social feeds and links to
        websites operated by others, including channel partners, banks and housing
        finance companies, and government portals. We do not control that content, do
        not verify it, and do not endorse it. Loan eligibility, interest rates and
        approval remain entirely at the discretion of the lender. Any dealing you
        have with a third party is solely between you and that party.
      </p>
    ),
  },
  {
    id: "accuracy",
    title: "Accuracy and updates",
    content: (
      <p>
        We take reasonable care to keep this website accurate and current, but make
        no representation or warranty, express or implied, as to its completeness,
        accuracy, reliability or fitness for any purpose. Content may contain
        typographical errors and may become out of date. We reserve the right to
        correct, alter, add to or withdraw any content, project or page at any time
        without notice and without liability.
      </p>
    ),
  },
  {
    id: "precedence",
    title: "What actually governs your purchase",
    content: (
      <>
        <p>
          Where there is any inconsistency between this website and the documents
          below, the documents prevail, in this order of precedence:
        </p>
        <ol>
          <li>The registered Agreement for Sale executed between the parties.</li>
          <li>
            The sanctioned plans, approvals and particulars filed with MahaRERA and
            available at{" "}
            <a
              href="https://maharera.maharashtra.gov.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              maharera.maharashtra.gov.in
            </a>
            .
          </li>
          <li>The written application form accepted by us.</li>
          <li>This website and all other marketing material.</li>
        </ol>
        <p>
          Please read our <Link href="/rera">RERA Disclosures</Link>,{" "}
          <Link href="/terms">Terms of Service</Link> and{" "}
          <Link href="/privacy">Privacy Policy</Link> together with this Disclaimer.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    content: (
      <p>
        To the fullest extent permitted by law, Sokha Realty and its directors,
        employees and agents disclaim all liability for any loss or damage arising
        from reliance on any content of this website. Nothing here excludes liability
        that cannot lawfully be excluded, including obligations owed to an allottee
        under the Real Estate (Regulation and Development) Act, 2016 and the
        registered Agreement for Sale. The limitation of liability set out in our{" "}
        <Link href="/terms">Terms of Service</Link> applies to this Disclaimer.
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <LegalLayout
      title="Disclaimer"
      intro="Marketing material is designed to help you picture a home. This page explains, plainly, what is an artistic impression, what is indicative, and which documents actually bind us."
      updated={UPDATED}
      sections={sections}
      preamble={
        <div className="legal-callout">
          <strong>The short version.</strong> All images are artistic impressions.
          All plans, areas, amenities, prices and timelines shown on this website are
          indicative and subject to change. Units are sold on carpet area. Nothing
          here is an offer, and we do not promise any assured return. Your purchase
          is governed by the registered Agreement for Sale and the particulars filed
          with MahaRERA.
        </div>
      }
    />
  );
}
