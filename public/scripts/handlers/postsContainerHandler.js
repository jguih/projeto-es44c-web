//@ts-check

import { formatDate } from "../services/dateService.js";
import { PostsService } from "../services/postsService.js";

/**
 * @typedef {object} PostsFilter
 * @prop {string} [title]
 */

/**
 * @typedef {object} PostsContainerHandler
 * @prop {HTMLElement} parent
 * @prop {HTMLElement[]} rendered
 * @prop {(filter: PostsFilter) => void} setFilter
 */

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
 * Creates a post's delete button.
 * @param {import("../services/postsService.js").Post} post 
 * @param {PostsService} postsService
 */
const createDeleteButton = (post, postsService) => {
  const icon = createDeleteIcon(post);
  const button = document.createElement("button");
  button.classList.add("post-delete-btn");
  button.appendChild(icon);
  button.ariaLabel = "Delete post";

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
 * Create Posts elements from provided posts data array.
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
 * Filters and sorts post data.
 * @param {import("../services/postsService.js").Post[]} posts 
 * @param {PostsFilter} [filter]
 * @returns {import("../services/postsService.js").Post[]}
 */
const sortAndFilterPostsData = (posts, filter) => {
  // Filter by filter.title
  let filteredPosts =
    filter ? posts.filter((post) => {
      if (!filter.title || filter.title === "") return true;
      const postTitle = post.title.toLowerCase();
      const filterTitle = filter.title.toLowerCase();
      return postTitle.includes(filterTitle);
    }) : posts;

  let sortedPosts =
    filteredPosts.sort((a, b) => {
      if (a.id < b.id) return 1;
      if (a.id > b.id) return -1;
      return 0;
    });

  return sortedPosts;
}

/**
 * Append posts on parent element.
 * @param {HTMLElement} parent 
 * @param {HTMLElement[]} posts 
 */
const renderPosts = (parent, posts) =>
  posts.forEach((post) => parent.appendChild(post));

/**
 * Clear parent node then creates posts and render them.
 * @param {HTMLElement} parent 
 * @param {import("../services/postsService.js").Post[]} postsData
 * @param {PostsService} postsService 
 */
const render = (parent, postsData, postsService) => {
  // Clear parent node
  [...parent.childNodes].forEach((node) => parent.removeChild(node));
  const posts = createPosts(postsData, postsService);
  renderPosts(parent, posts);
  return posts;
}

/**
 * This function creates a context for the specified posts container. Posts will be created inside the container as the example.
 * @param {HTMLElement | null} postsContainer - Parent container where the posts will be inserted. 
 * @param {PostsService} postsService - Instance of PostsService that contains all posts.
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
 * @returns {PostsContainerHandler | undefined}
 */
export const usePostsContainer = (
  postsContainer,
  postsService
) => {
  if (!postsContainer) return;
  if (!(postsContainer instanceof HTMLElement)) return;

  /** @type {PostsFilter} */
  let postsContainerFilter;

  const contextRender = () => 
    render(
      postsContainer,
      sortAndFilterPostsData(postsService.posts, postsContainerFilter),
      postsService
    );

  // Initial render
  let renderedPosts = contextRender();

  postsService.addOnChangeListener((data) => {
    // Re-render posts on posts data change
    contextRender();
  });

  /** @param {PostsFilter} filter */
  const setFilter = (filter) => {
    // Re-render posts on filter change
    postsContainerFilter = filter;
    contextRender();
  }

  return {
    parent: postsContainer,
    rendered: renderedPosts,
    setFilter,
  }
}