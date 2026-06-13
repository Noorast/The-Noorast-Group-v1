import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export function SEO({
  title = 'Noorast — Architectural Designer. Interiors & Landscape. London.',
  description = 'Noorast is a design consultancy offering architectural design, interior design, and landscape design. UK residential and international projects. Transparent fixed fees.',
  keywords = 'architectural designer London, interior design consultancy UK, landscape design residential, planning drawings UK, international home design from UK, overseas property design, home design abroad, extension drawings fixed fee, building regulations drawings',
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.noorast.co.uk" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="geo.region" content="GB-LND" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Noorast Group Limited",
        "description": "Design consultancy offering architectural design, interior design, and landscape design. UK and international.",
        "url": "https://www.noorast.co.uk",
        "address": { "@type": "PostalAddress", "addressLocality": "London", "addressCountry": "GB" },
        "areaServed": [
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "United Kingdom" }
        ],
        "knowsAbout": ["Architectural Design", "Interior Design", "Landscape Design", "Planning Applications", "Building Regulations", "International Residential Design"]
      })}</script>
    </Helmet>
  );
}
