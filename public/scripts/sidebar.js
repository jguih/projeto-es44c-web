
export const SIDEBAR_STATE = {
  opened: "open",
  closed: "closed",
}

export const SIDEBAR_ACTIONS = {
  open: "open-sidebar",
  close: "close-sidebar",
  toggle: "toggle-sidebar",
}

const openSidebar = (sidebar) => {
  sidebar.style.width = "250px";
  sidebar.dataset.state = SIDEBAR_STATE.opened;
}

const closeSidebar = (sidebar) => {
  sidebar.style.width = "0px";
  sidebar.dataset.state = SIDEBAR_STATE.closed;
}

const toggleSidebar = (sidebar) => {
  const sidebarState = sidebar.dataset.state;

  switch (sidebarState) {
    case SIDEBAR_STATE.opened: {
      closeSidebar(sidebar);
      break;
    }
    case SIDEBAR_STATE.closed: {
      openSidebar(sidebar);
      break;
    }
    default: { // When state === undefined
      openSidebar(sidebar);
      break;
    }
  }
}

/**
 * 
 * @param {string} action 
 * @param {HTMLElement} sidebar
 */
const handleAction = (action, sidebar) => {
  switch (action) {
    case SIDEBAR_ACTIONS.open: {
      openSidebar(sidebar);
      break;
    }
    case SIDEBAR_ACTIONS.toggle: {
      toggleSidebar(sidebar);
      break;
    }
    case SIDEBAR_ACTIONS.close: {
      closeSidebar(sidebar);
      break;
    }
    default: {
      break;
    }
  }
}

/**
 * 
 * @param {HTMLElement} sidebar 
 * @returns {object}
 */
export const useSidebar = (sidebar) => {

  // All <buttons/> inside the sidebar
  const sidebarBtns = sidebar.getElementsByTagName("button");
  for (let i = 0; i < sidebarBtns.length; i++) {
    // Add event listener for all buttons inside the sidebar
    sidebarBtns
      .item(i)
      .addEventListener("click", (event) => {
        const action = event.currentTarget.dataset.action;
        if (action === SIDEBAR_ACTIONS.close) {
          // Closes sidebar if data-action="close-sidebar"
          closeSidebar(sidebar);
        }
      })
  }

  return {
    sidebar,
    openSidebar: () => openSidebar(sidebar),
    closeSidebar: () => closeSidebar(sidebar),
    toggleSidebar: () => toggleSidebar(sidebar),
    handleAction:  (action) => handleAction(action, sidebar),
  }
}