import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/lib/lenis";
import PageTransition from "@/components/PageTransition";
import ScrollProgressLine from "@/components/ScrollProgressLine";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Scitisense Futurize — Enterprise IT Consulting & Managed Services",
    template: "%s | Scitisense Futurize",
  },
  description:
    "Scitisense Futurize delivers enterprise IT consulting, ServiceNow implementations, and managed services that accelerate digital transformation. Specialists in ITSM, ITOM, GRC, SecOps, and platform optimization.",
  keywords: [
    "IT consulting",
    "ServiceNow",
    "ITSM",
    "ITOM",
    "GRC",
    "SecOps",
    "enterprise IT",
    "digital transformation",
    "managed services",
    "IT service management",
  ],
  authors: [{ name: "Scitisense Futurize" }],
  creator: "Scitisense Futurize",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Scitisense Futurize — Enterprise IT Consulting",
    description:
      "Enterprise IT consulting, ServiceNow implementations, and managed services that accelerate digital transformation.",
    siteName: "Scitisense Futurize",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scitisense Futurize — Enterprise IT Consulting",
    description:
      "Enterprise IT consulting, ServiceNow implementations, and managed services.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0B0F",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        {/* Inline script ensures smooth scroll before any JS hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.style.scrollBehavior = 'smooth';`,
          }}
        />
        <SmoothScrollProvider>
          <CustomCursor />
          <ScrollProgressLine />
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
