import { Link } from "react-router";
import "../components/Main.css";

function NotFoundPage() {
  return (
    <main>
      <section className="not-found-page">
        <p className="section-subtitle">404</p>

        <h1 className="page-title">Сторінку не знайдено</h1>

        <p className="page-description">
          На жаль, такої сторінки не існує або її адресу введено неправильно.
        </p>

        <Link className="contacts-button" to="/">
          Повернутися на головну
        </Link>
      </section>
    </main>
  );
}

export default NotFoundPage;
