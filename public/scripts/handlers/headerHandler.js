//@ts-check

/**
 * @typedef {object} useHeaderArgs
 * @prop {(event: Event) => void} [onButtonClick]
 */

/**
 * @typedef {function} EventHandler
 */

/**
 * @typedef {object} HeaderHandler
 * @prop {HTMLElement} header
 * @prop {(handler: ((event: Event) => void)) => void} onButtonClick
 */

/**
 * Used to manipulate app's header
 * @param {HTMLElement | null} header - Header HTML Element
 * @param {useHeaderArgs} args - Optional arguments
 * @returns {HeaderHandler | undefined}
 */
export const useHeader = (header, {
  onButtonClick,
} = {}) => {

  if (!header) return;
  if (!(header instanceof HTMLElement)) return;

  /**
   * @param {(event: any) => void} handler
   */
  const setOnButtonClick = (handler) => {
    onButtonClick = handler;
  };

  const headerButtons = header.getElementsByClassName("button");
  [...headerButtons].forEach((btn) => {
    const isBtn = btn instanceof HTMLButtonElement;
    if (isBtn)
      btn.addEventListener(
        "click",
        (event) => onButtonClick?.(event)
      );
  })

  return {
    header,
    onButtonClick: setOnButtonClick,
  }
}