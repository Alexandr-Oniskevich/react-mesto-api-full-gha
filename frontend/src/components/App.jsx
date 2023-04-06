import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { useEffect } from "react";
import api from "../utils/Api.js";
import * as auth from "../utils/auth.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] =
    React.useState(false);
  const [isImageOpen, setIsImageOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setcurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth.checkToken(token)
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(res.email);
        navigate("/");
      })
      .catch((err) => {
        console.log(`Возникла ошибка, ${err}`);
      });
    }
  }

  function handleRegister(email, password) {
    console.log(email, password);
    return auth
      .register(email, password)
      .then(() => {
        navigate("/sign-in");
        setIsSuccess(true);
        setIsInfoTooltipPopupOpen(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        // Если токен валиден, авторизовываем и перебрасываем на главную
        if (res.token) {
          localStorage.setItem("token", res.token);
          setEmail(email);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserData({
      email: "",
      password: "",
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
    Promise.all([api.takeUserInfo(), api.getInitialCards()])
      .then(([profileValues, cardsValues]) => {
        setcurrentUser(profileValues);
        setCards(cardsValues);
      })
      .catch((err) => {
        console.log(`Возникла ошибка, ${err}`);
      });
    }
  }, [isLoggedIn]);

  function handleCardClick(cardElement) {
    setIsImageOpen(true);
    setSelectedCard({
      ...selectedCard,
      name: cardElement.name,
      link: cardElement.link,
    });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImageOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some( (like) => like === currentUser._id );

    (!isLiked ? api.addLike(card._id) : api.deleteLike(card._id))
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        // Обновляем стейт
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(data) {
    api
      .deleteCard(data._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== data._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateUser(data) {
    api
      .editUserInfo(data.name, data.about)
      .then((res) => {
        setcurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .editUserAvatar(data.avatar)
      .then((res) => {
        setcurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateCard(data) {
    api
      .addNewCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} email={email} onSignOut={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                loggedIn={isLoggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login onLogin={handleLogin} />}
          />
        </Routes>
        <Footer />
        {/* <!--Попап редактирования профиля--> */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        {/* <!--Попап добавления карточки--> */}
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isClose={closeAllPopups}
          onAddPlace={handleUpdateCard}
        />
        {/* <!-- Попап редактирования аватара --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        {/* Попап удаления карточки  */}
        <PopupWithForm
          isOpen={isDeleteCardPopupOpen}
          isClose={closeAllPopups}
          name="delete"
          title="Вы уверены?"
          btnText="Да"
        ></PopupWithForm>
        {/* <!-- Попап изображения --> */}
        <ImagePopup
          isOpen={isImageOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          isSuccess={isSuccess}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
