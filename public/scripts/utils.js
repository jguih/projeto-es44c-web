//@ts-check

/**
 * Finds a field inside fieldsData array and returns it's value
 * @param {import("./handlers/formHandler.js").FieldData[]} fieldsData 
 * @param {string} fieldName 
 * @returns 
 */
export const getFieldValue = (fieldsData, fieldName) => {
  return fieldsData.find((d) => d.name === fieldName)?.getValue();
}

/**
 * Finds a field (Input or TextArea element) inside fieldsData array and returns it
 * @param {import("./handlers/formHandler.js").FieldData[]} fieldsData 
 * @param {string} fieldName 
 */
export const getField = (fieldsData, fieldName) => {
  return fieldsData.find((d) => d.name === fieldName)?.field;
}

/**
 * Creates a new Post from FieldData
 * @param {import("./handlers/formHandler.js").FieldData[]} data
 */
export const getNewPostFromFormData = (data) => {
  const title = getFieldValue(data, "title");
  const date = getFieldValue(data, "date");
  const description = getFieldValue(data, "description");

  if (!title || !date) return;

  /** @type {import("./services/postsService.js").NewPost} */
  const newPost = {
    title: title,
    date: date,
    description: description,
  }

  return newPost;
}

/** 
 * Gets useful data from Event
 * @param {Event} event 
 */
export const getDataFromEvent = (event) => {
  const currentTarget = event.currentTarget;
  const target = event.target;
  const isTargetHTMLElement = target instanceof HTMLElement;
  const isTargetHTMLInputElement = target instanceof HTMLInputElement;
  const targetAction = isTargetHTMLElement ? target.dataset.action : null;
  const isCurrentTargetHTMLElement = 
    currentTarget instanceof HTMLElement;
  const currentTargetAction =
    isCurrentTargetHTMLElement ? currentTarget.dataset.action : null;
  const value = isTargetHTMLInputElement ? target.value : null;

  return {
    target,
    currentTarget,
    isTargetHTMLElement,
    isTargetHTMLInputElement,
    isCurrentTargetHTMLElement,
    currentTargetAction,
    action: targetAction,
    value,
  }
}