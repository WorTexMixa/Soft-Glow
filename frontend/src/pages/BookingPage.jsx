import { useState } from "react";
import { getServices } from "../data/services";
import { masters } from "../data/masters";
import "../components/Main.css";

function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    master: "",
    date: "",
    time: "",
    comment: "",
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

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    const newAppointment = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      service: formData.service,
      master: formData.master,
      date: formData.date,
      time: formData.time,
      comment: formData.comment,
      status: "Очікує підтвердження",

      userId: currentUser ? currentUser.id : null,
      userEmail: currentUser ? currentUser.email : null,
    };

    localStorage.setItem(
      "appointments",
      JSON.stringify([...appointments, newAppointment]),
    );

    alert("Запис успішно створено! Ми зв’яжемося з вами для підтвердження.");

    setFormData({
      name: "",
      phone: "",
      service: "",
      master: "",
      date: "",
      time: "",
      comment: "",
    });
  }

  const services = getServices();

  return (
    <main>
      <section className="booking-page">
        <p className="section-subtitle">Онлайн-запис</p>
        <h1 className="page-title">Записатися на послугу</h1>
        <p className="page-description">
          Заповніть форму, оберіть послугу, майстра та зручний час відвідування.
        </p>

        <form className="booking-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ваше ім’я</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Наприклад, Аліна"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Номер телефону</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="+380..."
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="service">Послуга</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              <option value="">Оберіть послугу</option>
              {services.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="master">Майстер</label>
            <select
              id="master"
              name="master"
              value={formData.master}
              onChange={handleChange}
              required
            >
              <option value="">Оберіть майстра</option>
              {masters.map((master) => (
                <option key={master.id} value={master.name}>
                  {master.name} — {master.profession}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Дата</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="time">Час</label>
              <input
                id="time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Коментар</label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Додаткова інформація за бажанням"
              value={formData.comment}
              onChange={handleChange}
            ></textarea>
          </div>

          <button className="booking-button" type="submit">
            Підтвердити запис
          </button>
        </form>
      </section>
    </main>
  );
}

export default BookingPage;
