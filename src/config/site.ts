interface SiteConfig {
  url: string;
  name: string;
  alternateName: string;
  locale: string;
  localeAlternates: string[];
  email: string;
  telephone?: string;
  priceRange?: string;
  foundingDate?: string;
  author: string;
  publisherUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  githubUrl: string;
  address: {
    addressCountry: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    streetAddress?: string;
  };
}

export const SITE: SiteConfig = {
  url: "https://arborandalgo.com",
  name: "Arbor & Algo",
  alternateName: "Arbor and Algo",
  locale: "en_IN",
  localeAlternates: ["en_US"],
  email: "hello@arborandalgo.com",
  author: "Arbor & Algo",
  publisherUrl: "https://arborandalgo.com",
  defaultTitle: "Arbor & Algo - Tech built to last and grow",
  defaultDescription:
    "Independent tech practice based in India. Websites, automation, integrations and advisory for businesses that want to build on strong foundations.",
  githubUrl: "https://github.com/arborandalgo",
  address: {
    addressCountry: "IN",
  },
};

export const OG_IMAGE = {
  path: "/og-image.png",
  alt: "Arbor & Algo - websites, automation, integrations, and advisory",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

export const DEFAULT_OG_IMAGE = OG_IMAGE.path;

interface JsonLdNode {
  [key: string]: unknown;
}

export function buildHomeJsonLd(
  siteUrl: URL,
  title: string,
  description: string,
  pathname = "/",
): { "@context": string; "@graph": JsonLdNode[] } {
  const baseUrl = siteUrl.origin;
  const pageUrl = new URL(pathname, siteUrl).toString();

  const businessNode: JsonLdNode = {
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#business`,
    name: SITE.name,
    alternateName: SITE.alternateName,
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}/og-image.png`,
    description,
    email: SITE.email,
    foundingLocation: {
      "@type": "Place",
      name: "India",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Mumbai",
        addressCountry: "IN",
      },
      {
        "@type": "Country",
        name: "India",
      },
    ],
    address: {
      "@type": "PostalAddress",
      ...SITE.address,
    },
    knowsAbout: [
      "Web development",
      "Business automation",
      "Software integrations",
      "Tech advisory",
      "Websites and web apps",
      "CRM integrations",
      "Razorpay",
      "Shiprocket",
      "Zoho",
      "WhatsApp Business API",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tech Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Websites & Web Apps",
            description:
              "Professional websites and full products built to perform and simple to manage. Includes booking systems, service portals, and dashboards.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Automation",
            description:
              "Systems that handle repetitive work - invoicing, inventory, lead tracking - running quietly in the background.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Integrations & Connections",
            description:
              "Connecting existing tools - payments, logistics, messaging, CRM - without a platform overhaul.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tech Advisory",
            description:
              "Audits, roadmaps, and vendor guidance to help businesses choose the right path before spending on the wrong one.",
          },
        },
      ],
    },
    sameAs: [SITE.githubUrl],
  };

  if (SITE.telephone) {
    businessNode.telephone = SITE.telephone;
  }
  if (SITE.priceRange) {
    businessNode.priceRange = SITE.priceRange;
  }
  if (SITE.foundingDate) {
    businessNode.foundingDate = SITE.foundingDate;
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      businessNode,
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: SITE.name,
        description:
          "Independent tech practice - websites, automation, integrations, and advisory.",
        publisher: {
          "@id": `${baseUrl}/#business`,
        },
        inLanguage: "en",
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: pageUrl,
        name: title,
        description,
        isPartOf: {
          "@id": `${baseUrl}/#website`,
        },
        about: {
          "@id": `${baseUrl}/#business`,
        },
        inLanguage: "en",
      },
    ],
  };
}
