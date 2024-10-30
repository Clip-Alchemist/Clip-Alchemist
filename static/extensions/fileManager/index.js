clipalchemist.addEventListener("init", () => {
  clipalchemist.log("FileManager extension loaded");
  return true;
});
let directoryHandle;
clipalchemist.addEventListener("loadFolder", async () => {
  try {
    // Error: cannot use showDirectoryPicker() in a web worker
    directoryHandle = await showDirectoryPicker();

    const entries = await directoryHandle.values();
    const files = [];
    for await (const entry of entries) {
      files.push(entry);
    }
    clipalchemist.log(files);
    return files;
  } catch (e) {
    clipalchemist.log(e);
    return false;
  }
});
