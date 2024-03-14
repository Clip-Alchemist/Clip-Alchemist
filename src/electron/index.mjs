import electron from "electron";
import { app } from "../app/meta.mjs";
electron.app.on("ready", () => {
  const browserWindow = new electron.BrowserWindow({
    autoHideMenuBar: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: app.theme,
    },
    webPreferences: {},
  });
  // browserWindow.webContents.openDevTools();
  browserWindow.loadFile("../../out/index.html");
});
// autoUpdater.on("update-available", () => {
//   mainWindow.webContents.send("update_available");
// });

// autoUpdater.on("update-downloaded", () => {
//   mainWindow.webContents.send("update_downloaded");
// });

// ipcMain.on("restart_app", () => {
//   autoUpdater.quitAndInstall();
// });
