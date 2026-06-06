import "../components/Main.css";
import MasterCard from "../components/MasterCard";
import ServiceCard from "../components/ServiceCard";
import { useEffect, useState } from "react";
import { fetchServices } from "../api/servicesApi";
import { fetchMasters } from "../api/mastersApi";
import { Link } from "react-router";

function HomePage() {
  const [services, setServices] = useState([]);
  const [servicesError, setServicesError] = useState("");

  const [masters, setMasters] = useState([]);
  const [mastersError, setMastersError] = useState("");

  useEffect(() => {
    async function loadHomepageData() {
      try {
        const servicesFromApi = await fetchServices();
        setServices(servicesFromApi);
      } catch (error) {
        console.error("Homepage services loading error:", error);
        setServicesError("Не вдалося завантажити послуги");
      }

      try {
        const mastersFromApi = await fetchMasters();
        setMasters(mastersFromApi);
      } catch (error) {
        console.error("Homepage masters loading error:", error);
        setMastersError("Не вдалося завантажити майстрів");
      }
    }

    loadHomepageData();
  }, []);

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
          {servicesError ? (
            <p className="error-message">{servicesError}</p>
          ) : (
            services
              .slice(0, 4)
              .map((service) => (
                <ServiceCard
                  key={service.id}
                  title={service.title}
                  description={service.description}
                />
              ))
          )}
        </div>
      </section>

      <section className="master">
        <h2 className="master-title">Наші майстри</h2>

        <div className="master-list">
          {mastersError ? (
            <p className="error-message">{mastersError}</p>
          ) : (
            masters
              .slice(0, 3)
              .map((master) => (
                <MasterCard
                  key={master.id}
                  name={master.name}
                  profession={master.profession}
                  experience={master.experience}
                />
              ))
          )}
        </div>
      </section>
    </main>
  );
}
export default HomePage;
