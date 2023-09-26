//@ts-check
import { createPostDialogHandler, searchPostDialogHandler } from './home.js';

/** 
 * Defines all navigation items for the sidebar
 * @type {import('./handlers/sidebarHandler.js').NavItem[]} 
 * */
export const navItems = [
  {
    label: "Create post",
    onClick: (event) => createPostDialogHandler?.showModal(),
  },
  {
    label: "Search for posts",
    onClick: (event) => searchPostDialogHandler?.showModal(),
  },
  {
    label: "Delete a post",
    onClick: (event) => null,
  }
]