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
 * 
 * @param {HTMLElement} header - Header HTML Element
 * @param {useHeaderArgs} args - Optional arguments
 * @returns {HeaderHandler}
 */
export const useHeader = (header, { 
  onBtnClick, 
} = {}) => {
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