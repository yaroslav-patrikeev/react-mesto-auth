import logo from "../images/logo.svg";
import { NavLink } from "react-router-dom";

export default function Header({
  isMenu,
  isMobile,
  email,
  setLoggedIn,
  headerRightElement,
}) {
  return (
    <>
      {isMenu && isMobile && (
        <div className="app-header__mobile-menu">
          <span className="app-header__email">{email}</span>
          <NavLink
            to="/sign-in"
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("token");
            }}
            className="app-header__exit button-hover"
          >
            Выйти
          </NavLink>
        </div>
      )}
      <header className="header header_position">
        <img src={logo} alt="Логотип" className="header__image" />
        {headerRightElement}
      </header>
    </>
  );
}
