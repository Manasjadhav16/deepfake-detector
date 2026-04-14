import { useState, useCallback } from "react";
import { Upload, Shield, AlertTriangle, CheckCircle, Loader } from "lucide-react";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

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

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

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

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0f1a 0%, #1a0f2e 50%, #0f1a0f 100%)",
      color: "white",
      fontFamily: "'Segoe UI', Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px"
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
          <Shield size={40} color="#6366f1" />
          <h1 style={{ fontSize: "2.8rem", margin: 0, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            DeepGuard
          </h1>
        </div>
        <p style={{ color: "#888", fontSize: "1.1rem", margin: 0 }}>
          AI-Powered Deepfake Detection with Visual Explainability
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "16px" }}>
          {["EfficientNet-B4", "Grad-CAM", "99.85% Accuracy"].map(tag => (
            <span key={tag} style={{
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "0.75rem",
              color: "#a5b4fc"
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* Main Card */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "600px",
        backdropFilter: "blur(10px)"
      }}>
        {/* Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: `2px dashed ${dragging ? "#6366f1" : "rgba(255,255,255,0.15)"}`,
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
            cursor: "pointer",
            marginBottom: "24px",
            transition: "all 0.3s ease",
            background: dragging ? "rgba(99,102,241,0.05)" : "transparent"
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
                borderRadius: "8px",
                maxHeight: "280px"
              }} />
            ) : (
              <div>
                <Upload size={48} color="#6366f1" style={{ marginBottom: "16px" }} />
                <p style={{ color: "#ccc", marginBottom: "8px", fontSize: "1rem" }}>
                  Drag & drop or click to upload
                </p>
                <p style={{ color: "#555", fontSize: "0.85rem" }}>
                  Supports JPG, PNG, WEBP
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleSubmit}
          disabled={!image || loading}
          style={{
            width: "100%",
            background: image && !loading ? "linear-gradient(90deg, #6366f1, #8b5cf6)" : "rgba(255,255,255,0.05)",
            color: image && !loading ? "white" : "#555",
            border: "none",
            padding: "16px",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: image && !loading ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "all 0.3s ease"
          }}
        >
          {loading ? (
            <><Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> Analyzing...</>
          ) : (
            <><Shield size={18} /> Analyze Image</>
          )}
        </button>
      </div>

      {/* Results */}
      {result && (
        <div style={{
          marginTop: "30px",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${result.prediction === "FAKE" ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`,
          borderRadius: "20px",
          padding: "40px",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center"
        }}>
          {result.prediction === "FAKE" ? (
            <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: "16px" }} />
          ) : (
            <CheckCircle size={48} color="#22c55e" style={{ marginBottom: "16px" }} />
          )}

          <h2 style={{
            fontSize: "2.5rem",
            color: result.prediction === "FAKE" ? "#ef4444" : "#22c55e",
            margin: "0 0 8px 0"
          }}>
            {result.prediction}
          </h2>

          <p style={{ color: "#888", marginBottom: "30px" }}>
            Confidence: <span style={{ color: "white", fontWeight: "600" }}>{result.confidence}%</span>
          </p>

          {result.heatmap && (
            <div>
              <p style={{ color: "#888", marginBottom: "12px", fontSize: "0.9rem" }}>
                Grad-CAM Explainability Heatmap
              </p>
              <img
                src={`data:image/png;base64,${result.heatmap}`}
                alt="heatmap"
                style={{ width: "100%", borderRadius: "12px" }}
              />
              <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "12px" }}>
                Red regions indicate areas the model focused on to make its decision
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;