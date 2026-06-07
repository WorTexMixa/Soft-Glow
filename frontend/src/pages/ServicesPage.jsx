import { useEffect, useState } from "react";
import { Link } from "react-router";
import ServiceCard from "../components/ServiceCard";
import { fetchServices } from "../api/servicesApi";
import "../components/Main.css";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadServices() {
      try {
        const servicesFromApi = await fetchServices();

        setServices(servicesFromApi);
      } catch (error) {
        console.error("Services loading error:", error);
        setError("Не вдалося завантажити послуги");
      } finally {
        setIsLoading(false);
      }
    }

    loadServices();
  }, []);

  return (
    <main>
      <section className="services-page">
        <p className="section-subtitle">Послуги</p>
        <h1 className="page-title">Послуги салону Soft Glow</h1>
        <p className="page-description">
          Оберіть послугу, яка вам підходить, та запишіться онлайн у зручний
          час.
        </p>

        {isLoading && (
          <p className="page-description">Завантаження послуг...</p>
        )}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && services.length === 0 && (
          <p className="page-description">Послуги поки не додані.</p>
        )}

        {!isLoading && !error && services.length > 0 && (
          <div className="services-list">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && services.length > 0 && (
          <div className="page-actions">
            <Link className="contacts-button" to="/booking">
              Записатися онлайн
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default ServicesPage;
