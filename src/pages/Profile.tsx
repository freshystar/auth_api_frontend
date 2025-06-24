import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Layout from "../components/Layout";
import { useToast } from "../components/ToastProvider";

interface DecodedToken {
  sub: string; // email
  role: string;
  exp: number;
}

export default function Profile() {
  const [profile, setProfile] = useState<{
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    role: string | null;
  }>({
    firstName: null,
    lastName: null,
    email: null,
    role: null,
  });

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    if (!token) {
      toast("📌 Please log in to view your profile.");
      navigate("/login");
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);

      if (decoded.exp * 1000 < Date.now()) {
        toast("⛔️ Session expired. Please log in again.");
        localStorage.clear();
        navigate("/login");
        return;
      }

      setProfile({
        firstName: firstName || "(not set)",
        lastName: lastName || "(not set)",
        email: decoded.sub,
        role: decoded.role,
      });
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Layout>
      <div style={{ maxWidth: "500px", margin: "auto", padding: "1rem" }}>
        <h2>😊👋 Welcome, {profile.firstName}!</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
          <div>
            <strong>First Name:</strong> {profile.firstName}
          </div>
          <div>
            <strong>Last Name:</strong> {profile.lastName}
          </div>
          <div>
            <strong>Email:</strong> {profile.email}
          </div>
          <div>
            <strong>Role:</strong> {profile.role}
          </div>
        </div>
      </div>
      <p>
       Back to <Link to="/home"> home 🏠</Link>
      </p>
    </Layout>
  );
}
