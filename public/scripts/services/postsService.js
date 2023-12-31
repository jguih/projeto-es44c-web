//@ts-check

import { LocalStorageService } from "./localStorageService.js"

/**
 * @typedef {object} Post
 * @prop {number} id
 * @prop {string} title
 * @prop {string} date
 * @prop {string} [description]
 */

/**
 * @typedef {object} NewPost
 * @prop {string} title
 * @prop {string} date
 * @prop {string} [description]
 */

export class PostsService {

  /** @type {((data: Post[]) => void)[]} */
  static onChangeListeners = [];
  /** @type {Post[]} */
  static posts;
  
  /** @param {LocalStorageService} lsService */ 
  constructor(lsService) {
    this.lsService = lsService;
    this.posts = this.getAll();
  }

  getAll() {
    let data = this.lsService.getAll({ type: "post" });

    /** @type {Post[]} */
    const parsedData = [];

    data.forEach((data) => {
      try {
        const parsedItem = data ? JSON.parse(data) : null;
        parsedItem && parsedData.push(parsedItem);
      } catch (err) { }
    });

    return parsedData;
  }

  getId() {
    const id = this.lsService.getItem("id-generator", "0");
    if (id) {
      const newId = Number.parseInt(id) + 1;
      this.lsService.setItem("id-generator", "0", `${newId}`);
    } else {
      this.lsService.setItem("id-generator", "0", "1");
      return "0";
    }
    return id;
  }

  /**
   *  
   * @param {NewPost} post 
   * @returns {Post | undefined}
   */
  create(post) {
    if (!post) return;
    try {
      /** @type {Post} */
      const newPost = {
        id: Number.parseInt(this.getId()),
        title: post.title,
        date: post.date,
        description: post.description ?? "",
      }
      return newPost;
    } catch (err) {
      return;
    }
  }

  /**
   * 
   * @param {Post} post 
   * @returns {boolean}
   */
  insert(post) {
    try {
      this.lsService
        .setItem(
          "post",
          post.id.toString(),
          JSON.stringify(post)
        );
      this.posts = this.getAll();
      PostsService.onChangeListeners
        .forEach((listener) => listener(this.posts));
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * 
   * @param {NewPost} data
   * @returns {boolean} 
   */
  createAndInsert(data) {
    const newPost = this.create(data);
    return newPost ? this.insert(newPost) : false;
  }

  /** @param {string} id */
  delete(id) {
    const key = this.lsService.createKey("post", id);
    try {
      this.lsService.delete(key);
      this.posts = this.getAll();
      PostsService.onChangeListeners
        .forEach((listener) => listener(this.posts));
    } catch (err) { 
      console.log(err); 
    }
  }

  /**
   * @param {(data: Post[]) => void} listener
   */
  addOnChangeListener(listener) {
    PostsService.onChangeListeners.push(listener);
  }
}