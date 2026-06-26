import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  /** Optional canonical path, e.g. "/work". Defaults to site root. */
  path?: string;
}

const SITE = 'https://www.noorast.co.uk';
const OG_IMAGE = `${SITE}/og-image.png`;

export function SEO({
  title = 'Noorast, a London design studio',
  description = 'Noorast is a London design studio working across architecture, interiors, and landscape. Residential work, in the UK and internationally.',
  path = '/',
}: SEOProps) {
  const url = SITE + (path === '/' ? '' : path);
  // Title pattern: page-specific titles already carry the studio name where needed.
  const fullTitle = title.includes('Noorast') ? title : `${title} · Noorast`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content="Noorast" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <meta name="geo.region" content="GB-LND" />

      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Noorast Group Limited",
        "alternateName": "Noorast",
        "description": "A London design studio working across architecture, interiors, and landscape. Residential, UK and international.",
        "url": SITE,
        "image": OG_IMAGE,
        "email": "design@noorast.co.uk",
        "founder": { "@type": "Person", "name": "Aun Naeem" },
        "address": { "@type": "PostalAddress", "addressLocality": "London", "addressCountry": "GB" },
        "areaServed": [
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Place", "name": "International" }
        ],
        "knowsAbout": ["Architectural Design", "Interior Design", "Landscape Design", "Residential Design"]
      })}</script>
    </Helmet>
  );
}
