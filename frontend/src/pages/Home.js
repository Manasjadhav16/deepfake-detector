import { useState, useCallback } from "react";
import { Upload, Shield, AlertTriangle, CheckCircle, Loader, Zap, Cpu, Eye, Video } from "lucide-react";
import MatrixRain from "../components/MatrixRain";

const Home = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [btnHover, setBtnHover] = useState(false);

  const handleImageChange = (file) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleImageChange(file);
  }, []);

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", image);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const isFake = result?.prediction === "FAKE";

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
              SYSTEM ONLINE · DEEPFAKE DETECTION MODULE v1.0
            </span>
          </div>

          <h1 style={{
            fontSize: "3.2rem",
            margin: "0 0 12px",
            fontWeight: "700",
            letterSpacing: "0.1em",
            color: "#00ff41",
            textShadow: "0 0 20px rgba(0,255,65,0.5)",
          }}>
            DEEPGUARD
          </h1>

          <p style={{ color: "#00aa28", fontSize: "0.85rem", marginBottom: "20px", letterSpacing: "0.05em" }}>
            AI-POWERED DEEPFAKE DETECTION · GRAD-CAM EXPLAINABILITY
          </p>

          <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {["EfficientNet-B4", "Grad-CAM XAI", "99.85% Accuracy"].map((tag) => (
              <span key={tag} style={{
                background: "rgba(0,255,65,0.05)",
                border: "1px solid rgba(0,255,65,0.2)",
                borderRadius: "4px",
                padding: "4px 14px",
                fontSize: "0.7rem",
                color: "#00bb30",
                letterSpacing: "0.08em",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Upload Card */}
        <div style={{
          background: "rgba(0,255,65,0.02)",
          border: "1px solid rgba(0,255,65,0.15)",
          borderRadius: "4px",
          padding: "36px",
          marginBottom: "16px",
        }}>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            style={{
              border: `1px dashed ${dragging ? "rgba(0,255,65,0.8)" : "rgba(0,255,65,0.2)"}`,
              borderRadius: "4px",
              padding: "36px",
              textAlign: "center",
              cursor: "pointer",
              marginBottom: "20px",
              background: dragging ? "rgba(0,255,65,0.05)" : "transparent",
              transition: "all 0.3s ease",
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
              style={{ display: "none" }}
              id="fileInput"
            />
            <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
              {preview ? (
                <img src={preview} alt="preview" style={{
                  maxWidth: "100%",
                  borderRadius: "4px",
                  maxHeight: "260px",
                  border: "1px solid rgba(0,255,65,0.2)"
                }} />
              ) : (
                <div>
                  <div style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "4px",
                    background: "rgba(0,255,65,0.05)",
                    border: "1px solid rgba(0,255,65,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}>
                    <Upload size={22} color="#00ff41" />
                  </div>
                  <p style={{ color: "#00ff41", marginBottom: "6px", fontSize: "0.9rem", letterSpacing: "0.05em" }}>
                    DRAG & DROP OR CLICK TO UPLOAD
                  </p>
                  <p style={{ color: "#004d14", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
                    JPG · PNG · WEBP SUPPORTED
                  </p>
                </div>
              )}
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!image || loading}
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              width: "100%",
              background: image && !loading
                ? btnHover ? "rgba(0,255,65,0.2)" : "rgba(0,255,65,0.08)"
                : "transparent",
              color: image && !loading ? "#00ff41" : "#003d10",
              border: `1px solid ${image && !loading ? "rgba(0,255,65,0.6)" : "rgba(0,255,65,0.1)"}`,
              padding: "16px",
              borderRadius: "4px",
              fontSize: "0.9rem",
              fontWeight: "700",
              cursor: image && !loading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              transform: btnHover && image && !loading ? "scale(1.01)" : "scale(1)",
              boxShadow: btnHover && image && !loading ? "0 0 20px rgba(0,255,65,0.2)" : "none",
              letterSpacing: "0.15em",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {loading ? (
              <><Loader size={16} style={{ animation: "spin 1s linear infinite" }} /> ANALYZING TARGET...</>
            ) : (
              <><Shield size={16} /> ANALYZE IMAGE</>
            )}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div style={{
            background: "rgba(0,255,65,0.02)",
            border: `1px solid ${isFake ? "rgba(255,50,50,0.4)" : "rgba(0,255,65,0.3)"}`,
            borderRadius: "4px",
            padding: "36px",
            textAlign: "center",
            animation: "fadeIn 0.4s ease",
            marginBottom: "16px",
          }}>
            <div style={{
              width: "64px",
              height: "64px",
              borderRadius: "4px",
              background: isFake ? "rgba(255,50,50,0.08)" : "rgba(0,255,65,0.08)",
              border: `1px solid ${isFake ? "rgba(255,50,50,0.3)" : "rgba(0,255,65,0.3)"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              {isFake
                ? <AlertTriangle size={28} color="#ff3232" />
                : <CheckCircle size={28} color="#00ff41" />
              }
            </div>

            <p style={{ color: "#004d14", fontSize: "0.7rem", letterSpacing: "0.15em", marginBottom: "8px" }}>
              ANALYSIS COMPLETE · VERDICT
            </p>

            <h2 style={{
              fontSize: "3rem",
              color: isFake ? "#ff3232" : "#00ff41",
              margin: "0 0 8px",
              fontWeight: "700",
              letterSpacing: "0.15em",
              textShadow: isFake ? "0 0 20px rgba(255,50,50,0.4)" : "0 0 20px rgba(0,255,65,0.4)",
            }}>
              {result.prediction}
            </h2>

            <p style={{ color: "#004d14", marginBottom: "28px", fontSize: "0.85rem", letterSpacing: "0.08em" }}>
              CONFIDENCE: <span style={{ color: "#00ff41", fontWeight: "700" }}>{result.confidence}%</span>
            </p>

            {result.heatmap && (
              <div>
                <p style={{ color: "#004d14", marginBottom: "12px", fontSize: "0.7rem", letterSpacing: "0.12em" }}>
                  GRAD-CAM EXPLAINABILITY HEATMAP
                </p>
                <img
                  src={`data:image/png;base64,${result.heatmap}`}
                  alt="heatmap"
                  style={{ width: "100%", borderRadius: "4px", border: "1px solid rgba(0,255,65,0.15)" }}
                />
                <p style={{ color: "#003d10", fontSize: "0.72rem", marginTop: "10px", letterSpacing: "0.05em" }}>
                  RED REGIONS INDICATE AREAS MODEL FOCUSED ON TO MAKE ITS DECISION
                </p>
              </div>
            )}
          </div>
        )}

        {/* How it works */}
        <div style={{
          background: "rgba(0,255,65,0.02)",
          border: "1px solid rgba(0,255,65,0.1)",
          borderRadius: "4px",
          padding: "36px",
          marginBottom: "16px",
        }}>
          <p style={{ color: "#00ff41", fontSize: "0.75rem", letterSpacing: "0.2em", marginBottom: "24px" }}>
            HOW IT WORKS
          </p>

          {[
            { icon: <Upload size={16} color="#00ff41" />, step: "01", title: "UPLOAD IMAGE", desc: "Upload any face image — JPG, PNG or WEBP. Our system accepts real photos and AI-generated faces." },
            { icon: <Cpu size={16} color="#00ff41" />, step: "02", title: "EFFICIENTNET-B4 INFERENCE", desc: "Image is preprocessed and passed through our fine-tuned EfficientNet-B4 model trained on 100,000 faces." },
            { icon: <Eye size={16} color="#00ff41" />, step: "03", title: "GRAD-CAM ANALYSIS", desc: "Gradient-weighted Class Activation Mapping highlights which facial regions influenced the prediction most." },
            { icon: <Video size={16} color="#00ff41" />, step: "04", title: "VERDICT RETURNED", desc: "System returns REAL or FAKE verdict with confidence score and visual heatmap explanation." },
          ].map(({ icon, step, title, desc }) => (
            <div key={step} style={{
              display: "flex",
              gap: "16px",
              marginBottom: "24px",
              alignItems: "flex-start",
            }}>
              <div style={{
                minWidth: "36px",
                height: "36px",
                border: "1px solid rgba(0,255,65,0.2)",
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,255,65,0.05)",
              }}>
                {icon}
              </div>
              <div>
                <p style={{ color: "#004d14", fontSize: "0.65rem", letterSpacing: "0.15em", margin: "0 0 4px" }}>
                  STEP {step}
                </p>
                <p style={{ color: "#00ff41", fontSize: "0.8rem", letterSpacing: "0.08em", margin: "0 0 6px", fontWeight: "700" }}>
                  {title}
                </p>
                <p style={{ color: "#00aa28", fontSize: "0.78rem", margin: 0, lineHeight: "1.6", letterSpacing: "0.02em" }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", color: "#002d0a", fontSize: "0.7rem", marginTop: "16px", letterSpacing: "0.1em" }}>
          BUILT BY MANAS JADHAV · EFFICIENTNET-B4 · PYTORCH · {new Date().getFullYear()}
        </p>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Home;