import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="home-container">
        <h2>🎉 Welcome to Our Auth System! 🎉</h2>
        <p style={{ textAlign: "center", marginBottom: "2rem" }}>
          Securely register, log in, and manage your profile with ease. 🔐✨
        </p>

        <button onClick={() => navigate("/register")}>📝 Register</button>
        <button onClick={() => navigate("/login")}>🔐 Login</button>
        <button onClick={() => navigate("/profile")}>👤 View Profile</button>

        <footer style={{ textAlign: "center", marginTop: "2rem", fontStyle: "italic" }}>
          🚀 Built with ❤️ by <strong>TAAF</strong>
        </footer>
      </div>
    </Layout>
  );
}
