import { Link } from "react-router";
import { useState } from "react";
import "../components/Main.css";

function AdminPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [appointments, setAppointments] = useState(
    JSON.parse(localStorage.getItem("appointments")) || [],
  );

  if (!currentUser || currentUser.role !== "admin") {
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

  function handleStatusChange(appointmentId, newStatus) {
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
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  }

  function handleDelete(appointmentId) {
    const confirmed = confirm("Видалити цей запис?");

    if (!confirmed) {
      return;
    }

    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentId,
    );

    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
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

        {appointments.length === 0 ? (
          <div className="empty-appointments">
            <h2>Записів поки немає</h2>
            <p>
              Коли клієнти створять записи, вони з’являться на цій сторінці.
            </p>
          </div>
        ) : (
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
                    <td>{appointment.service}</td>
                    <td>{appointment.master}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>
                      <select
                        value={appointment.status}
                        onChange={(event) =>
                          handleStatusChange(appointment.id, event.target.value)
                        }
                      >
                        <option value="Очікує підтвердження">
                          Очікує підтвердження
                        </option>
                        <option value="Підтверджено">Підтверджено</option>
                        <option value="Скасовано">Скасовано</option>
                        <option value="Виконано">Виконано</option>
                      </select>
                    </td>
                    <td>
                      <button
                        className="delete-button"
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
