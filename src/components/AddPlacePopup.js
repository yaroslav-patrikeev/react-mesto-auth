import React from "react";
import PopupWithForm from "./PopupWithForm";
export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  buttonText,
}) {
  const titleRef = React.useRef();
  const linkRef = React.useRef();
  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ title: titleRef.current.value, link: linkRef.current.value });
  };
  const [titleError, setTitleError] = React.useState("");
  const [linkError, setLinkError] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const changeIsValid = () => {
    if (titleRef.current.validity.valid && linkRef.current.validity.valid)
      setIsValid(true);
    else setIsValid(false);
  };
  const handleInputTitleChange = () => {
    setTitleError(titleRef.current.validationMessage);
    changeIsValid();
  };
  const handleInputLinkChange = () => {
    setLinkError(linkRef.current.validationMessage);
    changeIsValid();
  };

  React.useEffect(() => {
    titleRef.current.value = "";
    linkRef.current.value = "";
    setIsValid(false);
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        id="input-title"
        className={`popup__input popup__input_field_first ${
          titleError !== "" && "popup__input_type_error"
        }`}
        minLength="2"
        maxLength="30"
        placeholder="Название"
        ref={titleRef}
        onInput={handleInputTitleChange}
        required
      />
      <span
        id="input-title-error"
        className={`popup__error ${
          titleError !== "" && "popup__error_visible"
        }`}
      >
        {titleError}
      </span>
      <input
        type="url"
        id="input-link"
        className={`popup__input popup__input_field_second ${
          linkError !== "" && "popup__input_type_error"
        }`}
        placeholder="Ссылка на картинку"
        ref={linkRef}
        onInput={handleInputLinkChange}
        required
      />
      <span
        id="input-link-error"
        className={`popup__error ${linkError !== "" && "popup__error_visible"}`}
      >
        {linkError}
      </span>
    </PopupWithForm>
  );
}
