import "../components/Main.css";
import { Link } from "react-router";

function ContactsPage() {
  return (
    <main>
      <section className="contacts-page">
        <p className="section-subtitle">Контакти</p>
        <h1 className="page-title">Зв’яжіться з Soft Glow</h1>
        <p className="page-desription">
          Ми завжди раді відповісти на ваші запитання та допомогти обрати
          зручний час для відвідування салону.
        </p>

        <div className="contacts-content">
          <div className="contacts-info">
            <h2>Контактна інформація</h2>

            <div className="contact-item">
              <h3>Адреса</h3>
              <p>м. Дніпро, вул. Центральна, 15</p>
            </div>

            <div className="contact-item">
              <h3>Телефон</h3>
              <p>+380 11 000 11 11</p>
            </div>

            <div className="contact-item">
              <h3>Email</h3>
              <p>softglow.beauty@gmail.com</p>
            </div>

            <div className="contact-item">
              <h3>Графік роботи</h3>
              <p>Пн–Сб: 09:00–20:00</p>
              <p>Нд: 10:00–18:00</p>
            </div>
          </div>

          <div className="contacts-card">
            <h2>Як нас знайти?</h2>
            <p>
              Салон Soft Glow розташований у зручному районі міста. Ви можете
              записатися онлайн або зв’язатися з нами телефоном для уточнення
              деталей.
            </p>

            <Link className="contacts-button" to="/booking">
              Записатися онлайн
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ContactsPage;
