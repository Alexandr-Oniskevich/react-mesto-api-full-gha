import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import logo from "../../src/images/logo.svg";

function Header(props) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />

      <div className="header__nav">
        {props.isLoggedIn ? ( 
          <>
            <p className="header__email">{props.email}</p>
            <Link
              to="/sign-in"
              className="header__link"
              onClick={props.onSignOut}
            >
              Выйти
            </Link>
          </>
        ) : (
          
          <>
            {location.pathname === "/sign-in" && (
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            )}

            {location.pathname === "/sign-up" && (
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
