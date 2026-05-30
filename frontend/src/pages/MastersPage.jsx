import "../components/Main.css";
import { getMasters } from "../data/masters";
import MasterCard from "../components/MasterCard";

const masters = getMasters();

function MastersPage() {
  return (
    <main>
      <section className="masters-page">
        <p className="section-subtitle">Команда</p>
        <h1 className="page-title">Майстри салону Soft Glow</h1>
        <p className="page-description">
          Наші майстри допоможуть підібрати послугу, створити образ і
          забезпечити якісний догляд у комфортній атмосфері.
        </p>

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
      </section>
    </main>
  );
}

export default MastersPage;
