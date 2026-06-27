import { useEffect, useState } from "react";
import { fetchServices } from "../api/servicesApi";
import { fetchMasters } from "../api/mastersApi";
import { createAppointment } from "../api/appointmentsApi";
import "../components/Main.css";

const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

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

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = () => {
    const errors = {};
    const todayDate = getTodayDate();
    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (!formData.name.trim()) {
      errors.name = "Введіть ім'я";
    }

    if (!phoneDigits.trim()) {
      errors.phone = "Введіть номер телефону";
    } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
      errors.phone = "Введіть коректний номер телефону";
    }

    if (!formData.date) {
      errors.date = "Оберіть дату";
    } else if (formData.date < todayDate) {
      errors.date = "Не можна обрати минулу дату";
    }

    if (!formData.service_id) {
      errors.service_id = "Оберіть послугу";
    }

    if (!formData.master_id) {
      errors.master_id = "Оберіть майстра";
    }

    if (!formData.time) {
      errors.time = "Оберіть час";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

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

      setValidationErrors({});
    } catch (error) {
      console.error("Create appointment error:", error);
      alert(error.message || "Не вдалося створити запис");
    } finally {
      setIsSubmitting(false);
    }
  }

  const isRequiredFieldsMissing =
    !formData.name.trim() ||
    !formData.phone.trim() ||
    !formData.service_id.trim() ||
    !formData.master_id.trim() ||
    !formData.date.trim() ||
    !formData.time.trim();

  const isSubmitDisabled = isRequiredFieldsMissing || isSubmitting;

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
            {validationErrors.name && (
              <p className="form-error">{validationErrors.name}</p>
            )}
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
            {validationErrors.phone && (
              <p className="form-error">{validationErrors.phone}</p>
            )}
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
            {validationErrors.service_id && (
              <p className="form-error">{validationErrors.service_id}</p>
            )}
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
            {validationErrors.master_id && (
              <p className="form-error">{validationErrors.master_id}</p>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Дата</label>
              <input
                id="date"
                type="date"
                name="date"
                value={formData.date}
                min={getTodayDate()}
                onChange={handleChange}
                required
              />
              {validationErrors.date && (
                <p className="form-error">{validationErrors.date}</p>
              )}
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
              {validationErrors.time && (
                <p className="form-error">{validationErrors.time}</p>
              )}
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

          <button
            type="submit"
            className="booking-button"
            disabled={isSubmitDisabled}
          >
            {isSubmitting ? "Відправка" : "Записатись"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default BookingPage;
