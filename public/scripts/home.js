//@ts-check
import { useHeader } from "./handlers/headerHandler.js";
import { useDialog } from "./handlers/dialogHandler.js";
import { useSidebar } from "./handlers/sidebarHandler.js";
import { navItems } from "./sidebarNavItems.js";
import { useForm } from "./handlers/formHandler.js";
import { PostsService } from "./services/postsService.js";
import { usePostsContainer } from "./handlers/postsContainerHandler.js";
import { LocalStorageService } from "./services/localStorageService.js";
import { getDataFromEvent, getNewPostFromFormData } from "./utils.js";

/* -- Services -- */

const lsService = new LocalStorageService();
const postsService = new PostsService(lsService);

/* --- */

/* -- Home page Handlers -- */

export const sidebarHandler =
  useSidebar(
    document.getElementById("home-sidebar"),
    {
      shouldFocus: true,
      width: "300px",
      minWidthToFullScreen: 360,
    }
  );

export const headerHandler =
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

export const createPostDialogHandler =
  useDialog(document.getElementById("create-post-form-dialog"));

export const searchPostDialogHandler =
  useDialog(document.getElementById("search-post-dialog"));

export const searchPostContainerHandler =
  usePostsContainer(
    document.getElementById("search-post-dialog-posts-container"),
    postsService
  );

export const searchPostFormHandler =
  useForm(
    document.getElementById("search-post-dialog-form"),
    [{ name: "title" }, { name: "date" }]
  )

export const deletePostDialogHandler =
  useDialog(document.getElementById("delete-post-dialog"));

export const deletePostContainerHandler =
  usePostsContainer(
    document.getElementById("delete-post-dialog-posts-container"),
    postsService
  );

export const postsContainerHandler =
  usePostsContainer(
    document.getElementById("posts-container"),
    postsService
  );

/* --- */

/* -- Handlers Configuration -- */

sidebarHandler?.setNavItems(navItems);

headerHandler
  ?.onButtonClick(
    (event) => {
      const { currentTargetAction } = getDataFromEvent(event);
      sidebarHandler?.handleAction(currentTargetAction);
    }
  );

createPostFormHandler
  ?.onSubmit((data) => {
    const newPost = getNewPostFromFormData(data);
    newPost && postsService.createAndInsert(newPost);
    createPostDialogHandler?.close();
  });

searchPostFormHandler
  ?.getField("title")
  ?.addEventListener("input", (event) => {
    const eventData = getDataFromEvent(event);
    searchPostContainerHandler?.setFilter({ title: eventData.value ?? "" });
  });

searchPostFormHandler
  ?.getField("date")
  ?.addEventListener("input", (event) => {
    const eventData = getDataFromEvent(event);
    searchPostContainerHandler?.setFilter({ date: eventData.value ?? "" });
  })

createPostDialogHandler
  ?.onOk(() => {
    createPostFormHandler?.submit();
  });

createPostDialogHandler
  ?.onClear(() => {
    createPostFormHandler?.reset();
  });

/* --- */