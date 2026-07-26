"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import NavbarLight from "@/components/NavbarLight"

const services = [
  {
    id: 'computer-vision',
    icon: 'eye',
    color: '#00C9B1',
    title: 'Computer Vision Research',
    area: '01',
    overview: `Computer Vision is at the forefront of industrial AI transformation, enabling machines to interpret and understand visual data with human-level accuracy. Scitisense Futurize conducts applied research in image classification, object detection, semantic segmentation, and video analytics — developing deployable systems for real-world industrial, medical, and surveillance applications. Our research integrates state-of-the-art architectures including Vision Transformers and convolutional networks with domain-specific optimization for edge and cloud environments.`,
    industries: ['Healthcare','Manufacturing','Agriculture','Defense','Smart Cities','Retail','Automotive','Aerospace'],
    algorithms: {
      'Classification': ['CNN','EfficientNet','ConvNeXt','ViT','ResNet','DenseNet'],
      'Detection': ['YOLOv8','Faster R-CNN','SSD','RetinaNet','DETR'],
      'Segmentation': ['U-Net','Mask R-CNN','DeepLabV3+','SegFormer','SAM'],
      'Tracking': ['DeepSORT','ByteTrack','SORT','StrongSORT'],
      'Libraries': ['OpenCV','Detectron2','MMDetection','Albumentations'],
    },
    projects: [
      'Smart Attendance System using Face Recognition',
      'AI-Based Medical Image Diagnosis (Chest X-Ray)',
      'Intelligent Traffic Monitoring & Vehicle Counting',
      'Defect Detection in Manufacturing Lines',
      'Crop Disease Detection from Drone Imagery',
      'PPE Compliance Detection in Industrial Sites',
      'Fire and Smoke Detection System',
      'Drone-Based Perimeter Surveillance',
      'Industrial Quality Inspection (PCB/Surface)',
      'Retail Shelf Monitoring & Planogram Compliance',
    ],
    deliverables: ['End-to-End Research','Prototype Development','AI Model Development','Edge Deployment','Cloud Deployment','Performance Benchmarking','Technical Documentation','Publication Support'],
    tools: ['Python','PyTorch','TensorFlow','OpenCV','CUDA','NVIDIA','Docker','AWS'],
  },
  {
    id: 'iot-wearable',
    icon: 'cpu',
    color: '#3B82F6',
    area: '02',
    title: 'IoT & Wearable Sensor Research',
    overview: `The Internet of Things and wearable sensor technologies are reshaping how we collect, transmit, and act upon real-world data. Our research focuses on designing intelligent sensing architectures that bridge physical environments with AI-driven analytics — from sub-milliwatt TinyML models on microcontrollers to LoRaWAN-based wide-area sensor networks. Scitisense Futurize specializes in sensor fusion, embedded AI, and wireless protocol optimization for healthcare wearables, agricultural monitoring, industrial automation, and smart city infrastructure.`,
    industries: ['Healthcare','Agriculture','Manufacturing','Smart Cities','Energy','Logistics','Defense','Pharmaceutical'],
    algorithms: {
      'Hardware': ['ESP32','Arduino','Raspberry Pi','STM32','Nordic nRF52'],
      'Protocols': ['MQTT','LoRaWAN','ZigBee','BLE','CoAP','Modbus'],
      'Edge AI': ['TinyML','TensorFlow Lite','Edge Impulse','ONNX Runtime'],
      'Techniques': ['Sensor Fusion','Kalman Filter','FFT Analysis','Anomaly Detection'],
      'Platforms': ['AWS IoT','Azure IoT Hub','Google Cloud IoT','Node-RED'],
    },
    projects: [
      'Smart Wearable ECG & SpO2 Monitoring System',
      'Precision Agriculture Soil & Weather Monitoring',
      'Environmental Air Quality Monitoring Network',
      'Industrial Predictive Maintenance via Vibration Sensing',
      'Smart Home Automation with Voice & Gesture Control',
      'Real-Time Water Quality Monitoring for Aquaculture',
      'Smart Parking Management with Ultrasonic Sensors',
      'Smart Energy Meter with Tamper Detection',
      'Cold Chain Asset Tracking System',
      'Wearable Fall Detection for Elderly Care',
    ],
    deliverables: ['Hardware Prototype','Firmware Development','AI Model Development','Edge Deployment','Cloud Dashboard','Technical Documentation','Technology Transfer','Patent Support'],
    tools: ['Python','C/C++','TensorFlow Lite','MQTT','Docker','AWS IoT','Node-RED','Linux'],
  },
  {
    id: 'ml-dl',
    icon: 'brain',
    color: '#8B5CF6',
    area: '03',
    title: 'Machine Learning & Deep Learning',
    overview: `Machine Learning and Deep Learning form the computational backbone of modern AI systems. Scitisense Futurize conducts research spanning classical statistical learning, ensemble methods, and deep neural architectures — applied to tabular, time-series, image, and graph-structured data across high-stakes industrial domains. Our work encompasses predictive maintenance, financial risk modeling, healthcare diagnostics, and demand forecasting with emphasis on model interpretability, robustness, and production-grade deployment.`,
    industries: ['Banking & Finance','Healthcare','Manufacturing','Retail','Energy','Supply Chain','Pharmaceutical','Telecommunications'],
    algorithms: {
      'Classical ML': ['Random Forest','XGBoost','LightGBM','CatBoost','SVM','KNN'],
      'Deep Learning': ['CNN','RNN','LSTM','GRU','Autoencoders','GANs','Transformers'],
      'Graph ML': ['GCN','GAT','GraphSAGE','GNN'],
      'Optimization': ['Adam','AdamW','SGD','RMSProp','LBFGS'],
      'Frameworks': ['PyTorch','TensorFlow','Scikit-learn','XGBoost','Optuna'],
    },
    projects: [
      'Customer Churn Prediction for Telecom (92% AUC)',
      'Real-Time Credit Card Fraud Detection System',
      'Credit Risk Analysis & Scoring Model',
      'Industrial Equipment Failure Prediction (LSTM)',
      'Retail Demand Forecasting with Temporal Fusion',
      'AI-Driven Product Recommendation Engine',
      'Multi-Disease Prediction from Clinical Data',
      'Time-Series Anomaly Detection for Energy',
      'Stock Market Trend Classification',
      'Supply Chain Disruption Risk Scoring',
    ],
    deliverables: ['Research Report','Model Development','Algorithm Optimization','Cloud Deployment','Performance Benchmarking','Explainability Analysis','Technical Documentation','Publication Support'],
    tools: ['Python','PyTorch','TensorFlow','Scikit-learn','MLflow','Docker','Kubernetes','AWS'],
  },
  {
    id: 'nlp-llm',
    icon: 'message',
    color: '#F59E0B',
    area: '04',
    title: 'NLP & LLM Research',
    overview: `Natural Language Processing and Large Language Models have fundamentally transformed how organizations interact with unstructured text data. Scitisense Futurize specializes in building enterprise-grade language intelligence systems — from fine-tuned domain-specific models to retrieval-augmented generation pipelines that ground LLM outputs in verified knowledge bases. Our research spans information extraction, semantic search, conversational AI, and multi-lingual processing for healthcare, legal, financial, and government document workflows.`,
    industries: ['Healthcare','Legal','Banking & Finance','Education','Government','Retail','Human Resources','Pharmaceutical'],
    algorithms: {
      'Encoder Models': ['BERT','RoBERTa','DistilBERT','ALBERT','DeBERTa'],
      'LLMs': ['GPT-4','Llama 3','Mistral','Falcon','Gemma','Phi-3'],
      'Frameworks': ['LangChain','LlamaIndex','Hugging Face','Haystack'],
      'RAG Stack': ['FAISS','ChromaDB','Qdrant','Pinecone','Weaviate'],
      'Techniques': ['RAG','Sentence Transformers','Fine-tuning','Prompt Engineering','RLHF'],
    },
    projects: [
      'Hospital Knowledge Base Chatbot with RAG',
      'Legal Document Clause Extraction & Analysis',
      'AI-Powered Resume Screening & Ranking System',
      'Clinical Trial Document Question Answering',
      'Multi-Document Summarization for Research Reports',
      'Sentiment & Opinion Analysis for Banking Reviews',
      'AI Email Drafting & Response Assistant',
      'Enterprise Knowledge Base Search Engine',
      'Multilingual Document Translation Pipeline',
      'Voice-Enabled Conversational AI Assistant',
    ],
    deliverables: ['LLM Pipeline Development','RAG System Architecture','Fine-tuning & RLHF','Vector Database Setup','API Development','Cloud Deployment','Technical Documentation','Publication Support'],
    tools: ['Python','LangChain','Hugging Face','OpenAI','FAISS','Qdrant','Docker','AWS'],
  },
  {
    id: 'generative-ai',
    icon: 'sparkles',
    color: '#EC4899',
    area: '05',
    title: 'Generative AI Research',
    overview: `Generative AI represents one of the most transformative technology paradigms of the decade — enabling machines to create, synthesize, and augment content across text, image, audio, video, and 3D modalities. Scitisense Futurize conducts research in diffusion models, generative adversarial networks, variational autoencoders, and large generative language models — with applications spanning synthetic data generation for privacy-preserving ML, AI-assisted content creation, and creative automation platforms.`,
    industries: ['Healthcare','Media & Entertainment','Education','Marketing','Pharmaceutical','Retail','Manufacturing','Defense'],
    algorithms: {
      'Image Gen': ['Stable Diffusion XL','DALL-E 3','Midjourney API','Flux'],
      'Architectures': ['Diffusion Models','GANs','VAE','Flow Matching','Score Matching'],
      'Fine-tuning': ['LoRA','DreamBooth','Textual Inversion','ControlNet','IP-Adapter'],
      'Text Gen': ['GPT-4','Llama 3','Mistral','Claude'],
      'Techniques': ['Prompt Engineering','RAG','Chain-of-Thought','RLHF','DPO'],
    },
    projects: [
      'AI Content Generator for Marketing Campaigns',
      'Synthetic Medical Image Dataset Generation',
      'AI Product Image Generation for E-Commerce',
      'AI Code Assistant with Context-Aware Completion',
      'Research Paper Literature Synthesis Assistant',
      'AI-Powered Online Course Content Creator',
      'Automated Product Description Generator',
      'Synthetic Tabular Data for Financial Modeling',
      'AI-Driven Explainer Video Creation Pipeline',
      'Automated Presentation & Report Generator',
    ],
    deliverables: ['Generative Pipeline Development','Fine-tuned Model Delivery','Synthetic Data Generation','API Integration','Cloud Deployment','Performance Benchmarking','Technical Documentation','Patent Support'],
    tools: ['Python','PyTorch','Hugging Face','Stable Diffusion','OpenAI','ComfyUI','Docker','AWS'],
  },
  {
    id: 'agentic-ai',
    icon: 'bot',
    color: '#10B981',
    area: '06',
    title: 'Agentic AI Research',
    overview: `Agentic AI represents the next frontier of artificial intelligence — systems that autonomously plan, reason, use tools, and execute multi-step tasks with minimal human intervention. Scitisense Futurize is at the forefront of multi-agent system design, building orchestrated AI workflows that integrate LLMs with external tools, APIs, databases, and real-world sensors. Our research spans ReAct reasoning patterns, reflection loops, memory architectures, and planning algorithms.`,
    industries: ['Banking & Finance','Healthcare','Manufacturing','Human Resources','Legal','Government','Supply Chain','Research Labs'],
    algorithms: {
      'Frameworks': ['LangGraph','CrewAI','AutoGen','OpenAI Agents SDK','Phidata'],
      'Protocols': ['MCP (Model Context Protocol)','Tool Calling','Function Calling'],
      'Architectures': ['ReAct','Reflection','Plan-and-Execute','LATS','Tree of Thought'],
      'Memory': ['Vector Memory','Episodic Memory','Semantic Memory','Working Memory'],
      'Techniques': ['Multi-Agent Orchestration','AI Workflow Automation','Autonomous Decision Making'],
    },
    projects: [
      'Autonomous Research Literature Review & Synthesis Agent',
      'Multi-Agent Business Process Automation Platform',
      'AI Software Development Agent (Code Review & Generation)',
      'Autonomous Customer Support Resolution Agent',
      'Self-Directed Data Analysis & Reporting Agent',
      'Intelligent Procurement & Vendor Selection Agent',
      'AI Healthcare Triage & Patient Routing Assistant',
      'Autonomous HR Screening & Onboarding Agent',
      'AI Financial Planning & Portfolio Analysis Agent',
      'Smart Enterprise Workflow Orchestration System',
    ],
    deliverables: ['Multi-Agent System Design','Agent Workflow Development','MCP Integration','Tool & API Integration','Cloud Deployment','Performance Benchmarking','Technical Documentation','Publication Support'],
    tools: ['Python','LangGraph','CrewAI','OpenAI','LangChain','Docker','Kubernetes','AWS'],
  },
]

