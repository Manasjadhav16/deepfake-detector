import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const navItem = (path, label) => (
    <Link
      to={path}
      style={{
        color: location.pathname === path ? "#00ff41" : "#004d14",
        textDecoration: "none",
        fontSize: "0.75rem",
        letterSpacing: "0.15em",
        fontWeight: "700",
        padding: "6px 14px",
        border: `1px solid ${location.pathname === path ? "rgba(0,255,65,0.4)" : "transparent"}`,
        borderRadius: "4px",
        background: location.pathname === path ? "rgba(0,255,65,0.05)" : "transparent",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </Link>
  );

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 40px",
      background: "rgba(0,0,0,0.8)",
      borderBottom: "1px solid rgba(0,255,65,0.1)",
      backdropFilter: "blur(10px)",
    }}>
      <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
        <Shield size={18} color="#00ff41" />
        <span style={{ color: "#00ff41", fontFamily: "'Courier New', monospace", fontWeight: "700", letterSpacing: "0.1em", fontSize: "1rem" }}>
          DEEPGUARD
        </span>
      </Link>

      <div style={{ display: "flex", gap: "8px" }}>
        {navItem("/", "HOME")}
        {navItem("/about", "ABOUT")}
        {navItem("/demo", "DEMO")}
      </div>
    </nav>
  );
};

export default Navbar;