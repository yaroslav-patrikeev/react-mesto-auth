import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

export default function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  buttonText,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  const currentUser = useContext(CurrentUserContext);
  React.useEffect(() => {
    resetForm();
    const { name, about } = currentUser;
    setValues({ ...values, ["name"]: name, ["description"]: about });
  }, [currentUser, isOpen]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser({
      name: values["name"],
      about: values["description"],
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    handleChange(e);
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
        name="name"
        className={`popup__input popup__input_field_first ${
          errors["name"] && "popup__input_type_error"
        }`}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        value={values["name"] || ""}
        onInput={handleInputChange}
        required
      />
      <span
        id="input-name-error"
        className={`popup__error ${errors["name"] && "popup__error_visible"}`}
      >
        {errors["name"]}
      </span>
      <input
        type="text"
        id="input-about"
        name="description"
        className={`popup__input popup__input_field_second ${
          errors["description"] && "popup__input_type_error"
        }`}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        value={values["description"] || ""}
        onInput={handleInputChange}
        required
      />
      <span
        id="input-about-error"
        className={`popup__error ${
          errors["description"] && "popup__error_visible"
        }`}
      >
        {errors["description"]}
      </span>
    </PopupWithForm>
  );
}
