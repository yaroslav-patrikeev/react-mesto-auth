import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  buttonText,
}) {
  const currentUser = useContext(CurrentUserContext);
  const nameRef = React.useRef();
  const descriptionRef = React.useRef();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [nameError, setNameError] = React.useState("");
  const [descriptionError, setDescriptionError] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const changeIsValid = () => {
    if (nameRef.current.validity.valid && descriptionRef.current.validity.valid)
      setIsValid(true);
    else setIsValid(false);
  };
  React.useEffect(() => {
    const { name, about } = currentUser;
    if (!name || !about) return;
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  };

  const handleInputNameChange = (evt) => {
    setName(evt.target.value);
    setNameError(evt.target.validationMessage);
    changeIsValid();
  };
  const handleInputDescriptionChange = (evt) => {
    setDescription(evt.target.value);
    setDescriptionError(evt.target.validationMessage);
    changeIsValid();
  };
  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        id="input-name"
        className={`popup__input popup__input_field_first ${
          nameError !== "" && "popup__input_type_error"
        }`}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={name}
        onInput={handleInputNameChange}
        ref={nameRef}
        required
      />
      <span
        id="input-name-error"
        className={`popup__error ${nameError !== "" && "popup__error_visible"}`}
      >
        {nameError}
      </span>
      <input
        type="text"
        id="input-about"
        className={`popup__input popup__input_field_second ${
          descriptionError !== "" && "popup__input_type_error"
        }`}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={description}
        onInput={handleInputDescriptionChange}
        ref={descriptionRef}
        required
      />
      <span
        id="input-about-error"
        className={`popup__error ${
          descriptionError !== "" && "popup__error_visible"
        }`}
      >
        {descriptionError}
      </span>
    </PopupWithForm>
  );
}
