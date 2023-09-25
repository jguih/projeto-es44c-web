//@ts-check
import { useHeader } from "./handlers/headerHandler.js";
import { useSidebar } from "./handlers/sidebarHandler.js";
import { navItems } from "./sidebarNavItems.js";

const homeSidebar = document.getElementById("home-sidebar");
const homeSidebarHandler = homeSidebar ?
  useSidebar(homeSidebar, { shouldFocus: true }) : undefined;
homeSidebarHandler?.setNavItems(navItems);

const homeHeader = document.getElementById("home-header");
const homeHeaderHandler = homeHeader ?
  useHeader(
    homeHeader,
    {
      onBtnClick: (event) => {
        event.currentTarget instanceof HTMLElement ?
          homeSidebarHandler
            ?.handleAction(event.currentTarget.dataset.action) :
          undefined
      }
    }
  ) : undefined;

export {
  homeSidebarHandler, 
  homeHeaderHandler
}