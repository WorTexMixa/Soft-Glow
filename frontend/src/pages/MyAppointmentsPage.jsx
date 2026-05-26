import { Link } from "react-router";
import "../components/Main.css";

function MyAppointmentsPage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
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

  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

  const userAppointments = appointments.filter(
    (appointment) => appointment.userId === currentUser.id,
  );

  return (
    <main>
      <section className="my-appointments-page">
        <p className="section-subtitle">Особистий кабінет</p>
        <h1 className="page-title">Мої записи</h1>
        <p className="page-description">
          Тут відображаються записи, створені з вашого акаунта.
        </p>

        {userAppointments.length === 0 ? (
          <div className="empty-appointments">
            <h2>У вас ще немає записів</h2>
            <p>Оберіть послугу та створіть перший онлайн-запис.</p>

            <Link className="contacts-button" to="/booking">
              Записатися онлайн
            </Link>
          </div>
        ) : (
          <div className="appointments-list">
            {userAppointments.map((appointment) => (
              <div className="appointment-card" key={appointment.id}>
                <div className="appointment-header">
                  <h3>{appointment.service}</h3>
                  <span className="appointment-status">
                    {appointment.status}
                  </span>
                </div>

                <p>
                  <strong>Майстер:</strong> {appointment.master}
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
