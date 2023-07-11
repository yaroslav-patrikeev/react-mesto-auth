import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUserContext = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUserContext._id;
  const isLiked = card.likes.some((i) => i._id === currentUserContext._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;
  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleCardDelete = () => {
    onCardDelete(card);
  };

  return (
    <li className="element">
      <img
        className="element__image"
        alt={card.name}
        onClick={handleCardClick}
        src={card.link}
      />
      {isOwn && (
        <button
          type="button"
          aria-label="Удалить"
          className="element__bin button-hover"
          onClick={handleCardDelete}
        />
      )}
      <div className="element__box-like-title">
        <h2 className="element__title">{card.name}</h2>
        <button
          type="button"
          aria-label="Нравится"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
        <span className="element__like-counter">{card.likes.length}</span>
      </div>
    </li>
  );
}
