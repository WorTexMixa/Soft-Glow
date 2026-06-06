import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../components/Main.css";
import { API_URL } from "../config/api";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Невірний email або пароль");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      alert(`Вітаємо, ${data.user.name}!`);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("Не вдалося підключитися до сервера");
    }
  }

  return (
    <main>
      <section className="auth-page">
        <p className="section-subtitle">Вхід</p>
        <h1 className="page-title">Увійти в акаунт</h1>
        <p className="page-description">
          Авторизуйтесь, щоб користуватися можливостями особистого кабінету.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Введіть пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-button" type="submit">
            Увійти
          </button>

          <p className="auth-text">
            Немає акаунта? <Link to="/register">Зареєструватися</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
