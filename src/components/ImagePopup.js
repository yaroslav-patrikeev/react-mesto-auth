import { usePopupClose } from "../hooks/usePopupClose";

export default function ImagePopup({ card, onClose }) {
  usePopupClose(card?.link, onClose);
  return (
    <section
      className={`popup popup_image ${
        JSON.stringify(card) !== "{}" && "popup_opened"
      }`}
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
