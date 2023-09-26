//@ts-check
import { homeCreatePostDialogHandler } from './home.js';

/** 
 * Defines all navigation items for the sidebar
 * @type {import('./handlers/sidebarHandler.js').NavItem[]} 
 * */
export const navItems = [
  {
    label: "Create post",
    onClick: (event) => homeCreatePostDialogHandler?.showModal(),
  },
  {
    label: "Search for posts",
    onClick: (event) => null,
  },
  {
    label: "Delete a post",
    onClick: (event) => null,
  }
]