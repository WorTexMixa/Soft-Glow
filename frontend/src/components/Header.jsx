import { NavLink } from 'react-router'
import './Header.css'

function Header() {
    return (
        <header className="header">
            <div className="logo">Soft Glow</div>

            <nav className="nav">
                <NavLink to="/" end>Головна</NavLink>
                <NavLink to="/services">Послуги</NavLink>
                <NavLink to="/masters">Майстри</NavLink>
                <NavLink to="/booking">Запис</NavLink>
                <NavLink to="/contacts">Контакти</NavLink>
                <NavLink to="/login">Вхід</NavLink>
                <NavLink to="/register">Реєстрація</NavLink>

            </nav>
        </header>
    )
}
export default Header