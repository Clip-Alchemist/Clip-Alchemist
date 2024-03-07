import { isElectron } from "../../common/isElectron";

export function showDirectoryPicker(options?: DirectoryPickerOptions) {
  if (isElectron()) {
    // Todo: implement electron directory picker
  } else {
    if ("showDirectoryPicker" in window) {
      return window.showDirectoryPicker(options);
    } else {
      throw new Error("showDirectoryPicker is not supported in this browser");
    }
  }
}
