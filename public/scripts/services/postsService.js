//@ts-check

import { LocalStorageService } from "./localStorageService.js"

/**
 * @typedef {object} Post
 * @prop {number} id
 * @prop {string} title
 * @prop {string} date
 * @prop {string} [description]
 */

export const PostsService = () => {

  const {
    setItem,
    getItem,
    clear,
    getAll: lsGetAll,
  } = LocalStorageService();

  const getId = () => {
    const id = getItem("post-ids");
    if (id) {
      const newId = Number.parseInt(id) + 1;
      setItem("post-ids", `${newId}`);
    } else {
      setItem("post-ids", "1");
      return "0";
    }
    return id;
  }

  /**
   *  
   * @param {any} data 
   * @returns {Post | undefined}
   */
  const create = (data) => {
    if (!data) return;
    if (!data["title"]) return;
    if (!data["date"]) return;
    /** @type {Post} */
    const newPost = {
      id: Number.parseInt(getId()),
      title: data["title"],
      date: data["date"],
      description: data["description"] ?? "",
    }
    return newPost;
  }

  /**
   * 
   * @param {Post} post 
   * @returns {boolean}
   */
  const insert = (post) => {
    try {
      setItem(post.id.toString(), JSON.stringify(post));
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * 
   * @param {any} data
   * @returns {boolean} 
   */
  const createAndInsert = (data) => {
    const newPost = create(data);
    if (newPost) return insert(newPost);
    return false;
  }

  /** @param {string} key */
  const get = (key) => {
    return getItem(key);
  }

  const getAll = () => {
    return lsGetAll({excludeKey: "post-ids"});
  }

  return {
    create,
    insert,
    createAndInsert,
    getAll,
  }
}