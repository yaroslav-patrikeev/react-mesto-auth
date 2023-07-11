import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
}) {
  const avatarRef = React.useRef();
  const [avatarError, setAvatarError] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  };

  React.useEffect(() => {
    avatarRef.current.value = "";
    setIsValid(false);
  }, [isOpen]);

  const handleInputAvatarLink = () => {
    setAvatarError(avatarRef.current.validationMessage);
    changeIsValid();
  };

  const changeIsValid = () => {
    if (avatarRef.current.validity.valid) setIsValid(true);
    else setIsValid(false);
  };
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change-avatar"
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <>
        <input
          type="url"
          id="input-avatar-link"
          className={`popup__input popup__input_field_change-avatar ${
            avatarError !== "" && "popup__input_type_error"
          }`}
          placeholder="Ссылка на новый аватар"
          ref={avatarRef}
          onInput={handleInputAvatarLink}
          required
        />
        <span
          id="input-avatar-link-error"
          className={`popup__error ${
            avatarError !== "" && "popup__error_visible"
          }`}
        >
          {avatarError}
        </span>
      </>
    </PopupWithForm>
  );
}