function ServiceIcon({ name, size = 22, color }: {
  name: string; size?: number; color: string
}) {
  const icons: Record<string, React.ReactNode> = {
    eye: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    cpu: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
    brain: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>,
    message: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    sparkles: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
    bot: <svg width={size} height={size} fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>,
  }
  return <>{icons[name] || icons.eye}</>
}

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('animate')
      }),
      { threshold: 0.05 }
    )
    sectionRef.current?.querySelectorAll('.animate-on-scroll')
      .forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      sectionRef.current?.querySelectorAll('.spotlight-card')
        .forEach(card => {
          const rect = (card as HTMLElement).getBoundingClientRect()
          ;(card as HTMLElement).style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
          ;(card as HTMLElement).style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
        })
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div style={{
      background: '#FAFAFA',
      minHeight: '100vh',
      fontFamily: "var(--font-plus-jakarta-sans), -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <NavbarLight />

      {/* HERO */}
      <section style={{
        paddingTop: 140, paddingBottom: 80,
        paddingInline: 40,
        textAlign: 'center',
        position: 'relative',
        background: 'linear-gradient(180deg, #F5F5F7 0%, #FAFAFA 60%, #FFFFFF 100%)',
      }}>
        {/* Grid bg */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(0,113,227,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,113,227,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="tag-pill-light" style={{ marginBottom: 20, display: 'inline-flex' }}>
            Our Services
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            marginBottom: 20,
          }}>
            <span style={{ display: 'block', color: '#6E6E73' }}>AI Research &</span>
            <span className="text-gradient-teal" style={{ display: 'block' }}>
              Technology Services
            </span>
          </h1>
          <p style={{
            color: '#6E6E73', fontSize: '1.05rem',
            maxWidth: 600, margin: '0 auto 40px',
            lineHeight: 1.7,
          }}>
            From foundational AI research to production deployments — serving industries,
            academia, healthcare, defense, and government organizations.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary-light" style={{ padding: '12px 28px', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Start Your Project <ArrowRight size={14} />
            </Link>
            <a href="#services-grid" style={{
              padding: '12px 28px', fontSize: 14,
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: 980, color: '#1D1D1F',
              textDecoration: 'none', fontWeight: 600,
              transition: 'all 0.2s ease',
            }}>
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <div style={{
        borderTop: '1px solid rgba(0,0,0,0.06)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
        background: '#FFFFFF',
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '0 40px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { value: '18+', label: 'Projects Delivered' },
            { value: '5+', label: 'Industry Clients' },
            { value: '4+', label: 'Workshops Conducted' },
            { value: '6', label: 'Research Domains' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              textAlign: 'center',
              padding: '28px 24px',
              borderRight: i < 3 ? '1px solid rgba(0,0,0,0.06)' : 'none',
            }}>
              <div className="number-accent" style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                fontWeight: 800, color: '#0071E3',
                letterSpacing: '-0.04em', lineHeight: 1,
              }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: '#6E6E73', marginTop: 4, fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACCORDION CARDS */}
      <section id="services-grid" ref={sectionRef} style={{
        padding: '80px 40px',
        maxWidth: 1280, margin: '0 auto',
      }}>
        {/* Section header */}
        <div className="animate-on-scroll [animation:animation-in_0.8s_ease_both]"
          style={{ marginBottom: 56, textAlign: 'center' }}>
          <span className="tag-pill-light" style={{ marginBottom: 16, display: 'inline-flex' }}>
            Research Services
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, color: '#1D1D1F',
            letterSpacing: '-0.03em', marginBottom: 16,
          }}>
            Six Research{' '}
            <span className="text-gradient-teal">Domains</span>
          </h2>
          <p style={{ color: '#6E6E73', fontSize: '1.05rem', maxWidth: 600, margin: '0 auto' }}>
            Each research area is staffed by domain experts delivering end-to-end solutions
            from algorithm design to production deployment.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {services.map((svc, i) => {
            const isOpen = expanded === svc.id
            return (
              <div
                key={svc.id}
                className={`animate-on-scroll spotlight-card service-card-light`}
                style={{
                  animationDelay: `${i * 0.08}s`,
                  gridColumn: isOpen ? '1 / -1' : 'auto',
                  display: 'flex', flexDirection: 'column',
                  transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
                }}
              >
                {/* Card Header */}
                <div style={{ padding: 28 }}>
                  <div style={{
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-between', marginBottom: 20,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 14,
                        background: `${svc.color}18`,
                        border: `1px solid ${svc.color}30`,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', flexShrink: 0,
                      }}>
                        <ServiceIcon name={svc.icon} size={22} color={svc.color} />
                      </div>
                      <div>
                        <div style={{
                          fontSize: 10, fontWeight: 700,
                          letterSpacing: '0.12em', textTransform: 'uppercase',
                          color: '#86868B', marginBottom: 3,
                        }}>
                          Research Area {svc.area}
                        </div>
                        <h3 style={{
                          fontSize: '1.1rem', fontWeight: 700,
                          color: '#1D1D1F', margin: 0,
                        }}>{svc.title}</h3>
                      </div>
                    </div>
                    <button
                      onClick={() => setExpanded(isOpen ? null : svc.id)}
                      style={{
                        width: 36, height: 36, borderRadius: '50%',
                        border: '1px solid #D2D2D7',
                        background: 'transparent',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', cursor: 'pointer',
                        color: '#6E6E73', flexShrink: 0, marginLeft: 8,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => {
                        ;(e.currentTarget as HTMLElement).style.borderColor = '#0071E3'
                        ;(e.currentTarget as HTMLElement).style.color = '#0071E3'
                      }}
                      onMouseLeave={e => {
                        ;(e.currentTarget as HTMLElement).style.borderColor = '#D2D2D7'
                        ;(e.currentTarget as HTMLElement).style.color = '#6E6E73'
                      }}
                    >
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>

                  {/* Overview */}
                  <p style={{
                    fontSize: 14, color: '#6E6E73',
                    lineHeight: 1.65, marginBottom: 20,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: isOpen ? 'unset' : 3,
                    WebkitBoxOrient: 'vertical',
                  } as React.CSSProperties}>
                    {svc.overview}
                  </p>

                  {/* Industries */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {(isOpen ? svc.industries : svc.industries.slice(0, 4)).map(ind => (
                      <span key={ind} className="tag-pill-light" style={{ fontSize: 10 }}>
                        {ind}
                      </span>
                    ))}
                    {!isOpen && svc.industries.length > 4 && (
                      <span className="tag-pill-light" style={{ fontSize: 10 }}>
                        +{svc.industries.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* EXPANDED CONTENT */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid #D2D2D7' }}>
                    <div style={{
                      padding: 28,
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 32,
                    }}>
                      {/* Col 1: Algorithms */}
                      <div>
                        <h4 style={{
                          fontSize: 14, fontWeight: 700,
                          color: '#1D1D1F', marginBottom: 20,
                          display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                          <span style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: '#0071E3', flexShrink: 0,
                            display: 'inline-block',
                          }} />
                          Algorithms & Technologies
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                          {Object.entries(svc.algorithms).map(([cat, items]) => (
                            <div key={cat}>
                              <div style={{
                                fontSize: 10, fontWeight: 700,
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                                color: '#86868B', marginBottom: 8,
                              }}>{cat}</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                                {(items as string[]).map(item => (
                                  <span key={item} className="algo-chip">{item}</span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Col 2: Projects */}
                      <div>
                        <h4 style={{
                          fontSize: 14, fontWeight: 700,
                          color: '#1D1D1F', marginBottom: 20,
                          display: 'flex', alignItems: 'center', gap: 8,
                        }}>
                          <span style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: svc.color, flexShrink: 0,
                            display: 'inline-block',
                          }} />
                          Representative Projects
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {svc.projects.map((proj, pi) => (
                            <li key={pi} style={{
                              display: 'flex', alignItems: 'flex-start',
                              gap: 10, marginBottom: 10,
                            }}>
                              <span style={{
                                fontSize: 10, fontWeight: 700,
                                color: '#86868B', minWidth: 20, paddingTop: 2,
                              }}>
                                {String(pi + 1).padStart(2, '0')}
                              </span>
                              <span style={{
                                fontSize: 13, color: '#6E6E73',
                                lineHeight: 1.5,
                              }}>{proj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Col 3: Deliverables + Tools */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div>
                          <h4 style={{
                            fontSize: 14, fontWeight: 700,
                            color: '#1D1D1F', marginBottom: 16,
                            display: 'flex', alignItems: 'center', gap: 8,
                          }}>
                            <span style={{
                              width: 8, height: 8, borderRadius: '50%',
                              background: '#06C', flexShrink: 0,
                              display: 'inline-block',
                            }} />
                            Research Deliverables
                          </h4>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {svc.deliverables.map(del => (
                              <div key={del} style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                              }}>
                                <CheckCircle size={14} style={{ color: '#0071E3', flexShrink: 0 }} />
                                <span style={{ fontSize: 13, color: '#6E6E73' }}>{del}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 style={{
                            fontSize: 14, fontWeight: 700,
                            color: '#1D1D1F', marginBottom: 12,
                            display: 'flex', alignItems: 'center', gap: 8,
                          }}>
                            <span style={{
                              width: 8, height: 8, borderRadius: '50%',
                              background: '#06C', flexShrink: 0,
                              display: 'inline-block',
                            }} />
                            Tools & Platforms
                          </h4>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                            {svc.tools.map(tool => (
                              <span key={tool} style={{
                                padding: '4px 10px',
                                background: '#F5F5F7',
                                border: '1px solid #D2D2D7',
                                borderRadius: 6,
                                fontSize: 12, fontWeight: 500,
                                color: '#6E6E73',
                              }}>{tool}</span>
                            ))}
                          </div>
                        </div>

                        <Link
                          href="/contact"
                          style={{
                            padding: '10px 20px',
                            background: `linear-gradient(135deg, ${svc.color}, ${svc.color}BB)`,
                            color: '#FFFFFF',
                            borderRadius: 980,
                            fontSize: 13, fontWeight: 700,
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center', gap: 6,
                            alignSelf: 'flex-start',
                            marginTop: 8,
                          }}
                        >
                          Start This Research
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {/* Collapsed footer */}
                {!isOpen && (
                  <div style={{ padding: '0 28px 24px', marginTop: 'auto' }}>
                    <button
                      onClick={() => setExpanded(svc.id)}
                      style={{
                        fontSize: 13, fontWeight: 600,
                        color: svc.color, background: 'none',
                        border: 'none', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: 0,
                      }}
                    >
                      View Full Details
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{
        paddingBlock: 100, paddingInline: 40,
        textAlign: 'center',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        background: '#FFFFFF',
      }}>
        <span className="tag-pill-light" style={{ marginBottom: 20, display: 'inline-flex' }}>
          Ready to Collaborate?
        </span>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 800, color: '#1D1D1F',
          letterSpacing: '-0.03em', marginBottom: 16,
        }}>
          Transform Your Vision into{' '}
          <span className="text-gradient-teal">Intelligent Reality</span>
        </h2>
        <p style={{
          color: '#6E6E73', fontSize: '1.05rem',
          maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7,
        }}>
          Whether you need AI research, product development, training, or consulting —
          Scitisense Futurize delivers. Let&apos;s discuss your requirements.
        </p>
        <div style={{
          display: 'flex', gap: 12,
          justifyContent: 'center', flexWrap: 'wrap',
          marginBottom: 32,
        }}>
          <Link href="/contact" className="btn-primary-light" style={{
            padding: '12px 28px', fontSize: 14,
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            Request Consultation <ArrowRight size={14} />
          </Link>
          <Link href="/contact" style={{
            padding: '12px 28px', fontSize: 14,
            border: '1px solid rgba(0,0,0,0.15)',
            borderRadius: 980, color: '#1D1D1F',
            textDecoration: 'none', fontWeight: 600,
          }}>
            Send Project Brief
          </Link>
        </div>
        <div style={{
          display: 'flex', gap: 32,
          justifyContent: 'center', flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 13, color: '#86868B' }}>
            info@scitisensefuturize.in
          </span>
          <span style={{ fontSize: 13, color: '#86868B' }}>
            +91 8500631655
          </span>
        </div>
      </section>
    </div>
  )
}
