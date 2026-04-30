import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="logo">Soft Glow</div>

            <nav className="nav">
            <a href="#">Головна</a>
            <a href="#">Послуги</a>
            <a href="#">Майстри</a>
            <a href="#">Запис</a>
            <a href="#">Контакти</a>
            </nav>
        </header>
    )
}
export default Header