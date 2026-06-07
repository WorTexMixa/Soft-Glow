import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  fetchAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../api/appointmentsApi";
import { getStatusLabel } from "../utils/statusUtils";
import "../components/Main.css";

const statusLabels = {
  pending: "Очікує підтвердження",
  confirmed: "Підтверджено",
  cancelled: "Скасовано",
  completed: "Виконано",
};

function AdminPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = localStorage.getItem("token");

  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAppointments() {
      if (!currentUser || currentUser.role !== "admin" || !token) {
        setIsLoading(false);
        return;
      }

      try {
        const appointmentsFromApi = await fetchAllAppointments();
        setAppointments(appointmentsFromApi);
      } catch (error) {
        console.error("Admin appointments loading error:", error);
        setError(error.message || "Не вдалося завантажити записи");
      } finally {
        setIsLoading(false);
      }
    }

    loadAppointments();
  }, []);

  if (!currentUser || currentUser.role !== "admin" || !token) {
    return (
      <main>
        <section className="admin-page">
          <p className="section-subtitle">Адмін-панель</p>
          <h1 className="page-title">Доступ заборонено</h1>
          <p className="page-description">
            Ця сторінка доступна тільки адміністратору салону.
          </p>

          <Link className="contacts-button" to="/login">
            Увійти
          </Link>
        </section>
      </main>
    );
  }

  async function handleStatusChange(appointmentId, newStatus) {
    try {
      await updateAppointmentStatus(appointmentId, newStatus);

      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === appointmentId) {
          return {
            ...appointment,
            status: newStatus,
          };
        }

        return appointment;
      });

      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Update status error:", error);
      alert(error.message || "Не вдалося оновити статус");
    }
  }

  async function handleDelete(appointmentId) {
    const confirmed = window.confirm("Видалити цей запис?");

    if (!confirmed) {
      return;
    }

    try {
      await deleteAppointment(appointmentId);

      const updatedAppointments = appointments.filter(
        (appointment) => appointment.id !== appointmentId,
      );

      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Delete appointment error:", error);
      alert(error.message || "Не вдалося видалити запис");
    }
  }

  return (
    <main>
      <section className="admin-page">
        <p className="section-subtitle">Адмін-панель</p>
        <h1 className="page-title">Керування записами</h1>
        <p className="page-description">
          Тут адміністратор може переглядати записи клієнтів та змінювати їхній
          статус.
        </p>

        <div className="admin-actions">
          <Link className="contacts-button" to="/admin/services">
            Керування послугами
          </Link>

          <Link
            className="contacts-button secondary-button"
            to="/admin/masters"
          >
            Керування майстрами
          </Link>
        </div>

        {isLoading && (
          <p className="page-description">Завантаження записів...</p>
        )}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && appointments.length === 0 && (
          <div className="empty-appointments">
            <h2>Записів поки немає</h2>
            <p>
              Коли клієнти створять записи, вони з’являться на цій сторінці.
            </p>
          </div>
        )}

        {!isLoading && !error && appointments.length > 0 && (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Клієнт</th>
                  <th>Телефон</th>
                  <th>Послуга</th>
                  <th>Майстер</th>
                  <th>Дата</th>
                  <th>Час</th>
                  <th>Статус</th>
                  <th>Дія</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.name}</td>
                    <td>{appointment.phone}</td>

                    <td>
                      {appointment.service_title ||
                        appointment.service ||
                        appointment.service_name ||
                        "Не вказано"}
                    </td>

                    <td>
                      {appointment.master_name ||
                        appointment.master ||
                        appointment.master_full_name ||
                        "Не вказано"}
                    </td>

                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>

                    <td>
                      <select
                        className={`status-select status-select--${appointment.status || "pending"}`}
                        value={appointment.status || "pending"}
                        onChange={(event) =>
                          handleStatusChange(appointment.id, event.target.value)
                        }
                      >
                        <option value="pending">Очікує підтвердження</option>
                        <option value="confirmed">Підтверджено</option>
                        <option value="cancelled">Скасовано</option>
                        <option value="completed">Виконано</option>
                      </select>
                    </td>

                    <td>
                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => handleDelete(appointment.id)}
                      >
                        Видалити
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminPage;
