import React from 'react'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup'

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });


  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const handleClick = (card) => {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({ name: '', link: '' })
  };

  return (

    <div className="page">

      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleClick}
      />
      <Footer />

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
      >
        <section className="form__section">
          <input
            name="name"
            type="text"
            placeholder="Имя"
            defaultValue="Невведённое имя"
            className="popup__text popup__text_type_name"
            required
            minLength="2"
            maxLength="40" />
          <span className="popup__text-error" id="name-error"></span>
        </section>
        <section className="form__section">
          <input
            name="about"
            type="text"
            placeholder="Статус"
            defaultValue="Невведённый статус"
            className="popup__text popup__text_type_status"
            required
            minLength="2"
            maxLength="40" />
          <span className="popup__text-error" id="status-error"></span>
        </section>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isAddPlacePopupOpen}
        name="addcard"
        title="Новое место"
        buttonText="Создать"
      >
        <section className="form__section">
          <input
            name="name"
            type="text"
            placeholder="Название"
            className="popup__text popup__text_type_place"
            required
            minLength="2"
            maxLength="30" />
          <span className="popup__text-error" id="nameplace-error"></span>
        </section>
        <section className="form__section">
          <input
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__text popup__text_type_url"
            required />
          <span className="popup__text-error" id="url-error"></span>
        </section>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        isOpen={isEditAvatarPopupOpen}
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
      >
        <section className="form__section">
          <input
            name="avatarLink"
            type="url"
            placeholder="Ссылка на новый аватар"
            className="popup__text popup__text_type_url"
            required />
          <span className="popup__text-error" id="avatarLink-error"> </span>
        </section>
      </PopupWithForm>

      <PopupWithForm
        onClose={closeAllPopups}
        name="trash"
        title="Вы уверены?"
        buttonText="Да"
      >
      </PopupWithForm>

      <ImagePopup
        onClose={closeAllPopups}
        isOpen={isImagePopupOpen}
        card={selectedCard}
      />

    </div>

  );
}

export default App;
