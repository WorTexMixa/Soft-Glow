import { useEffect, useState } from "react";
import { fetchServices } from "../api/servicesApi";
import { fetchMasters } from "../api/mastersApi";
import { createAppointment } from "../api/appointmentsApi";
import "../components/Main.css";

function BookingPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service_id: "",
    master_id: "",
    date: "",
    time: "",
    comment: "",
  });

  const [services, setServices] = useState([]);
  const [masters, setMasters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookingData() {
      try {
        const servicesFromApi = await fetchServices();
        const mastersFromApi = await fetchMasters();

        setServices(servicesFromApi);
        setMasters(mastersFromApi);
      } catch (error) {
        console.error("Booking data loading error:", error);
        setError("Не вдалося завантажити послуги або майстрів");
      } finally {
        setIsLoading(false);
      }
    }

    loadBookingData();
  }, []);

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
      await createAppointment({
        name: formData.name,
        phone: formData.phone,
        service_id: Number(formData.service_id),
        master_id: Number(formData.master_id),
        date: formData.date,
        time: formData.time,
        comment: formData.comment,
      });

      alert("Запис успішно створено! Ми зв’яжемося з вами для підтвердження.");

      setFormData({
        name: "",
        phone: "",
        service_id: "",
        master_id: "",
        date: "",
        time: "",
        comment: "",
      });
    } catch (error) {
      console.error("Create appointment error:", error);
      alert(error.message || "Не вдалося створити запис");
    }
  }

  return (
    <main>
      <section className="booking-page">
        <p className="section-subtitle">Онлайн-запис</p>
        <h1 className="page-title">Записатися на послугу</h1>
        <p className="page-description">
          Заповніть форму, оберіть послугу, майстра та зручний час відвідування.
        </p>

        {error && <p className="error-message">{error}</p>}

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
            <label htmlFor="service_id">Послуга</label>
            <select
              id="service_id"
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              required
              disabled={isLoading}
            >
              <option value="">
                {isLoading ? "Завантаження послуг..." : "Оберіть послугу"}
              </option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="master_id">Майстер</label>
            <select
              id="master_id"
              name="master_id"
              value={formData.master_id}
              onChange={handleChange}
              required
              disabled={isLoading}
            >
              <option value="">
                {isLoading ? "Завантаження майстрів..." : "Оберіть майстра"}
              </option>

              {masters.map((master) => (
                <option key={master.id} value={master.id}>
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
