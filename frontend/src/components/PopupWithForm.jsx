import React from "react";

function PopupWithForm({isOpen, isClose, name, title, children, btnText, onSubmit}) {
  return (
    <div
      id={`popup-${name}`}
      className={`popup ${isOpen ? "popup_open" : ""}`}
    >
      <div className="popup__conteiner">
        <button
          className="popup__btn-close"
          type="button"
          onClick={isClose}
        ></button>
        <form
          className="popup__form-edit"
          id={`${name}-form`}
          name={`${name}`}
          method="post"
          action="#"
          onSubmit={onSubmit}
          
        >
          <h3 className="popup__title">{title}</h3>
          {children}
          <button className="popup__btn-submit" type="submit" onClick={onSubmit}>
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
