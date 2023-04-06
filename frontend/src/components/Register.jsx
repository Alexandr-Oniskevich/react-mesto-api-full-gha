import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  // Стейты для регистрации
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Передача почты и пароля
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  // отправялем форму
  function handleSubmitButton(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <>
      <div className="login-page">
        <h3 className="login-page__title">Регистрация</h3>
        <form className="login-page__form" onSubmit={handleSubmitButton}>
          <input
            type="email"
            onChange={handleEmail}
            value={email || ""}
            className="login-page__input"
            name="email"
            required
            placeholder="Email"
          />

          <input
            type="password"
            onChange={handlePassword}
            value={password || ""}
            className="login-page__input"
            name="password"
            required
            placeholder="Пароль"
          />

          <button
            type="submit"
            className="login-page__btn"
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="login-page__block">
          <p className="login-page__text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="login-page__link">
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
