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

  function animateLabel(labelElement: HTMLElement, text: string) {
    labelElement.innerHTML = text
      .split("")
      .map((letter, idx) => `<span style="transition-delay:${idx * 50}ms">${letter}</span>`)
      .join("");
  }
  

  return (
    <Layout>
     <form onSubmit={handleSubmit}>
  <div className="form-wave">
    <input
      name="firstName"
      required
      value={form.firstName}
      onChange={handleChange}
    />
    <label ref={(el) => { if (el) animateLabel(el, "First Name"); }} />
  </div>
  <div className="form-wave">
    <input
      name="lastName"
      required
      value={form.lastName}
      onChange={handleChange}
    />
   <label ref={(el) => { if (el) animateLabel(el, "Last Name"); }} />
  </div>
  <div className="form-wave">
    <input
      name="email"
      required
      value={form.email}
      onChange={handleChange}
    />
     <label ref={(el) => { if (el) animateLabel(el, "Email"); }} />
  </div>
  <div className="form-wave">
    <input
      name="password"
      type="password"
      required
      value={form.password}
      onChange={handleChange}
    />
    <label ref={(el) => { if (el) animateLabel(el, "Password"); }} />

  </div>
  <button type="submit">Register</button>
  {error && <p style={{ color: "red" }}>{error}</p>}
</form>

    </Layout>
  );
}
