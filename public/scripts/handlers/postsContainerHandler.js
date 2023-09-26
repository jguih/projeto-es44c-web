//@ts-check

import { formatDate } from "../services/dateService.js";
import { PostsService } from "../services/postsService.js";

/**
 * 
 * @param {import("../services/postsService.js").Post} post 
 */
const createDeleteIcon = (post) => {
  const span = document.createElement("span");
  span.classList.add("material-symbols-outlined");
  span.innerText = "delete";
  return span;
}

/**
 * 
 * @param {import("../services/postsService.js").Post} post 
 */
const createArticle = (post) => {
  const article = document.createElement("article");
  article.classList.add("post");
  article.id = `${post.title}_${post.id}`;
  return article;
}

/**
 * 
 * @param {import("../services/postsService.js").Post} post 
 * @param {PostsService} postsService
 */
const createDeleteButton = (post, postsService) => {
  const icon = createDeleteIcon(post);
  const button = document.createElement("button");
  button.classList.add("post-delete-btn");
  button.appendChild(icon);

  button.addEventListener("click", (event) => {
    postsService.delete(post.id.toString());
  })
  
  return button;
}

/**
 * 
 * @param {import("../services/postsService.js").Post} post 
 * @param {"date" | "description"} type
 */
const createP = (post, type) => {
  const p = document.createElement("p");
  switch (type) {
    case "date": {
      p.classList.add("post-date");
      try {
        const date = formatDate(new Date(post.date));
        p.innerText = date;
      } catch (err) {
        console.log(err);
      }
      break;
    }
    case "description": {
      p.classList.add("post-description");
      p.innerText = post.description ?? "";
      break;
    }
  }
  return p;
}

/**
 * 
 * @param {import("../services/postsService.js").Post} post 
 * @param {"title"} type
 */
const createH3 = (post, type) => {
  const h3 = document.createElement("h3");
  switch (type) {
    case "title": {
      h3.classList.add("post-title");
      h3.innerText = post.title;
      break;
    }
  }
  return h3;
}

/** 
 * @param {import("../services/postsService.js").Post[]} postsData 
 * @param {PostsService} postsService
 */
const createPosts = (postsData, postsService) => {
  const posts = postsData.map((pdata) => {
    const post = createArticle(pdata);
    const deleteButton = createDeleteButton(pdata, postsService);
    const pTitle = createH3(pdata, "title");
    const pDate = createP(pdata, "date");
    const pDescription = createP(pdata, "description");
    post.appendChild(deleteButton);
    post.appendChild(pTitle);
    post.appendChild(pDate);
    post.appendChild(pDescription);
    return post;
  });
  return posts;
}

/**
 * 
 * @param {import("../services/postsService.js").Post[]} posts 
 * @returns {import("../services/postsService.js").Post[]}
 */
const sortPosts = (posts) => {
  return posts
    .sort((a, b) => {
      if (a.id < b.id) return 1;
      if (a.id > b.id) return -1;
      return 0;
    });
}

/**
 * 
 * @param {HTMLElement} parent 
 * @param {HTMLElement[]} posts 
 */
const renderPosts = (parent, posts) => 
  posts.forEach((post) => parent.appendChild(post));

/**
 * 
 * @param {HTMLElement} parent 
 * @param {import("../services/postsService.js").Post[]} postsData
 * @param {PostsService} postsService 
 */
const render = (parent, postsData, postsService) => {
  // Clear parent node
  [...parent.childNodes].forEach((node) => parent.removeChild(node));
  let posts = createPosts(sortPosts(postsData), postsService);
  renderPosts(parent, posts);
  return posts;
}

/**
 * Posts will be created inside the container as the example.
 * @param {HTMLElement | null} postsContainer - Parent container where the posts will be inserted.
 * @example
 * ```html
 * <article class="post" id="mypost">
 *   <button class="post-delete-btn">
 *     <span class="material-symbols-outlined">
 *       delete
 *     </span>
 *   </button>
 *   <h3 class="post-title">First post</h3>
 *   <p class="post-date">Sep 25, 2023</p>
 *   <p class="post-description">This is an example description</p>
 * </article> 
 * ```
 */

/**
 * 
 * @param {HTMLElement | null} postsContainer 
 * @param {PostsService} postsService 
 * @returns 
 */
export const usePostsContainer = (postsContainer, postsService) => {
  if (!postsContainer) return;
  if (!(postsContainer instanceof HTMLElement)) return;

  let renderedPosts = render(
    postsContainer, 
    postsService.posts, 
    postsService);

  postsService.addOnChangeListener((data) => {
    renderedPosts = render(postsContainer, data, postsService);
  });

  return {
    parent: postsContainer,
    rendered: renderedPosts,
  }
}