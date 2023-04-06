import React, { useState } from "react";

function Login(props) {
  // Стейты авторизации
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Передача почты и пароля
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  // Функция авторизации и сброса формы
  function handleSubmitButton(event) {
    event.preventDefault();
    props.onLogin(email, password);
    setPassword("");
    setEmail("");
  }

  return (
    <>
      <div className="login-page">
        <h3 className="login-page__title">Вход</h3>
        <form className="login-page__form" onSubmit={handleSubmitButton}>
          <input
            onChange={handleEmail}
            value={email || ""}
            type="email"
            className="login-page__input"
            name="email"
            required
            placeholder="Email"
          />

          <input
            onChange={handlePassword}
            value={password || ""}
            type="password"
            className="login-page__input"
            name="password"
            required
            placeholder="Пароль"
          />

          <button type="submit" className="login-page__btn">
            Войти
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
