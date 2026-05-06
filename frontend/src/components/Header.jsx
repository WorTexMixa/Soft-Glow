import { Link } from 'react-router'
import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="logo">Soft Glow</div>

            <nav className="nav">
                <Link to="/">Головна</Link>
                <Link to="/services">Послуги</Link>
                <Link to="/masters">Майстри</Link>
                <Link to="/booking">Запис</Link>
                <Link to="/contacts">Контакти</Link>
            </nav>
        </header>
    )
}
export default Header