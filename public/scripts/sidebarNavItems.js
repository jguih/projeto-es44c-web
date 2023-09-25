/** 
 * Defines all navigation items for the sidebar
 * @type {import('./handlers/sidebarHandler.js').NavItem[]} 
 * */
export const navItems = [
  {
    label: "New post",
    action: "create-post",
    onClick: (event) => null,
  },
  {
    label: "Search for posts",
    action: "search-post",
    onClick: (event) => null,
  },
  {
    label: "Delete a post",
    action: "delete-post",
    onClick: (event) => null,
  }
]