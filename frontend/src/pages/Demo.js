import { useState } from "react";
import { Zap, ChevronDown, ChevronUp } from "lucide-react";
import MatrixRain from "../components/MatrixRain";

const samples = [
  {
    id: 1,
    label: "FAKE",
    confidence: 100,
    description: "AI-generated face from StyleGAN. Model detected unnatural texture patterns around the eye region and facial boundaries.",
    color: "#ff3232",
  },
  {
    id: 2,
    label: "REAL",
    confidence: 100,
    description: "Genuine human face from Flickr dataset. Model confirmed natural skin texture, lighting consistency, and authentic facial geometry.",
    color: "#00ff41",
  },
  {
    id: 3,
    label: "FAKE",
    confidence: 99.87,
    description: "Deepfake generated using FaceSwap technique. Subtle blending artifacts detected at facial boundaries with 99.87% confidence.",
    color: "#ff3232",
  },
];

const Demo = () => {
  const [expanded, setExpanded] = useState(null);

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
              SAMPLE RESULTS · DEMO MODULE
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
            DEMO
          </h1>
          <p style={{ color: "#00aa28", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
            SAMPLE DETECTION RESULTS FROM OUR TEST DATASET
          </p>
        </div>

        {/* Stats Row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "12px",
          marginBottom: "16px",
        }}>
          {[
            { label: "VAL ACCURACY", value: "99.85%" },
            { label: "DATASET SIZE", value: "140K" },
            { label: "EPOCHS", value: "6" },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: "rgba(0,255,65,0.02)",
              border: "1px solid rgba(0,255,65,0.15)",
              borderRadius: "4px",
              padding: "20px 16px",
              textAlign: "center",
            }}>
              <p style={{ color: "#004d14", fontSize: "0.6rem", letterSpacing: "0.15em", margin: "0 0 8px" }}>
                {label}
              </p>
              <p style={{ color: "#00ff41", fontSize: "1.4rem", fontWeight: "700", margin: 0, textShadow: "0 0 10px rgba(0,255,65,0.3)" }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Sample Results */}
        <div style={{
          background: "rgba(0,255,65,0.02)",
          border: "1px solid rgba(0,255,65,0.15)",
          borderRadius: "4px",
          padding: "36px",
          marginBottom: "16px",
        }}>
          <p style={{ color: "#00ff41", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "24px" }}>
            SAMPLE DETECTION LOGS
          </p>

          {samples.map((s) => (
            <div key={s.id} style={{
              border: `1px solid ${s.label === "FAKE" ? "rgba(255,50,50,0.2)" : "rgba(0,255,65,0.2)"}`,
              borderRadius: "4px",
              padding: "20px",
              marginBottom: "12px",
              background: s.label === "FAKE" ? "rgba(255,50,50,0.02)" : "rgba(0,255,65,0.02)",
              cursor: "pointer",
            }}
              onClick={() => setExpanded(expanded === s.id ? null : s.id)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{
                    color: s.color,
                    fontSize: "0.85rem",
                    fontWeight: "700",
                    letterSpacing: "0.15em",
                    textShadow: `0 0 10px ${s.color}66`,
                  }}>
                    {s.label}
                  </span>
                  <span style={{ color: "#004d14", fontSize: "0.7rem", letterSpacing: "0.08em" }}>
                    CONFIDENCE: <span style={{ color: s.color }}>{s.confidence}%</span>
                  </span>
                </div>
                {expanded === s.id
                  ? <ChevronUp size={14} color="#004d14" />
                  : <ChevronDown size={14} color="#004d14" />
                }
              </div>

              {expanded === s.id && (
                <p style={{
                  color: "#00aa28",
                  fontSize: "0.78rem",
                  lineHeight: "1.7",
                  margin: "12px 0 0",
                  letterSpacing: "0.03em",
                  borderTop: "1px solid rgba(0,255,65,0.08)",
                  paddingTop: "12px",
                  animation: "fadeIn 0.3s ease",
                }}>
                  {s.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Model Performance */}
        <div style={{
          background: "rgba(0,255,65,0.02)",
          border: "1px solid rgba(0,255,65,0.15)",
          borderRadius: "4px",
          padding: "36px",
          marginBottom: "16px",
        }}>
          <p style={{ color: "#00ff41", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "24px" }}>
            MODEL PERFORMANCE
          </p>

          {[
            { label: "EPOCH 1", acc: "98.67", width: "98.67" },
            { label: "EPOCH 2", acc: "99.74", width: "99.74" },
            { label: "EPOCH 3", acc: "99.81", width: "99.81" },
            { label: "EPOCH 4", acc: "99.83", width: "99.83" },
            { label: "EPOCH 5", acc: "99.85", width: "99.85" },
            { label: "EPOCH 6", acc: "99.85", width: "99.85" },
          ].map(({ label, acc, width }) => (
            <div key={label} style={{ marginBottom: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <span style={{ color: "#004d14", fontSize: "0.68rem", letterSpacing: "0.1em" }}>{label}</span>
                <span style={{ color: "#00ff41", fontSize: "0.68rem", letterSpacing: "0.1em" }}>{acc}%</span>
              </div>
              <div style={{
                height: "4px",
                background: "rgba(0,255,65,0.08)",
                borderRadius: "2px",
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${width}%`,
                  background: "linear-gradient(90deg, #004d14, #00ff41)",
                  borderRadius: "2px",
                }} />
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "#002d0a", fontSize: "0.7rem", marginTop: "16px", letterSpacing: "0.1em" }}>
          BUILT BY MANAS JADHAV · EFFICIENTNET-B4 · PYTORCH · {new Date().getFullYear()}
        </p>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Demo;