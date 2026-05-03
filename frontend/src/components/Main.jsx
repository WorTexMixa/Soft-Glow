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