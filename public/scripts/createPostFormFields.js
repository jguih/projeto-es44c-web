//@ts-check

const commonId = "create-post-form";

/** 
 * Defines all inputs elements for the create post form
 * @type {import ("./handlers/formHandler.js").FormField[]} 
 */
export const createPostFormFields = [
  {
    element: "input",
    inputProps: {
      name: "title",
      id: `${commonId}-title`,
      type: "text",
      required: true,
      style: {
        classList: ["input"],
      },
    },
    labelProps: {
      label: "Title",
    },
    pProps: {
      style: {
        classList: ["field-error"]
      }
    }
  },
  {
    element: "input",
    inputProps: {
      name: "date",
      id: `${commonId}-date`,
      type: "date",
      required: true,
      style: {
        classList: ["input"],
      },
    },
    labelProps: {
      label: "Date",
    },
    pProps: {
      style: {
        classList: ["field-error"]
      }
    }
  },
  {
    element: "textarea",
    inputProps: {
      name: "description",
      id: `${commonId}-description`,
      style: {
        classList: ["textarea"],
      },
    },
    labelProps: {
      label: "Description",
    },
    pProps: {
      style: {
        classList: ["field-error"]
      }
    }
  },
]