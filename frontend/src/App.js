import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

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
      background: "#0f0f0f", 
      color: "white",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px"
    }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
        🔍 Deepfake Detector
      </h1>
      <p style={{ color: "#888", marginBottom: "40px" }}>
        Upload a face image to detect if it's real or AI-generated
      </p>

      {/* Upload Box */}
      <div style={{
        border: "2px dashed #444",
        borderRadius: "12px",
        padding: "40px",
        textAlign: "center",
        cursor: "pointer",
        marginBottom: "20px",
        width: "100%",
        maxWidth: "500px"
      }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
          {preview ? (
            <img src={preview} alt="preview" style={{ 
              maxWidth: "100%", 
              borderRadius: "8px",
              maxHeight: "300px"
            }} />
          ) : (
            <div>
              <p style={{ fontSize: "3rem" }}>📁</p>
              <p>Click to upload an image</p>
            </div>
          )}
        </label>
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        disabled={!image || loading}
        style={{
          background: image ? "#6366f1" : "#333",
          color: "white",
          border: "none",
          padding: "14px 40px",
          borderRadius: "8px",
          fontSize: "1rem",
          cursor: image ? "pointer" : "not-allowed",
          marginBottom: "40px"
        }}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {/* Results */}
      {result && (
        <div style={{
          background: "#1a1a1a",
          borderRadius: "12px",
          padding: "30px",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center"
        }}>
          <h2 style={{ 
            color: result.prediction === "FAKE" ? "#ef4444" : "#22c55e",
            fontSize: "2rem",
            marginBottom: "10px"
          }}>
            {result.prediction === "FAKE" ? "⚠️ FAKE" : "✅ REAL"}
          </h2>
          <p style={{ color: "#888", marginBottom: "20px" }}>
            Confidence: <span style={{ color: "white" }}>{result.confidence}%</span>
          </p>
          {result.heatmap && (
            <div>
              <p style={{ color: "#888", marginBottom: "10px" }}>Grad-CAM Heatmap:</p>
              <img 
                src={`data:image/png;base64,${result.heatmap}`}
                alt="heatmap"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;