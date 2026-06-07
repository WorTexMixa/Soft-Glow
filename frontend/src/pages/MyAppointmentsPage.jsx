import { useEffect, useState } from "react";
import { Link } from "react-router";
import { fetchMyAppointments } from "../api/appointmentsApi";
import "../components/Main.css";

function MyAppointmentsPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMyAppointments() {
      if (!currentUser || !token) {
        setIsLoading(false);
        return;
      }

      try {
        const appointmentsFromApi = await fetchMyAppointments();
        setAppointments(appointmentsFromApi);
      } catch (error) {
        console.error("My appointments loading error:", error);
        setError(error.message || "Не вдалося завантажити записи");
      } finally {
        setIsLoading(false);
      }
    }

    loadMyAppointments();
  }, []);

  if (!currentUser || !token) {
    return (
      <main>
        <section className="my-appointments-page">
          <p className="section-subtitle">Мої записи</p>
          <h1 className="page-title">Потрібна авторизація</h1>
          <p className="page-description">
            Щоб переглядати свої записи, увійдіть в акаунт або зареєструйтесь.
          </p>

          <div className="appointments-actions">
            <Link className="contacts-button" to="/login">
              Увійти
            </Link>

            <Link className="contacts-button secondary-button" to="/register">
              Зареєструватися
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="my-appointments-page">
        <p className="section-subtitle">Особистий кабінет</p>
        <h1 className="page-title">Мої записи</h1>
        <p className="page-description">
          Тут відображаються записи, створені з вашого акаунта.
        </p>

        {isLoading && (
          <p className="page-description">Завантаження записів...</p>
        )}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && appointments.length === 0 && (
          <div className="empty-appointments">
            <h2>У вас ще немає записів</h2>
            <p>Оберіть послугу та створіть перший онлайн-запис.</p>

            <Link className="contacts-button" to="/booking">
              Записатися онлайн
            </Link>
          </div>
        )}

        {!isLoading && !error && appointments.length > 0 && (
          <div className="appointments-list">
            {appointments.map((appointment) => (
              <div className="appointment-card" key={appointment.id}>
                <div className="appointment-header">
                  <h3>
                    {appointment.service_title ||
                      appointment.service ||
                      appointment.service_name ||
                      "Послуга"}
                  </h3>

                  <span className="appointment-status">
                    {appointment.status || "Очікує підтвердження"}
                  </span>
                </div>

                <p>
                  <strong>Майстер:</strong>{" "}
                  {appointment.master_name ||
                    appointment.master ||
                    appointment.master_full_name ||
                    "Не вказано"}
                </p>

                <p>
                  <strong>Дата:</strong> {appointment.date}
                </p>

                <p>
                  <strong>Час:</strong> {appointment.time}
                </p>

                <p>
                  <strong>Телефон:</strong> {appointment.phone}
                </p>

                {appointment.comment && (
                  <p>
                    <strong>Коментар:</strong> {appointment.comment}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default MyAppointmentsPage;
