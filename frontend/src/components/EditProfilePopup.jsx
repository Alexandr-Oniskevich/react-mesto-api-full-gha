import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props){

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return(
    <PopupWithForm
        isOpen={props.isOpen}
        isClose={props.isClose}
        onSubmit={handleSubmit}
        name="pofile"
        title="Редактировать профиль"
        btnText="Сохранить"
      >
        <input
          className="popup__input popup__input_item_name"
          id="name-input"
          name="profile_name"
          type="text"
          required
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="popup__input-error name-input-error"></span>
        <input
          className="popup__input popup__input_item_description"
          id="job-input"
          name="profile_job"
          type="text"
          required
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={description  || ""}
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error job-input-error"></span>
      </PopupWithForm>
  )
}

export default EditProfilePopup;