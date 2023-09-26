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

  const getAll = ({excludeKey = ""} = {}) => { 
    const values = [];
    const keys = Object.keys(localStorage);
    let i = keys.length;

    while ( i-- ) {
      if (keys[i] !== excludeKey) {
        const item = localStorage.getItem(keys[i]);
        values.push(item);
      }
    }

    return values; 
  }

  return {
    setItem,
    getItem,
    clear,
    getAll,
  }
}