import React from 'react';

function ImagePopup(props) {
    console.log(props.card.name)
    return (
        <div className={`popup view-card ${props.isOpen && 'popup_opened'}`}>
            <div className="view-card__container">
                <button onClick={props.onClose} className="popup__close-btn popup__close-btn_view" type="reset" aria-label="Закрыть попап" ></button>
                <img src={props.card.link} alt={props.card.name} className="view-card__image" />
                <h3 className="view-card__heading">{props.card.name}</h3>
            </div>
        </div>

    );
}

export default ImagePopup;