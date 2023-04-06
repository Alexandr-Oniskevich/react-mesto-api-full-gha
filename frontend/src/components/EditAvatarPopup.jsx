import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditAvatarPopup(props){

  const avatarRef = React.useRef();

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [currentUser.avatar]);
  
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return(
    <PopupWithForm
        isOpen={props.isOpen}
        isClose={props.isClose}
        onSubmit={handleSubmit}
        name="avatar"
        title="Обновить аватар"
        btnText={"Сохранить"}
      >
        <input
          className="popup__input popup__input_item_avatar"
          name="avatarinput"
          id="avatar-input"
          type="url"
          ref={avatarRef}
          required
          placeholder="Ссылка на фото"
        />
        <span className="popup__input-error avatar-input-error"></span>
      </PopupWithForm>
  )

}

export default EditAvatarPopup;