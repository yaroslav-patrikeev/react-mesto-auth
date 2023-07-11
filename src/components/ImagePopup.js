export default function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_image ${
        JSON.stringify(card) !== "{}" && "popup_opened"
      }`}
      onClick={(evt) => {
        if (
          evt.target.classList.contains("popup_opened") ||
          evt.target.classList.contains("popup__close")
        ) {
          return onClose();
        }
      }}
    >
      <div className="popup__image-container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close popup__close_place_image button-hover"
        ></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <h2 className="popup__image-title">{card.name}</h2>
      </div>
    </section>
  );
}
