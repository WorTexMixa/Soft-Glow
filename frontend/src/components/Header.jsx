import { NavLink, useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("currentUser"));

    setCurrentUser(userFromStorage);
  }, [location]);

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  }

  return (
    <header className="header">
      <div className="logo">Soft Glow</div>

      <nav className="nav">
        <NavLink to="/" end>
          Головна
        </NavLink>

        <NavLink to="/services">Послуги</NavLink>
        <NavLink to="/masters">Майстри</NavLink>
        <NavLink to="/booking">Запис</NavLink>
        <NavLink to="/contacts">Контакти</NavLink>

        {currentUser ? (
          <>
            <NavLink to="/my-appointments">Мої записи</NavLink>

            {currentUser.role === "admin" && (
              <NavLink to="/admin">Адмін-панель</NavLink>
            )}

            <div className="user-menu">
              <span className="user-name">{currentUser.name}</span>

              <button className="logout-button" onClick={handleLogout}>
                Вийти
              </button>
            </div>
          </>
        ) : (
          <>
            <NavLink to="/login">Вхід</NavLink>
            <NavLink to="/register">Реєстрація</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;
