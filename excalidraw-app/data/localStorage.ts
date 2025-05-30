import {
  clearAppStateForLocalStorage,
  getDefaultAppState,
} from "@excalidraw/excalidraw/appState";
import { clearElementsForLocalStorage } from "@excalidraw/element";

import type { ExcalidrawElement } from "@excalidraw/element/types";
import type { AppState } from "@excalidraw/excalidraw/types";

import { STORAGE_KEYS } from "../app_constants";

export const saveUsernameToLocalStorage = (username: string) => {
  try {
    localStorage.setItem(
      STORAGE_KEYS.LOCAL_STORAGE_COLLAB,
      JSON.stringify({ username }),
    );
  } catch (error: any) {
    // Unable to access window.localStorage
    console.error(error);
  }
};

export const importUsernameFromLocalStorage = (): string | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_COLLAB);
    if (data) {
      return JSON.parse(data).username;
    }
  } catch (error: any) {
    // Unable to access localStorage
    console.error(error);
  }

  return null;
};

export const importFromLocalStorage = () => {
  let savedElements = null;
  let savedState = null;
  const search = window.location?.search;
  let id = "";
  /**if (search.startsWith("?link=")) {
    id = search.substring(6);
  } */
  if (search.includes("&drawId=")) {
    id = search.split("&drawId=")[1].trim();
  }

  try {
    savedElements = localStorage.getItem(
      STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS + id,
    );
    savedState = localStorage.getItem(
      STORAGE_KEYS.LOCAL_STORAGE_APP_STATE + id,
    );
  } catch (error: any) {
    // Unable to access localStorage
    console.error(error);
  }

  let elements: ExcalidrawElement[] = [];
  if (savedElements) {
    try {
      elements = clearElementsForLocalStorage(JSON.parse(savedElements));
    } catch (error: any) {
      console.error(error);
      // Do nothing because elements array is already empty
    }
  }

  let appState = null;
  if (savedState) {
    try {
      appState = {
        ...getDefaultAppState(),
        ...clearAppStateForLocalStorage(
          JSON.parse(savedState) as Partial<AppState>,
        ),
      };
    } catch (error: any) {
      console.error(error);
      // Do nothing because appState is already null
    }
  }
  return { elements, appState };
};

export const getElementsStorageSize = () => {
  const search = window.location?.search;
  let id = "";
  /**if (search.startsWith("?link=")) {
    id = search.substring(6);
  } */
  if (search.includes("&drawId=")) {
    id = search.split("&drawId=")[1].trim();
  }
  try {
    const elements = localStorage.getItem(
      STORAGE_KEYS.LOCAL_STORAGE_ELEMENTS + id,
    );
    const elementsSize = elements?.length || 0;
    return elementsSize;
  } catch (error: any) {
    console.error(error);
    return 0;
  }
};

export const getTotalStorageSize = () => {
  try {
    const appState = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_APP_STATE);
    const collab = localStorage.getItem(STORAGE_KEYS.LOCAL_STORAGE_COLLAB);

    const appStateSize = appState?.length || 0;
    const collabSize = collab?.length || 0;

    return appStateSize + collabSize + getElementsStorageSize();
  } catch (error: any) {
    console.error(error);
    return 0;
  }
};
