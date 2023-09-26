//@ts-check
import { useHeader } from "./handlers/headerHandler.js";
import { useDialog } from "./handlers/dialogHandler.js";
import { useSidebar } from "./handlers/sidebarHandler.js";
import { navItems } from "./sidebarNavItems.js";
import { useForm } from "./handlers/formHandler.js";
import { createPostFormFields } from "./createPostFormFields.js";
import { PostsService } from "./services/postsService.js";

/* -- Home page Handlers -- */

const homeSidebarHandler =
  useSidebar(
    document.getElementById("home-sidebar"),
    {
      shouldFocus: true,
      width: "300px",
      minWidthToFullScreen: 360,
    }
  );

const homeHeaderHandler =
  useHeader(document.getElementById("home-header"));

const createPostFormHandler =
  useForm(
    document.getElementById("create-post-form"),
    createPostFormFields,
  );

const homeCreatePostDialogHandler =
  useDialog(document.getElementById("create-post-form-dialog"));

/* --- */

/* -- Services -- */

const postsService = PostsService();

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

export {
  homeSidebarHandler,
  homeHeaderHandler,
  homeCreatePostDialogHandler,
}