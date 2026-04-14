import { Shield, Cpu, Eye, ExternalLink, Zap } from "lucide-react";
import MatrixRain from "../components/MatrixRain";

const About = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      color: "#00ff41",
      fontFamily: "'Courier New', monospace",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "120px 20px 60px",
      position: "relative",
    }}>
      <MatrixRain />

      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: "620px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "16px",
            padding: "6px 18px",
            border: "1px solid rgba(0,255,65,0.3)",
            borderRadius: "4px",
            background: "rgba(0,255,65,0.05)",
          }}>
            <Zap size={12} color="#00ff41" />
            <span style={{ fontSize: "0.7rem", color: "#00ff41", letterSpacing: "0.15em" }}>
              SYSTEM INFO · ABOUT DEEPGUARD
            </span>
          </div>
          <h1 style={{
            fontSize: "2.5rem",
            margin: "0 0 12px",
            fontWeight: "700",
            letterSpacing: "0.1em",
            color: "#00ff41",
            textShadow: "0 0 20px rgba(0,255,65,0.5)",
          }}>
            ABOUT
          </h1>
          <p style={{ color: "#00aa28", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
            THE MISSION · THE TECH · THE BUILDER
          </p>
        </div>

        {/* Mission */}
        <div style={{
          background: "rgba(0,255,65,0.02)",
          border: "1px solid rgba(0,255,65,0.15)",
          borderRadius: "4px",
          padding: "36px",
          marginBottom: "16px",
        }}>
          <p style={{ color: "#00ff41", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "16px" }}>
            THE MISSION
          </p>
          <p style={{ color: "#00aa28", fontSize: "0.85rem", lineHeight: "1.8", letterSpacing: "0.03em", margin: 0 }}>
            Deepfakes are becoming one of the most dangerous tools of misinformation in the digital age.
            Politicians, celebrities, and ordinary people are being impersonated by AI-generated faces
            indistinguishable to the human eye. DeepGuard was built to fight back — an AI system that
            detects manipulated faces with 99.85% accuracy and explains exactly why it made that decision.
            Not a black box. A transparent, explainable detector. 🔍
          </p>
        </div>

        {/* Tech Stack */}
        <div style={{
          background: "rgba(0,255,65,0.02)",
          border: "1px solid rgba(0,255,65,0.15)",
          borderRadius: "4px",
          padding: "36px",
          marginBottom: "16px",
        }}>
          <p style={{ color: "#00ff41", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "24px" }}>
            TECH STACK
          </p>

          {[
            { label: "MODEL", value: "EfficientNet-B4", desc: "Google's compound-scaled CNN — state of the art image classification" },
            { label: "FRAMEWORK", value: "PyTorch", desc: "Deep learning framework for model training and inference" },
            { label: "EXPLAINABILITY", value: "Grad-CAM", desc: "Gradient-weighted Class Activation Mapping for visual explanations" },
            { label: "DATASET", value: "140k Real vs Fake Faces", desc: "70k real faces from Flickr + 70k StyleGAN generated faces" },
            { label: "TRAINING", value: "Google Colab T4 GPU", desc: "NVIDIA Tesla T4 — 16GB VRAM, trained for 6 epochs" },
            { label: "BACKEND", value: "FastAPI + Uvicorn", desc: "High performance Python API framework for model serving" },
            { label: "FRONTEND", value: "React.js", desc: "Component based UI with matrix rain animation" },
            { label: "ACCURACY", value: "99.85% Val Accuracy", desc: "Evaluated on 20,000 unseen validation images" },
          ].map(({ label, value, desc }) => (
            <div key={label} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "12px 0",
              borderBottom: "1px solid rgba(0,255,65,0.06)",
              gap: "16px",
            }}>
              <div style={{ minWidth: "120px" }}>
                <p style={{ color: "#004d14", fontSize: "0.65rem", letterSpacing: "0.15em", margin: "0 0 4px" }}>
                  {label}
                </p>
                <p style={{ color: "#00ff41", fontSize: "0.8rem", fontWeight: "700", margin: 0, letterSpacing: "0.05em" }}>
                  {value}
                </p>
              </div>
              <p style={{ color: "#00aa28", fontSize: "0.75rem", lineHeight: "1.6", margin: 0, textAlign: "right" }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Builder */}
        <div style={{
          background: "rgba(0,255,65,0.02)",
          border: "1px solid rgba(0,255,65,0.15)",
          borderRadius: "4px",
          padding: "36px",
          marginBottom: "16px",
        }}>
          <p style={{ color: "#00ff41", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "20px" }}>
            THE BUILDER
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <div style={{
              width: "52px",
              height: "52px",
              borderRadius: "4px",
              background: "rgba(0,255,65,0.08)",
              border: "1px solid rgba(0,255,65,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              fontWeight: "700",
              color: "#00ff41",
            }}>
              MJ
            </div>
            <div>
              <p style={{ color: "#00ff41", fontSize: "0.9rem", fontWeight: "700", margin: "0 0 4px", letterSpacing: "0.05em" }}>
                MANAS JADHAV
              </p>
              <p style={{ color: "#004d14", fontSize: "0.72rem", margin: 0, letterSpacing: "0.08em" }}>
                
              </p>
            </div>
          </div>

          <p style={{ color: "#00aa28", fontSize: "0.8rem", lineHeight: "1.8", letterSpacing: "0.03em", marginBottom: "20px" }}>
            Vibe Coder
          </p>

          <a
            href="https://github.com/Manasjadhav16/deepfake-detector"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#00ff41",
              textDecoration: "none",
              border: "1px solid rgba(0,255,65,0.3)",
              padding: "8px 16px",
              borderRadius: "4px",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              background: "rgba(0,255,65,0.05)",
              transition: "all 0.2s ease",
            }}
          >
          <ExternalLink size={14} />
            VIEW SOURCE CODE
          </a>
        </div>

        <p style={{ textAlign: "center", color: "#002d0a", fontSize: "0.7rem", marginTop: "16px", letterSpacing: "0.1em" }}>
          BUILT BY MANAS JADHAV · EFFICIENTNET-B4 · PYTORCH · {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default About;