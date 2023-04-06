import React from "react";
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = card.owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = ( 
  `elements__like ${isLiked ? 'elements__like elements__like_active': 'elements__like'}` 
 )

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick () {
    onCardDelete(card);
  }

  function handleLikeClick (){
    onCardLike(card);
  }



  return (
    <li className="elements__card">
      {isOwn && <button className="elements__del-card" onClick={handleDeleteClick}></button>}
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="elements__img"
      />
      <div className="elements__description">
        <h2 className="elements__text">{card.name}</h2>
        <div className="elements__like-block">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <p className="elements__number-like">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
