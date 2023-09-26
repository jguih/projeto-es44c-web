//@ts-check

const commonId = "create-post-form"

/** @type {import ("./handlers/formHandler.js").FormField[]} */
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

    }
  },
]