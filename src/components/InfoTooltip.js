import "./styles/InfoTooltip.css";
import successImage from "../images/success.svg";
import errorImage from "../images/error.svg";
import { usePopupClose } from "../hooks/usePopupClose";

export default function InfoTooltip({ onSubmit, isOpen, onClose }) {
  usePopupClose(isOpen, onClose);
  return (
    <section className={`popup ${onSubmit && "popup_opened"}`}>
      <button className="popup__close popup__close_place_forms button-hover"></button>
      <div className="popup__container info-tooltip__container">
        <img
          src={onSubmit === "success" ? successImage : errorImage}
          alt={onSubmit === "success" ? "успешно" : "ошибка"}
          className="info-tooltip__image"
        />

        <h2 className="info-tooltip__title">
          {onSubmit === "success"
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </section>
  );
}
