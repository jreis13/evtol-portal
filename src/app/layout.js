import { UserProvider } from "@auth0/nextjs-auth0/client"
import Script from "next/script"
import "../common/styles/globals.css"

export const metadata = {
  title: "eVTOL Portal",
  description: "Tracking the latest developments in the eVTOL space",
  openGraph: {
    title: "eVTOL Portal",
    description: "Tracking the latest developments in the eVTOL space",
    url: "https://evtolportal.com",
    siteName: "eVTOL Portal",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "eVTOL Portal",
    description: "Tracking the latest developments in the eVTOL space",
    site: "@exp_vector",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://evtolportal.com",
              name: "eVTOL Portal",
              alternateName: "EvtolPortal.com",
            }),
          }}
        />
      </head>
      <body>
        <UserProvider>{children}</UserProvider>

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16826561323"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16826561323');
            `,
          }}
        />

        <Script
          id="iubenda-config"
          type="text/javascript"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var _iub = _iub || [];
              _iub.csConfiguration = {"siteId":4053596,"cookiePolicyId":46098265,"lang":"en","storage":{"useSiteId":true}};
            `,
          }}
        />
        <Script
          type="text/javascript"
          src="https://cs.iubenda.com/autoblocking/4053596.js"
          strategy="afterInteractive"
        />
        <Script
          type="text/javascript"
          src="//cdn.iubenda.com/cs/gpp/stub.js"
          strategy="afterInteractive"
        />
        <Script
          type="text/javascript"
          src="//cdn.iubenda.com/cs/iubenda_cs.js"
          charset="UTF-8"
          async
        />
      </body>
    </html>
  )
}
