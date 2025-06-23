import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";

interface DecodedToken {
  sub: string; // email or username
  role: string;
  exp: number;
}

export default function Profile() {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      if (decoded.exp * 100 < Date.now()) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setUser(decoded);
      }
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/login");
    }
  }, []);

  return (
    <Layout>
      <div>
        <h2>Profile Page</h2>
        {user && <p>Welcome, {user.sub}!</p>}
      </div>
    </Layout>
  );
}
