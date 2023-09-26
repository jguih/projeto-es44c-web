//@ts-check
import { useHeader } from "./handlers/headerHandler.js";
import { useDialog } from "./handlers/dialogHandler.js";
import { useSidebar } from "./handlers/sidebarHandler.js";
import { navItems } from "./sidebarNavItems.js";
import { useForm } from "./handlers/formHandler.js";
import { createPostFormFields } from "./createPostFormFields.js";

const homeSidebarHandler =
  useSidebar(
    document.getElementById("home-sidebar"),
    {
      shouldFocus: true,
      width: "300px",
      minWidthToFullScreen: 360,
    }
  );
homeSidebarHandler?.setNavItems(navItems);

const homeHeaderHandler =
  useHeader(
    document.getElementById("home-header"),
    {
      onBtnClick: (event) => {
        const target = event.currentTarget;
        const isHTMLElement = target instanceof HTMLElement;
        const action = isHTMLElement ? target.dataset.action : null;
        homeSidebarHandler?.handleAction(action);
      }
    }
  );

const createPostFormHandler =
  useForm(
    document.getElementById("create-post-form"),
    createPostFormFields,
    {
      onSubmit: (data) => {
        console.log(data);
      },
    }
  );


const homeCreatePostDialogHandler =
  useDialog(document.getElementById("create-post-form-dialog"), {
    onOk: () => {
      createPostFormHandler?.submit();
    },
    onClear: () => {
      createPostFormHandler?.reset();
    }
  });

export {
  homeSidebarHandler,
  homeHeaderHandler,
  homeCreatePostDialogHandler,
}