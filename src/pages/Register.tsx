import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { authApi } from '../api/auth';
import { AuthApi, Configuration, type RegisterRequest } from "../ts-client";
import Layout from "../components/Layout";

export default function Register() {
  const [form, setForm] = useState<RegisterRequest>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

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
      await api.register(form);
      alert("Registration complete!");
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.error || "Registration failed.");
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
        />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </Layout>
  );
}
