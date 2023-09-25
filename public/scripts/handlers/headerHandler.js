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

  for (let i = 0; i < headerButtons.length; i++) {
    headerButtons
      .item(i)
      ?.addEventListener('click', (event) => onBtnClick?.(event));
  }

  return {
    header,
  }
}