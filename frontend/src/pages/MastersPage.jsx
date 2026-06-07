import { useEffect, useState } from "react";
import { Link } from "react-router";
import MasterCard from "../components/MasterCard";
import { fetchMasters } from "../api/mastersApi";
import "../components/Main.css";

function MastersPage() {
  const [masters, setMasters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMasters() {
      try {
        const mastersFromApi = await fetchMasters();

        setMasters(mastersFromApi);
      } catch (error) {
        console.error("Masters loading error:", error);
        setError("Не вдалося завантажити майстрів");
      } finally {
        setIsLoading(false);
      }
    }

    loadMasters();
  }, []);

  return (
    <main>
      <section className="masters-page">
        <p className="section-subtitle">Команда</p>
        <h1 className="page-title">Майстри салону Soft Glow</h1>
        <p className="page-description">
          Наші майстри допоможуть підібрати послугу, створити образ і
          забезпечити якісний догляд у комфортній атмосфері.
        </p>

        {isLoading && (
          <p className="page-description">Завантаження майстрів...</p>
        )}

        {error && <p className="error-message">{error}</p>}

        {!isLoading && !error && masters.length === 0 && (
          <p className="page-description">Майстри поки не додані.</p>
        )}

        {!isLoading && !error && masters.length > 0 && (
          <div className="master-list">
            {masters.map((master) => (
              <MasterCard
                key={master.id}
                name={master.name}
                profession={master.profession}
                experience={master.experience}
              />
            ))}
          </div>
        )}
        
        {!isLoading && !error && masters.length > 0 && (
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

export default MastersPage;
