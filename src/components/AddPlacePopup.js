import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
export default function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlace,
  buttonText,
}) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();
  useEffect(() => {
    resetForm();
  }, [isOpen]);
  const handleAddPlaceSubmit = (evt) => {
    evt.preventDefault();
    onAddPlace({ title: values["title"], link: values["link"] });
  };
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    handleChange(evt);
  };

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
        name="title"
        id="input-title"
        className={`popup__input popup__input_field_first ${
          errors["title"] && "popup__input_type_error"
        }`}
        minLength="2"
        maxLength="30"
        placeholder="Название"
        onInput={handleInputChange}
        value={values["title"] || ""}
        required
      />
      <span
        id="input-title-error"
        className={`popup__error ${errors["title"] && "popup__error_visible"}`}
      >
        {errors["title"]}
      </span>
      <input
        type="url"
        name="link"
        id="input-link"
        className={`popup__input popup__input_field_second ${
          errors["link"] && "popup__input_type_error"
        }`}
        placeholder="Ссылка на картинку"
        onInput={handleInputChange}
        value={values["link"] || ""}
        required
      />
      <span
        id="input-link-error"
        className={`popup__error ${errors["link"] && "popup__error_visible"}`}
      >
        {errors["link"]}
      </span>
    </PopupWithForm>
  );
}
