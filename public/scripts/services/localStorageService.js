//@ts-check

export class LocalStorageService {

  /**
   * 
   * @param {string} type 
   * @param {string} id 
   * @returns 
   */
  static createKey = (type, id) => {
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
  static setItem = (type, id, value) => {
    localStorage.setItem(this.createKey(type, id), value);
  }

  /**
   * 
   * @param {string} type
   * @param {string} id  
   * @returns {string | null}
   */
  static getItem = (type, id) => {
    return localStorage.getItem(this.createKey(type, id));
  }

  static clear = () => localStorage.clear();

  /**
   * 
   * @param {{
   * type?: string
   * }} [args]  
   */
  static getAll = ({ type } = {}) => {
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
}