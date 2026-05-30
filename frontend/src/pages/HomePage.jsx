import "../components/Main.css";
import MasterCard from "../components/MasterCard";
import ServiceCard from "../components/ServiceCard";
import { getServices } from "../data/services";
import { getMasters } from "../data/masters";
import { Link } from "react-router";

function HomePage() {
  const services = getServices();
  const masters = getMasters();

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">Салон краси</p>
          <h1 className="hero-title">Soft Glow</h1>
          <p className="hero-description">
            Місце, де краса, догляд і комфорт поєднуються в одному просторі.
          </p>
          <Link className="hero-button" to="/booking">
            Записатись онлайн
          </Link>
        </div>
      </section>

      <section className="about">
        <div className="about-content">
          <div className="about-text">
            <p className="section-subtitle">Про салон</p>
            <h2>Soft Glow — простір краси та турботи</h2>
            <p>
              Soft Glow — це сучасний салон краси, де клієнти можуть отримати
              якісний догляд, професійні послуги та комфортну атмосферу.
            </p>
            <p>
              Ми прагнемо зробити процес запису зручним, а взаємодію з салоном —
              швидкою, зрозумілою та приємною для кожного клієнта.
            </p>
          </div>

          <div className="about-card">
            <h3>Наші переваги</h3>
            <ul>
              <li>Професійні майстри</li>
              <li>Онлайн-запис на послуги</li>
              <li>Зручний особистий кабінет</li>
              <li>Адмін-панель для керування салоном</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="services">
        <h2 className="services-title">Наші послуги</h2>
        <div className="services-list">
          {services.slice(0, 4).map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </section>

      <section className="master">
        <h2 className="master-title">Наші майстри</h2>
        <div className="master-list">
          {masters.slice(0, 4).map((master) => (
            <MasterCard
              key={master.id}
              name={master.name}
              profession={master.profession}
              experience={master.experience}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default HomePage;
