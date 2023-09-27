//@ts-check

import { getDataFromEvent } from "../utils.js";

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

/** @param {HTMLDialogElement} dialog */
const close = (dialog) => dialog.close();

/** @param {HTMLDialogElement} dialog */
const showModal = (dialog) => dialog.showModal();

/**
 * Creates a context for the dialog.
 * @param {HTMLElement | HTMLDialogElement | null} dialog 
 * @param {UseDialogArgs} args
 * @returns {DialogHandler | undefined}
 */
export const useDialog = (dialog, {
  onOk,
  onClear
} = {}) => {

  if (!dialog) return;
  if (!(dialog instanceof HTMLDialogElement)) return;

  /** @param {MouseEvent} event */
  const handleOnClick = (event) => {
    const eventData = getDataFromEvent(event);
    switch (eventData.currentTargetAction) {
      case DIALOG_ACTIONS.close: {
        close(dialog);
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

  // Add listeners to all buttons inside the dialog
  [...dialog.getElementsByTagName("button")]
    .forEach(element => {
      element.addEventListener("click", handleOnClick);
    });

  return {
    dialog,
    showModal: () => showModal(dialog),
    close: () => close(dialog),
    onOk: (handler) => { onOk = handler },
    onClear: (handler) => { onClear = handler },
  };
};