import ServiceCard from '../components/ServiceCard'
import '../components/Main.css'
import { services } from '../data/services'

function ServicesPage () {
    return (
       <main>
            <section className="services-page">
                <p className="section-subtitle">Послуги</p>
                <h1 className="page-title">Послуги салону Soft Glow</h1>
                <p className="page-description">
                   Оберіть послугу, яка вам підходить, та запишіться онлайн у зручний час.
                </p>

                 <div className="services-list">
                    {services.map((service) => (
                        <ServiceCard
                           key={service.id}
                           title={service.title}
                           description={service.description}
                        />
                   ))}
                </div>
            </section>
    </main>
    )
}

export default ServicesPage