//@ts-check

/**
 * @typedef {object} useFormArgs
 * @prop {(data: any) => void} [onSubmit]
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
 * @typedef {object} Style
 * @prop {string[]} classList
 */

/**
 * @typedef {object} LabelProps
 * @prop {Style} [style]
 * @prop {string} [label]
 */

/**
 * @typedef {object} InputProps
 * @prop {Style} [style]
 * @prop {string} [name]
 * @prop {string} id
 * @prop {string} [type]
 * @prop {boolean} [required]
 */

/**
 * @typedef {object} PProps
 * @prop {Style} [style]
 */

/**
 * @typedef {object} FormField
 * @prop {"input" | "textarea"} element
 * @prop {LabelProps} labelProps
 * @prop {InputProps} inputProps
 * @prop {PProps} pProps
 */

/**
 * @typedef {object} RenderedFieldData
 * @prop {FormField} field
 * @prop {HTMLLabelElement} renderedField
 * @prop {HTMLInputElement | HTMLTextAreaElement} input
 * @prop {HTMLParagraphElement} pError
 * @prop {() => string} getValue
 */

/** 
 * @param {FormField} field 
 * @returns {HTMLInputElement}
 */
const createInput = (field) => {
  const {inputProps} = field;
  const input = document.createElement("input");
  input.type = inputProps.type ?? "";
  input.name = inputProps.name ?? "";
  input.id = inputProps.id ?? "";
  input.required = inputProps.required ?? false;
  input.classList.add("input");
  return input;
}

/** 
 * @param {FormField} field 
 * @returns {HTMLLabelElement}
 */
const createLabel = (field) => {
  const {labelProps} = field;
  const label = document.createElement("label");
  label.classList.add("label");
  label.innerText = labelProps.label ?? "";
  return label;
}

/** 
 * @param {FormField} field 
 * @returns {HTMLParagraphElement}
 */
const createParagraph = (field) => {
  const p = document.createElement("p");
  p.classList.add("field-error");
  return p;
}

/** 
 * @param {FormField} field 
 * @returns {HTMLTextAreaElement}
 */
const createTextarea = (field) => {
  const {inputProps} = field;
  const textarea = document.createElement("textarea");
  textarea.classList.add("textarea");
  textarea.id = inputProps.id ?? "";
  textarea.name = inputProps.name ?? "";
  textarea.required = inputProps.required ?? false;
  return textarea;
}

/** 
 * @param {FormField} field 
 * @returns {RenderedFieldData}
 */
const createField = (field) => {
  const label = createLabel(field);
  /** @type {HTMLInputElement | HTMLTextAreaElement} */
  let input;
  if (field.element === "textarea") {
    input = createTextarea(field);
  } else {
    input = createInput(field);
  }
  const p = createParagraph(field);

  label.appendChild(input);
  label.appendChild(p);

  return {
    field: field,
    renderedField: label,
    input: input,
    pError: p,
    getValue: () => input.value,
  };
}

/**
 * @param {HTMLFormElement} form
 * @param {FormField[]} fields
 */
const render = (form, fields) => {
  const fieldData = fields.map(createField);
  fieldData.forEach((data) => {
    form.appendChild(data.renderedField);
  })
  return fieldData;
}

/**
 * 
 * @param {RenderedFieldData} renderedFieldData 
 * @returns {string}
 */
const getValidationMessage = (renderedFieldData) => {
  const { input, field } = renderedFieldData;

  if (input.validity.valueMissing) {
    return "Field required";
  }
  if (input.validity.badInput) {
    return "Bad input";
  }
  if (input.validity.patternMismatch) {
    return "Wrong format";
  }

  return "";
}

/**
 * 
 * @param {RenderedFieldData[]} renderedFields 
 */
const configureInputListeners = (renderedFields) => {
  renderedFields.forEach((renderedFieldData) => {
    const { input, pError } = renderedFieldData;

    input.addEventListener("input", (event) => {
      pError.innerText = getValidationMessage(renderedFieldData);
    });

    input.addEventListener("invalid", (event) => {
      pError.innerText = getValidationMessage(renderedFieldData);
    });

    input.addEventListener("blur", (event) => {
      pError.innerText = getValidationMessage(renderedFieldData);
    });
  })
}

/**
 * @param {HTMLElement | HTMLFormElement | null} form 
 * @param {FormField[]} fields
 * @param {useFormArgs} args
 * @returns
 */
export const useForm = (form, fields, {
  onSubmit,
  preventDefault = true,
} = {}) => {

  if (!form) return;
  if (!(form instanceof HTMLFormElement)) return;
  if (!fields) return;

  form.noValidate = true;
  const renderedFieldsData = render(form, fields);
  configureInputListeners(renderedFieldsData);

  const submit = () => form.requestSubmit();
  const reset = () => form.reset();

  /** @param {SubmitEvent} event */
  const handleOnSubmit = (event) => {
    if (preventDefault) event.preventDefault();
    const valid = form.checkValidity();
    if (valid) {
      let formData = {};
      renderedFieldsData
        .forEach((data) => {
          formData[data.input.name] = data.getValue();
        })
      onSubmit?.(formData);
    }
  };

  form.addEventListener("submit", handleOnSubmit);

  return {
    form,
    submit: () => submit(),
    reset: () => reset(),
  }
}