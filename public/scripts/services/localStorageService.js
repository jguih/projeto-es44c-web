//@ts-check

export class LocalStorageService {

  constructor() {}

  /**
   * 
   * @param {string} type 
   * @param {string} id 
   * @returns 
   */
  createKey = (type, id) => {
    return JSON.stringify({
      type,
      id,
    });
  }

  /**
   * 
   * @param {string} type
   * @param {string} id 
   * @param {string} value 
   * @returns {void}
   */
  setItem = (type, id, value) => {
    localStorage.setItem(this.createKey(type, id), value);
  }

  /**
   * 
   * @param {string} type
   * @param {string} id  
   * @returns {string | null}
   */
  getItem = (type, id) => {
    return localStorage.getItem(this.createKey(type, id));
  }

  clear = () => localStorage.clear();

  /**
   * 
   * @param {{
   * type?: string
   * }} [args]  
   */
  getAll = ({ type } = {}) => {
    const values = [];

    [...Object.keys(localStorage)]
      .forEach((key) => {
        const parsedKey = JSON.parse(key);
        if (parsedKey && parsedKey.type === type) {
          values.push(localStorage.getItem(key));
        }
      });

    return values;
  }

  /**
   * @param {string} key
   */
  delete = (key) => localStorage.removeItem(key);
}