import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button type="reset" onClick={props.onClose} aria-label="Закрыть окно" className="popup__close-btn"></button>
                <h2 className="popup__heading">{props.title}</h2>
                <form name="form" action="#" method="POST" className={`form form_type_${props.name}`} name={props.name} novalidate>
                    {props.children}
                </form>
            </div>
        </div>

    );
}

export default PopupWithForm;
