import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApi, Configuration, type LoginRequest } from "../ts-client";
import Layout from "../components/Layout";

export default function Login() {
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const config = new Configuration({ basePath: "http://localhost:3000" });

  const api = new AuthApi(config);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.login(form);
      localStorage.setItem("token", res.data.token); // Save token
      alert("Login successful!");
      navigate("/profile");
    } catch (err: any) {
      setError(err?.response?.data?.error || "Login failed.");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </Layout>
  );
}
