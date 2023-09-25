//@ts-check

export const POST_FORM_DIALOG_ACTIONS = {
  open: "open-post-form-dialog",
  close: "close-post-form-dialog",
}

/**
 * @typedef {object} PostFormDialogHandler
 * @prop {HTMLDialogElement} dialog
 * @prop {() => void} showModal
 * @prop {() => void} close
 */

/**
 * 
 * @param {HTMLDialogElement} dialog 
 * @returns {PostFormDialogHandler}
 */
export const usePostFormDialog = (dialog) => {

  const close = () => dialog.close();
  const showModal = () => dialog.showModal();

  dialog.addEventListener("click", (event) => {
    var rect = dialog.getBoundingClientRect();
    var isInDialog=(rect.top <= event.clientY && event.clientY <= rect.top + rect.height
      && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        close();
    }
  });

  [...dialog.getElementsByTagName("button")]
    .forEach(element => {
      element.addEventListener("click", (event) => {
        const action = element instanceof HTMLButtonElement ?
          element.dataset.action : undefined;
        if (action === POST_FORM_DIALOG_ACTIONS.close) close();
      })
    });

  return {
    dialog,
    showModal: () => showModal(),
    close: () => close(),
  }
}