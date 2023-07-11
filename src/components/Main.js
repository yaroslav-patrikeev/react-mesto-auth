import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUserContext = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__change-avatar-button" onClick={onEditAvatar}>
          <img
            src={currentUserContext.avatar}
            alt="Фотография"
            className="profile__photo"
          />
        </div>
        <div className="profile__container">
          <h1 className="profile__name">{currentUserContext.name}</h1>
          <button
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
            className="profile__edit-button button-hover"
          ></button>
        </div>
        <p className="profile__status">{currentUserContext.about}</p>
        <button
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
          className="profile__add-button button-hover"
        ></button>
      </section>
      <ul className="elements elements_position" aria-label="Фотокарточки">
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </ul>
    </main>
  );
}
