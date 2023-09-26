//@ts-check

export const LocalStorageService = () => {
  /**
   * 
   * @param {string} key 
   * @param {string} value 
   * @returns {void}
   */
  const setItem = (key, value) =>
    localStorage.setItem(key, value);

  /**
   * 
   * @param {string} key 
   * @returns {string | null}
   */
  const getItem = (key) =>
    localStorage.getItem(key);

  const clear = () => localStorage.clear();

  return {
    setItem,
    getItem,
    clear
  }
}