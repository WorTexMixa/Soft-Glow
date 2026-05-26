import { useState } from "react";
import { Link, useNavigate } from "react-router";
import "../components/Main.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

  function handleSubmit(event) {
    event.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((user) => user.email === formData.email);

    if (userExists) {
      alert("Користувач з таким email вже існує");
      return;
    }

    const adminEmails = ["softglow.admin@gmail.com"];

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: adminEmails.includes(formData.email) ? "admin" : "user",
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));

    alert("Реєстрація успішна! Тепер увійдіть в акаунт.");
    navigate("/login");
  }

  return (
    <main>
      <section className="auth-page">
        <p className="section-subtitle">Реєстрація</p>
        <h1 className="page-title">Створити акаунт</h1>
        <p className="page-description">
          Зареєструйтесь, щоб у майбутньому переглядати свої записи та
          користуватися особистим кабінетом.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ім’я</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Ваше ім’я"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

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
            Зареєструватися
          </button>

          <p className="auth-text">
            Вже маєте акаунт? <Link to="/login">Увійти</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;
