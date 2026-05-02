import './Main.css'
import ServiceCard from './ServiceCard'

const services = [
    {
        id: 1,
        title: 'Манікюр',
        description: 'Догляд за нігтями, покриття та сучасний дизайн.'
    },
    {
        id: 2,
        title: 'Макіяж',
        description: 'Денний, вечірній та святковий макіяж для будь-якої події.'
    },
    {
        id: 3,
        title: 'Брови',
        description: 'Корекція, фарбування та оформлення брів.'
    },
    {
        id: 4,
        title: 'Зачіски',
        description: 'Стильні зачіски для щоденного образу та особливих подій.'
    }
]

function Main() {
    return (
        <main>
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-subtitle">Салон краси</p>
                    <h1 className="hero-title">Soft Glow</h1>
                    <p className="hero-description">
                        Місце, де краса, догляд і комфорт 
                        поєднуються в одному просторі.
                    </p>
                    <button className="hero-button">
                        Записатись онлайн
                    </button>
                </div>
            </section>

            <section className="services">
                <h2 className="services-title">Наші послуги</h2>
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
export default Main 