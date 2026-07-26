import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Starfield from "@/components/Starfield";
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

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Scitisense Futurize Pvt Ltd — Scientific R&D & Medical IT",
    template: "%s | Scitisense Futurize",
  },
  description:
    "Scitisense Futurize Private Limited is a DPIIT-recognized leader in Scientific R&D and Medical Information Technology, delivering AI research, healthcare IT solutions, and technology consulting from Visakhapatnam, India.",
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
    title: "Scitisense Futurize Pvt Ltd — Scientific R&D & Medical IT",
    description:
      "DPIIT-recognized leader in Scientific R&D and Medical Information Technology, delivering AI research and healthcare IT solutions from Visakhapatnam, India.",
    siteName: "Scitisense Futurize",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scitisense Futurize Pvt Ltd — Scientific R&D & Medical IT",
    description:
      "DPIIT-recognized leader in Scientific R&D and Medical Information Technology.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1117",
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
          <CustomCursor />
          <Starfield />
          <ScrollProgressLine />
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
