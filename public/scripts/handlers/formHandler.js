//@ts-check

import { getField } from "../utils.js";

/**
 * @typedef {object} useFormArgs
 * @prop {(data: FieldData[]) => void} [onSubmit]
 * @prop {boolean} [preventDefault=true]
 * 
 */

/**
 * @typedef {object} FormHandler
 * @prop {HTMLFormElement} form
 * @prop {() => void} submit
 * @prop {() => void} reset
 */

/**
 * @typedef {object} FormField
 * @prop {string} [name]
 */

/**
 * @typedef {object} FieldData
 * @prop {string} name
 * @prop {HTMLInputElement | HTMLTextAreaElement} field
 * @prop {() => string} getValue
 */

/**
 * Returns a string based on Input/TextArea validation status.
 * @param {HTMLInputElement | HTMLTextAreaElement} field 
 * @returns {string}
 */
const getValidationMessage = (field) => {

  if (field.validity.valueMissing) {
    return "Field required";
  }
  if (field.validity.badInput) {
    return "Bad input";
  }
  if (field.validity.patternMismatch) {
    return "Wrong format";
  }

  return "";
}

/**
 * Configure validation for each field.
 * @param {HTMLInputElement | HTMLTextAreaElement} field 
 * @param {Element | null} errorField
 */
const configureFieldValidationListeners = (field, errorField) => {
  if (!errorField || !(errorField instanceof HTMLParagraphElement)) return;

  field.addEventListener('input', (event) => {
    errorField.innerText = getValidationMessage(field);
  })

  field.addEventListener('invalid', (event) => {
    errorField.innerText = getValidationMessage(field);
  })

  field.addEventListener('blur', (event) => {
    errorField.innerText = getValidationMessage(field);
  })

}

/**
 * Gets data from Input or TextArea element.
 * @param {HTMLInputElement | HTMLTextAreaElement} field 
 * @return {FieldData}
 */
const getFieldData = (field) => {
  return {
    name: field.name,
    field: field,
    getValue: () => field.value,
  }
}

/**
 * Gets data from every Input and TextArea elements inside the form.
 * @param {HTMLFormElement} form
 * @param {FormField[]} fields 
 * @returns {FieldData[]}
 */
const registerFields = (form, fields) => {
  /** @type {FieldData[]} */
  const fieldsData = [];

  fields.forEach((field) => {
    const { name } = field;
    const formField = name ? form[name] : undefined;
    const validFormField =
      formField instanceof HTMLInputElement ||
      formField instanceof HTMLTextAreaElement;

    if (validFormField) {
      fieldsData.push(getFieldData(formField));
      configureFieldValidationListeners(
        formField, formField.nextElementSibling
      );
    }
  });

  return fieldsData;
}

/** @param {HTMLFormElement} form */
const requestSubmit = (form) => form.requestSubmit();
/** @param {HTMLFormElement} form */
const reset = (form) => form.reset();
/**
 * 
 * @param {FieldData[]} fieldsData 
 * @param {string} fieldName 
 */
const getFieldFromFieldsData = (fieldsData, fieldName) => 
  getField(fieldsData, fieldName);

/**
 * This function expects the form to be structured as the example.
 * Any field error will be displayed in a paragraph below the input.
 * @param {HTMLElement | HTMLFormElement | null} form - Form element
 * @param {FormField[]} fields - Array of data for each form field
 * @param {useFormArgs} args - Optional arguments
 * @example
 * <label class="label">
 *    Title
 *    <input name="title" type="text" class="input" required/>
 *    <p class="field-error"></p>
 * </label>
 * @returns
 */
export const useForm = (form, fields, {
  onSubmit,
  preventDefault = true,
} = {}) => {

  if (!form) return;
  if (!(form instanceof HTMLFormElement)) return;
  if (!fields) return;

  // Disabled HTML standard validation
  form.noValidate = true;

  const fieldsData = registerFields(form, fields);

  /** @param {SubmitEvent} event */
  const handleOnSubmit = (event) => {
    if (preventDefault) event.preventDefault();
    const valid = form.checkValidity();
    if (valid) {
      onSubmit?.(fieldsData);
    }
  };

  form.addEventListener("submit", handleOnSubmit);

  /** @param {((data: FieldData[]) => void) | undefined} handler */
  const setOnSubmit = (handler) => {
    onSubmit = handler;
  }

  /** @param {string} fieldName */
  const getField = (fieldName) => 
    getFieldFromFieldsData(fieldsData, fieldName);

  return {
    form,
    submit: () => requestSubmit(form),
    reset: () => reset(form),
    onSubmit: setOnSubmit,
    getField,
    fieldsData,
  }
}