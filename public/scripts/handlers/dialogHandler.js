//@ts-check

export const DIALOG_ACTIONS = {
  open: "dialog-open",
  close: "dialog-close",
  ok: "dialog-ok",
  clear: "dialog-clear",
}

/**
 * @typedef {object} UseDialogArgs
 * @prop {() => void} [onOk]
 * @prop {() => void} [onClear]
 */

/**
 * @typedef {object} DialogHandler
 * @prop {HTMLDialogElement} dialog
 * @prop {() => void} showModal
 * @prop {() => void} close
 */

/**
 * Used to manipulate the post creation dialog
 * @param {HTMLElement | null} dialog 
 * @param {UseDialogArgs} args
 * @returns {DialogHandler | undefined}
 */
export const useDialog = (dialog, {
  onOk,
  onClear
} = {}) => {

  if (!dialog) return;
  if (!(dialog instanceof HTMLDialogElement)) return;

  const close = () => dialog.close();
  const showModal = () => dialog.showModal();

  const eventListener = (event) => {
    const target = event.currentTarget;
    const isBtn = target instanceof HTMLButtonElement;
    const action = isBtn ? target.dataset.action : undefined;
    switch (action) {
      case DIALOG_ACTIONS.close: {
        close();
        break;
      }
      case DIALOG_ACTIONS.ok: {
        onOk?.();
        break;
      }
      case DIALOG_ACTIONS.clear: {
        onClear?.();
        break;
      }
    }
  };

  // Closes dialog when clicking outside
  dialog.addEventListener("click", (event) => {
    var rect = dialog.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
      && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
      close();
    }
  });

  // Add listeners to buttons inside the dialog
  [...dialog.getElementsByTagName("button")]
    .forEach(element => {
      element.addEventListener("click", eventListener);
    });

  return {
    dialog,
    showModal: () => showModal(),
    close: () => close(),
  };
};