import React from "react";

function ImagePopup({isOpen, onClose, card}) {
  return (
    <div
      id="image-popup"
      className={`popup popup_img_active ${isOpen ? "popup_open" : ""}`}
    >
      <div className="popup__img-container">
        <button
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        ></button>
        <img
          src={card.link}
          className="popup__image"
          alt={card.name}
        />
        <p className="popup__description">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
