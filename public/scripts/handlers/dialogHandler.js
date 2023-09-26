//@ts-check

export const DIALOG_ACTIONS = {
  open: "dialog-open",
  close: "dialog-close",
  ok: "dialog-ok",
  clear: "dialog-clear",
}

/**
 * @typedef {object} UseDialogArgs
 * @prop {() => void} [onOk] - Called when button with data-dialog-ok is clicked
 * @prop {() => void} [onClear] - Called when button with data-dialog-clear is clicked
 */

/**
 * @typedef {object} DialogHandler
 * @prop {HTMLDialogElement} dialog
 * @prop {() => void} showModal
 * @prop {() => void} close
 * @prop {(handler: () => void) => void} onOk
 * @prop {(handler: () => void) => void} onClear
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

  /** @param {MouseEvent} event */
  const handleOnClick = (event) => {
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

  // Add listeners to buttons inside the dialog
  [...dialog.getElementsByTagName("button")]
    .forEach(element => {
      element.addEventListener("click", handleOnClick);
    });

  return {
    dialog,
    showModal: () => showModal(),
    close: () => close(),
    onOk: (handler) => { onOk = handler },
    onClear: (handler) => { onClear = handler },
  };
};