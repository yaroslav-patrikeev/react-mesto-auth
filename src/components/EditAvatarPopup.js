import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  React.useEffect(() => {
    resetForm();
  }, [isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: values["avatar"],
    });
  };

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    handleChange(evt);
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
      <input
        name="avatar"
        type="url"
        id="input-avatar-link"
        className={`popup__input popup__input_field_change-avatar ${
          errors["avatar"] && "popup__input_type_error"
        }`}
        placeholder="Ссылка на новый аватар"
        value={values["avatar"] || ""}
        onInput={handleInputChange}
        required
      />
      <span
        id="input-avatar-link-error"
        className={`popup__error ${errors["avatar"] && "popup__error_visible"}`}
      >
        {errors["avatar"]}
      </span>
    </PopupWithForm>
  );
}
