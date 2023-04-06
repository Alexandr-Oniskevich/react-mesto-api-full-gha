import React from "react";
import success from "../images/success.svg";
import unsuccess from "../images/unsuccess.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__conteiner">
        <button
          id="success-close-button"
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        />
        <img
          className="popup__tooltip-icon"
          src={`${isSuccess ? success : unsuccess}`}
          alt={`${
            isSuccess
              ? "Успешная регистрация"
              : "Произошла ошибка при регистрации"
          }`}
        />
        <h2 className="popup__tooltip-text">{`${
          isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }`}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
