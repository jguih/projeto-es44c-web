//@ts-check
import { useHeader } from "./handlers/headerHandler.js";
import { useDialog } from "./handlers/dialogHandler.js";
import { useSidebar } from "./handlers/sidebarHandler.js";
import { navItems } from "./sidebarNavItems.js";
import { useForm } from "./handlers/formHandler.js";
import { PostsService } from "./services/postsService.js";
import { usePostsContainer } from "./handlers/postsContainerHandler.js";

/* -- Home page Handlers -- */

export const homeSidebarHandler =
  useSidebar(
    document.getElementById("home-sidebar"),
    {
      shouldFocus: true,
      width: "300px",
      minWidthToFullScreen: 360,
    }
  );

export const homeHeaderHandler =
  useHeader(document.getElementById("home-header"));

export const createPostFormHandler =
  useForm(
    document.getElementById("create-post-form"),
    [
      { name: "title" },
      { name: "date" },
      { name: "description" },
    ],
  );

export const homeCreatePostDialogHandler =
  useDialog(document.getElementById("create-post-form-dialog"));

export const homePostsContainer =
  usePostsContainer(document.getElementById("posts-container"));

/* --- */

/* -- Services -- */

const postsService = new PostsService();

/* --- */

/* -- Handlers Configuration -- */

homeSidebarHandler?.setNavItems(navItems);

homeHeaderHandler
  ?.onButtonClick(
    (event) => {
      const target = event.currentTarget;
      const isHTMLElement = target instanceof HTMLElement;
      const action = isHTMLElement ? target.dataset.action : null;
      homeSidebarHandler?.handleAction(action);
    }
  );

createPostFormHandler
  ?.onSubmit((data) => {
    postsService.createAndInsert(data);
    homeCreatePostDialogHandler?.close();
  });

homeCreatePostDialogHandler
  ?.onOk(() => {
    createPostFormHandler?.submit();
  });

homeCreatePostDialogHandler
  ?.onClear(() => {
    createPostFormHandler?.reset();
  })

/* --- */