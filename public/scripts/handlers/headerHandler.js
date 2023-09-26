//@ts-check

/**
 * @typedef {object} useHeaderArgs
 * @prop {(event: Event) => void} [onBtnClick]
 */

/**
 * @typedef {object} HeaderHandler
 * @prop {HTMLElement} header
 */

/**
 * Used to manipulate app's header
 * @param {HTMLElement | null} header - Header HTML Element
 * @param {useHeaderArgs} args - Optional arguments
 * @returns {HeaderHandler | undefined}
 */
export const useHeader = (header, {
  onBtnClick,
} = {}) => {

  if (!header) return;
  if (!(header instanceof HTMLElement)) return;

  const headerButtons = header.getElementsByClassName("button");
  [...headerButtons].forEach((btn) => {
    const isBtn = btn instanceof HTMLButtonElement;
    if (isBtn)
      btn.addEventListener(
        "click",
        (event) => onBtnClick?.(event)
      );
  })

  return {
    header,
  }
}