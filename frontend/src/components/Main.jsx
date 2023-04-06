import React from "react";
import Card from "./Card.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__edit" onClick={props.onEditAvatar}></div>
          <img
            src={currentUser.avatar}
            alt="аватар профиля"
            className="profile__avatar"
          />
          <div className="profile__description">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__profession">{currentUser.about}</p>
            <button
              className="profile__btn-edit"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
        </div>
        <button
          className="profile__add-btn"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="elements__list">
          {props.cards.map((cardElement) => (
            <Card
              key={cardElement._id}
              // onDeleteCard={props.onDeleteCard}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              card={cardElement}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
