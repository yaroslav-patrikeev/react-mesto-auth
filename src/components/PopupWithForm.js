import React from "react";

export default function PopupWithForm({
  name,
  title,
  children,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  isValid,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}
      onClick={(evt) => {
        if (
          evt.target.classList.contains("popup_opened") ||
          evt.target.classList.contains("popup__close")
        ) {
          return onClose();
        }
      }}
    >
      <form
        name={name}
        className="popup__container"
        onSubmit={onSubmit}
        noValidate
      >
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close popup__close_place_forms button-hover"
        ></button>
        <div className="popup__content">
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__button ${!isValid && "popup__button_inactive"}`}
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </section>
  );
}
