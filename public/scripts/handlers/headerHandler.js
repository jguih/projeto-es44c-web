//@ts-check

/**
 * @typedef {object} useHeaderArgs
 * @prop {(event: Event) => void} [onButtonClick]
 */

/**
 * @typedef {object} HeaderHandler
 * @prop {HTMLElement} header
 * @prop {(handler: ((event: Event) => void)) => void} onButtonClick
 */

/**
 * Creates a context for the header element.
 * @param {HTMLElement | null} header - Header HTML Element
 * @param {useHeaderArgs} args - Optional arguments
 * @returns {HeaderHandler | undefined}
 */
export const useHeader = (header, {
  onButtonClick,
} = {}) => {

  if (!header) return;
  if (!(header instanceof HTMLElement)) return;

  const headerButtons = header.getElementsByClassName("button");

  // Add click event listeners for all buttons inside the header
  [...headerButtons].forEach((btn) => {
    const isBtn = btn instanceof HTMLButtonElement;
    if (isBtn)
      btn.addEventListener(
        "click",
        (event) => onButtonClick?.(event)
      );
  })

  /** @param {(event: Event) => void} handler */
  const setOnButtonClick = (handler) => {
    onButtonClick = handler;
  }

  return {
    header,
    onButtonClick: setOnButtonClick,
  }
}