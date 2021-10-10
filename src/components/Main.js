import React from 'react';
import Card from './Card';
import api from '../utils/api'

function Main(props) {

  const onEditAvatar = () => {
    props.onEditAvatar();
  }

  const onEditProfile = () => {
    props.onEditProfile();
  }

  const onAddPlace = () => {
    props.onAddPlace();
  }

  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState('Исследователь океана');
  const [userAvatar, setUserAvatar] = React.useState("Аватарка");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {

    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([user, data]) => {
        setUserName(user.name);
        setUserDescription(user.about);
        setUserAvatar(user.avatar);
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="page">
      <section className="profile">

        <div className="profile__avatar">
        <img className="avatar" src={userAvatar} alt="Аватарка" />
          <button onClick={onEditAvatar} type="button" className="button-ava"></button>
        </div>

        <div className="profile-info">
          <div className="profile-info__block">
            <h1 className="profile-info__name">{userName}</h1>
            <button onClick={onEditProfile} type="button" className="profile-info__edit-button"></button>
          </div>
          <p className="profile-info__status">{userDescription}</p>
        </div>
        <button onClick={onAddPlace} type="button" className="add-button"></button>
      </section>

      <section className="photo-grid">
        {cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} />
        ))}
      </section>


    </main>

  )
}
export default Main;