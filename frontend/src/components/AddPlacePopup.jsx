import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  // const nameRef = React.useRef();
  // const linkRef = React.useRef();

  const [place, setPlace] = React.useState([""]);
  const [link, setLink] = React.useState([""]);

  React.useEffect(() => {
    setPlace("");
    setLink("");
  }, [props.isOpen]);

  function handlePlace(event) {
    setPlace(event.target.value);
  }
  function handleLink(event) {
    setLink(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: place,
      link: link,
    });
  }
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      isClose={props.isClose}
      onSubmit={handleSubmit}
      name="cards"
      title="Новое место"
      btnText="Создать"
    >
      <input
        className="popup__input popup__input_item_name"
        value={place || ""}
        onChange={handlePlace}
        id="place-input"
        name="mestoname"
        type="text"
        minLength="2"
        maxLength="30"
        required
        placeholder="Название"
      />
      <span className="popup__input-error place-input-error"></span>
      <input
        className="popup__input popup__input_item_description"
        id="url-input"
        value={link || ""}
        onChange={handleLink}
        name="mestolink"
        type="url"
        required
        placeholder="Ссылка на картинку"
      />
      <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
