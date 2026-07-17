import Navbar                   from "@/components/Navbar";
import Hero                     from "@/components/Hero";
import TrustBadges              from "@/components/TrustBadges";
import ProblemStatement         from "@/components/ProblemStatement";
import Services                 from "@/components/Services";
import ServiceLineSection       from "@/components/ServiceLineSection";
import Stats                    from "@/components/Stats";
import Logos                    from "@/components/Logos";
import HomepageStories          from "@/components/HomepageStories";
import CTABand                  from "@/components/CTABand";
import Footer                   from "@/components/Footer";
import ServiceTabNav             from "@/components/ServiceTabNav";
import FixedBackgroundLayers     from "@/components/FixedBackgroundLayers";
import AmbientColorController    from "@/components/AmbientColorController";
import LightBeam                 from "@/components/LightBeam";

export default function Home() {
  return (
    <>
      <FixedBackgroundLayers />
      <Navbar />
      <ServiceTabNav />

      {/* Ambient color temperature shifts — watches section IDs */}
      <AmbientColorController />

      <main>
        {/* ── Hero ── */}
        <Hero />

        {/* ── Trust & credential badges ── */}
        <TrustBadges />

        {/* ── Problem statement / pain points ── */}
        <ProblemStatement />

        {/* ── ServiceNow / ITSM platform services ── */}
        <Services />

        {/* Light beam at Services → GenAI boundary */}
        <LightBeam color="#00E5C0" position="right" intensity={0.3} />

        {/* ── Generative AI ── */}
        <ServiceLineSection
          id="generative-ai"
          label="GENERATIVE AI"
          heading="Generative AI"
          background="cream"
          description="We build production-grade generative AI systems — from foundation model fine-tuning to retrieval-augmented architectures — that turn unstructured data into reliable, deployable intelligence."
          items={[
            {
              icon: "MessageSquare",
              title: "NLP",
              description: "Text classification, entity extraction, and language understanding pipelines built for production scale.",
            },
            {
              icon: "Brain",
              title: "LLMs",
              description: "Fine-tuning and deploying large language models tailored to domain-specific use cases.",
            },
            {
              icon: "Cpu",
              title: "SLMs",
              description: "Lightweight small language models optimized for edge deployment and low-latency inference.",
            },
            {
              icon: "Search",
              title: "RAG",
              description: "Retrieval-augmented generation pipelines that ground LLM outputs in your proprietary data with high accuracy.",
            },
            {
              icon: "Bot",
              title: "Conversational Bots",
              description: "End-to-end chatbot and voice agent systems built on LLM orchestration frameworks.",
            },
            {
              icon: "Workflow",
              title: "Agent Orchestration",
              description: "Multi-agent systems that coordinate complex multi-step reasoning and tool use.",
            },
            {
              icon: "Database",
              title: "Vector Search",
              description: "Embedding pipelines and vector database architecture for semantic retrieval at scale.",
            },
            {
              icon: "ShieldCheck",
              title: "Eval & Guardrails",
              description: "Evaluation frameworks and safety guardrails ensuring reliable, auditable AI outputs.",
            },
          ]}
        />

        {/* Light beam at GenAI → Computer Vision boundary */}
        <LightBeam color="#00E5C0" position="left" intensity={0.25} />

        {/* ── Computer Vision ── */}
        <ServiceLineSection
          id="computer-vision"
          label="COMPUTER VISION"
          heading="Computer Vision"
          background="navy"
          description="From foundational deep learning architectures to deployed industry applications, we design vision systems that see, understand, and act — across healthcare, agriculture, finance, and beyond."
          items={[
            {
              icon: "Layers",
              title: "Machine Learning",
              description: "Classical ML pipelines for structured visual feature extraction and classification.",
            },
            {
              icon: "Network",
              title: "Deep Learning",
              description: "CNN and transformer-based architectures trained for high-accuracy visual recognition.",
            },
            {
              icon: "Repeat",
              title: "Reinforcement Learning",
              description: "RL-driven systems for adaptive visual decision-making in dynamic environments.",
            },
            {
              icon: "GitBranch",
              title: "Q-Learning",
              description: "Value-based reinforcement strategies applied to sequential visual decision tasks.",
            },
          ]}
          items2={[
            {
              icon: "HeartPulse",
              title: "Medical Imaging",
              description: "Diagnostic imaging analysis for radiology, pathology, and early disease detection.",
            },
            {
              icon: "Leaf",
              title: "AgriTech",
              description: "Crop health monitoring, yield prediction, and precision agriculture vision systems.",
            },
            {
              icon: "TrendingUp",
              title: "Finance",
              description: "Document analysis, fraud detection, and visual data extraction for financial workflows.",
            },
            {
              icon: "Smile",
              title: "Sentiment Analysis",
              description: "Facial and behavioral analysis for engagement and sentiment measurement.",
            },
          ]}
          items2Label="Industry Applications"
        />

        {/* Light beam at Computer Vision → Biomedical boundary */}
        <LightBeam color="#00E5C0" position="right" intensity={0.25} />

        {/* ── Biomedical Signal Processing ── */}
        <ServiceLineSection
          id="biomedical"
          label="BIOMEDICAL SIGNAL PROCESSING"
          heading="Biomedical Signal Processing"
          background="cream"
          description="We engineer intelligent hardware-software systems that capture, process, and act on biological and environmental signals — connecting the physical world to real-time decision-making."
          items={[
            {
              icon: "Wifi",
              title: "IoT Systems",
              description: "Connected device architectures for real-time data capture and remote monitoring.",
            },
            {
              icon: "Bot",
              title: "Robotics",
              description: "Autonomous and semi-autonomous robotic systems for healthcare and industrial applications.",
            },
            {
              icon: "Activity",
              title: "Wearable Sensors",
              description: "Signal acquisition and processing for continuous health and biometric monitoring.",
            },
            {
              icon: "Zap",
              title: "Smart Automation",
              description: "Intelligent automation pipelines that translate sensor data into actionable system responses.",
            },
          ]}
        />

        {/* Light beam at Biomedical → IT Services boundary */}
        <LightBeam color="#00E5C0" position="left" intensity={0.25} />

        {/* ── IT Infrastructure & Engineering ── */}
        <ServiceLineSection
          id="it-services"
          label="IT SERVICES"
          heading="IT Infrastructure & Engineering"
          background="navy"
          description="Beyond platform consulting, we deliver full-spectrum IT engineering — cloud architecture, DevOps, systems integration, and infrastructure modernization for businesses scaling their technology foundation."
          items={[
            {
              icon: "Cloud",
              title: "Cloud Architecture",
              description: "Scalable cloud infrastructure design across AWS, Azure, and GCP environments.",
            },
            {
              icon: "GitMerge",
              title: "DevOps & CI/CD",
              description: "Automated deployment pipelines and infrastructure-as-code for faster, safer releases.",
            },
            {
              icon: "Server",
              title: "Systems Integration",
              description: "Seamless integration across enterprise software, APIs, and third-party platforms.",
            },
            {
              icon: "Lock",
              title: "IT Security",
              description: "Infrastructure hardening, access control, and compliance-ready security architecture.",
            },
          ]}
        />

        {/* Light beam at IT Services → Stats boundary */}
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
