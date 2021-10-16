import React from 'react'
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DelPopup from './DelPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cardForDelete, setCardForDelete] = React.useState({})
  const [cards, setCards] = React.useState([]);

  const [isDelPopupOpen, setIsDelPopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });

  React.useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([user, data]) => {
        setCurrentUser(user);
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(el) {
    el.preventDefault();
    api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards(cards.filter(c => c._id !== cardForDelete._id))
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  const handleUpdateUser = (data) => {
    api.editUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleUpdateAvatar = (data) => {
    api.editAvatar(data.avatarLink)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(err);
      })
  }

  const handleAddPlaceSubmit = (newCard) => {
    api.addNewCard(newCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups()
      })
      .catch(err => {
        console.error(err)
      })
  }


  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    setIsDelPopupOpen(true);
  }

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
    setIsDelPopupOpen(false);
    setSelectedCard({ name: '', link: '' })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header />
        <Main
          onCardDeleteRequest={handleCardDeleteRequest}
          onCardLike={handleCardLike}
          cards={cards}

          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleClick}
        />
        <Footer />

        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar} />

        <DelPopup
          isOpen={isDelPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete} />

        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
          card={selectedCard}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
