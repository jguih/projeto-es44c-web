import { useHeader } from "./header.js";
import { useSidebar } from "./sidebar.js";

const homeSidebarHandler =
  useSidebar(document.getElementById("home-sidebar"), {
    expandBody: true,
  });

const homeHeaderHandler = useHeader(
  document.getElementById("home-header"),
  {
    onBtnClick: (event) => {
      homeSidebarHandler
        .handleAction(event.currentTarget.dataset.action);
    }
  }
);