import './Main.css'

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
                    <div className="services-card">
                        <h3>Манікюр</h3>
                        <p>Догляд за нігтями, покриття та сучасний дизайн</p>
                    </div>

                    <div className="services-card">
                        <h3>Макіяж</h3>
                        <p>Денний, вечірній та святковий макіяж для будь-якої події.</p>
                    </div>

                    <div className="services-card">
                        <h3>Брови</h3>
                        <p>Корекція, фарбування та оформлення брів.</p>
                    </div>
                </div>
            </section>
        </main>
    )
}
export default Main 