import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ padding: 40 }}>
        <h1>Welcome to Our Authentication Authorization System</h1>
        <button onClick={() => navigate("/register")}>Register</button>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <footer>By TAAF</footer>
      </div>
    </Layout>
  );
}
