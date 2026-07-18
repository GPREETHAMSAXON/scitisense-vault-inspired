import Navbar                   from "@/components/Navbar";
import Hero                     from "@/components/Hero";
import TrustBadges              from "@/components/TrustBadges";
import ProblemStatement         from "@/components/ProblemStatement";
import Services                 from "@/components/Services";
import Stats                    from "@/components/Stats";
import Logos                    from "@/components/Logos";
import HomepageStories          from "@/components/HomepageStories";
import CTABand                  from "@/components/CTABand";
import Footer                   from "@/components/Footer";
import FixedBackgroundLayers     from "@/components/FixedBackgroundLayers";
import AmbientColorController    from "@/components/AmbientColorController";
import LightBeam                 from "@/components/LightBeam";
import AmbientLight               from "@/components/AmbientLight";

export default function Home() {
  return (
    <>
      <FixedBackgroundLayers />
      <AmbientLight />
      <Navbar />

      {/* Ambient color temperature shifts — watches section IDs */}
      <AmbientColorController />

      <main>
        {/* ── Hero ── */}
        <Hero />

        {/* ── Trust & credential badges ── */}
        <TrustBadges />

        {/* ── Problem statement / pain points ── */}
        <ProblemStatement />

        {/* ── AI research & innovation services ── */}
        <Services />

        {/* Light beam at Services → Stats boundary */}
        <LightBeam color="#00E5C0" position="center" intensity={0.35} />

        {/* ── Stats / Our Impact ── */}
        <Stats />

        {/* ── Client logos ── */}
        <Logos />

        {/* ── Homepage success stories ── */}
        <HomepageStories />

        {/* ── CTA band ── */}
        <CTABand />
      </main>

      <Footer />
    </>
  );
}
