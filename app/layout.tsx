import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import NavbarLight from "@/components/NavbarLight";
import SmoothScrollProvider from "@/lib/lenis";
import PageTransition from "@/components/PageTransition";

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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Scitisense Futurize — AI Research & Technology",
    template: "%s | Scitisense Futurize",
  },
  description:
    "DPIIT-recognized AI Research & Product Development company delivering Computer Vision, IoT, NLP, Generative AI, and Agentic AI solutions.",
  keywords: [
    "Scientific R&D",
    "Medical IT",
    "healthcare technology",
    "AI research",
    "DPIIT recognized",
    "Startup India",
    "ITSM",
    "ITOM",
    "GRC",
    "SecOps",
    "enterprise IT",
    "digital transformation",
  ],
  authors: [{ name: "Scitisense Futurize" }],
  creator: "Scitisense Futurize",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Scitisense Futurize — AI Research & Technology",
    description:
      "DPIIT-recognized AI Research & Product Development company delivering Computer Vision, IoT, NLP, Generative AI, and Agentic AI solutions.",
    siteName: "Scitisense Futurize",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scitisense Futurize — AI Research & Technology",
    description:
      "DPIIT-recognized AI Research & Product Development company delivering Computer Vision, IoT, NLP, Generative AI, and Agentic AI solutions.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAFA",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${dmSans.variable} ${plusJakartaSans.variable}`}
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
          <NavbarLight />
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
