import electron from "electron";

electron.app.on("ready", () => {
  const browserWindow = new electron.BrowserWindow({ autoHideMenuBar: true });
  // browserWindow.webContents.openDevTools();
  browserWindow.loadFile("../out/index.html");
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
