import React from 'react';

function Card(props) {
  
  function handleClick() {
    props.onCardClick(props.card);
  }
    return (
        <article className="card">
          <button type="button" className=" card__button trash-button"></button>
          <img onClick={handleClick} className="card__image" src={props.card.link} alt={props.card.name} />
          <div className="card__under-line">
            <h2 className="card__text">{props.card.name}</h2>
            <div className="hart-container">
              <button type="button" className="card__button hart-button"></button>
              <p className="hart-counter">{props.card.likes.length}</p>
            </div>
          </div>
        </article>
      )
  }
  
  export default Card;