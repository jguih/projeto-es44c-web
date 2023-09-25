//@ts-check
import { useHeader } from "./handlers/headerHandler.js";
import { usePostFormDialog } from "./handlers/postFormDialogHandler.js";
import { useSidebar } from "./handlers/sidebarHandler.js";
import { navItems } from "./sidebarNavItems.js";

const homeSidebarHandler =
  useSidebar(document.getElementById("home-sidebar"), { 
    shouldFocus: true,
    width: "300px",
    minWidthToFullScreen: 360, 
  });
homeSidebarHandler?.setNavItems(navItems);

const homeHeaderHandler =
  useHeader(
    document.getElementById("home-header"),
    {
      onBtnClick: (event) => {
        event.currentTarget instanceof HTMLElement ?
          homeSidebarHandler
            ?.handleAction(event.currentTarget.dataset.action) :
          undefined
      }
    }
  );

const homePostFormDialogHandler = 
  usePostFormDialog(document.getElementById("post-form-dialog"));

export {
  homeSidebarHandler, 
  homeHeaderHandler,
  homePostFormDialogHandler,
}