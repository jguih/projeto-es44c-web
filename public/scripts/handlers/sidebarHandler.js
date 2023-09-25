//@ts-check

/**
 * @typedef {object} BaseArgs
 * @prop {boolean} expandBody
 * @prop {boolean} shouldFocus
 */

/**
 * @typedef {object} Args
 * @extends BaseArgs
 * @prop {string} width
 */

/**
 * @typedef {object} useSidebarArgs
 * @prop {boolean} [expandBody=false]
 * @prop {string} [width="250px"]
 * @prop {boolean} [shouldFocus=false]
 */

/**
 * @typedef {object} SidebarHandler
 * @prop {HTMLElement} sidebar
 * @prop {() => void} openSidebar
 * @prop {() => void} closeSidebar
 * @prop {() => void} toggleSidebar
 * @prop {(action: string | undefined | null) => void} handleAction
 * @prop {(navItems: NavItem[]) => void} setNavItems
 */

/**
 * @typedef {object} NavItem
 * @prop {string} label
 * @prop {(event: MouseEvent) => void} onClick
*/

export const SIDEBAR_STATE = {
  opened: "open",
  closed: "closed",
}

export const SIDEBAR_ACTIONS = {
  open: "open-sidebar",
  close: "close-sidebar",
  toggle: "toggle-sidebar",
}

const body = document.body;
const overlay = document.getElementById("sidebar-overlay");
const showOverlay = () => overlay?.style.setProperty("display", "initial");
const hideOverlay = () => overlay?.style.setProperty("display", "none");

/**
 * 
 * @param {HTMLElement} sidebar 
 * @param {Args} args
 */
const openSidebar = (sidebar, {
  expandBody,
  width,
  shouldFocus,
}) => {
  sidebar.style.width = width;
  sidebar.dataset.state = SIDEBAR_STATE.opened;
  if (shouldFocus) showOverlay();
  if (expandBody) body.style.paddingLeft = width;
}

/**
 * 
 * @param {HTMLElement} sidebar 
 * @param {BaseArgs} args
 */
const closeSidebar = (sidebar, {
  expandBody,
  shouldFocus,
}) => {
  sidebar.style.width = "0px";
  sidebar.dataset.state = SIDEBAR_STATE.closed;
  if (shouldFocus) hideOverlay();
  if (expandBody) body.style.paddingLeft = "0px";
}

/**
 * 
 * @param {HTMLElement} sidebar 
 * @param {Args} args
 */
const toggleSidebar = (sidebar, args) => {
  const sidebarState = sidebar.dataset.state;

  switch (sidebarState) {
    case SIDEBAR_STATE.opened: {
      closeSidebar(sidebar, { ...args });
      break;
    }
    case SIDEBAR_STATE.closed: {
      openSidebar(sidebar, { ...args });
      break;
    }
    default: { // When state === undefined
      openSidebar(sidebar, { ...args });
      break;
    }
  }
}

/**
 * 
 * @param {string | undefined | null} action 
 * @param {HTMLElement} sidebar
 * @param {Args} args
 */
const handleAction = (action, sidebar, args) => {
  switch (action) {
    case SIDEBAR_ACTIONS.open: {
      openSidebar(sidebar, { ...args });
      break;
    }
    case SIDEBAR_ACTIONS.toggle: {
      toggleSidebar(sidebar, { ...args });
      break;
    }
    case SIDEBAR_ACTIONS.close: {
      closeSidebar(sidebar, { ...args });
      break;
    }
    default: {
      break;
    }
  }
}

/**
 * 
 * @param {NavItem} navItem 
 * @returns {HTMLElement}
 */
const createNavItem = (navItem) => {
  const anchor = document.createElement("a");
  anchor.textContent = navItem.label;
  anchor.onclick = navItem.onClick;
  return anchor;
}

/**
 * 
 * @param {HTMLElement} sidebar 
 * @param {NavItem[]} navItems 
 */
const setNavItems = (sidebar, navItems) => {
  const sidebarNav = sidebar.getElementsByTagName("nav");
  for (let i = 0; i < sidebarNav.length; i++) {
    const nav = sidebarNav.item(i);
    if (nav) {
      navItems.forEach((navItem) => {
        nav.appendChild(createNavItem(navItem));
      })
    }
  }
}

/**
 * 
 * @param {HTMLElement} sidebar
 * @param {useSidebarArgs} args
 * @returns {SidebarHandler}
 */
export const useSidebar = (sidebar, {
  expandBody = false,
  width = "250px",
  shouldFocus = false,
} = {}) => {
  const args = { expandBody, width, shouldFocus };
  
  // All <buttons/> inside the sidebar
  const sidebarBtns = sidebar.getElementsByTagName("button");
  for (let i = 0; i < sidebarBtns.length; i++) {
    // Add event listener for all buttons inside the sidebar
    sidebarBtns
      ?.item(i)
      ?.addEventListener("click", (event) => {
        const action = event.currentTarget instanceof HTMLElement ?
          event.currentTarget.dataset.action : undefined;
        if (action === SIDEBAR_ACTIONS.close) {
          // Closes sidebar if data-action="close-sidebar"
          closeSidebar(sidebar, { ...args });
        }
      })
  };

  // Hides sidebar on overlay click
  overlay?.addEventListener("click", (event) => {
    closeSidebar(sidebar, { ...args });
  });

  return {
    sidebar,
    openSidebar: () => openSidebar(sidebar, { ...args }),
    closeSidebar: () => closeSidebar(sidebar, { ...args }),
    toggleSidebar: () => toggleSidebar(sidebar, { ...args }),
    handleAction: (action) => handleAction(action, sidebar, { ...args }),
    setNavItems: (navItems) => setNavItems(sidebar, navItems),
  };
}