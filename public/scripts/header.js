
/**
 * 
 * @param {HTMLElement} header 
 * @param {object} args 
 */
export const useHeader = (
  header,
  {
    onBtnClick,
  }
) => {
  const headerButtons = header.getElementsByClassName("button");

  for (let i = 0; i < headerButtons.length; i++) {
    headerButtons
      .item(i)
      .addEventListener('click', onBtnClick);
  }
}