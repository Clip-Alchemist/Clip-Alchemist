export function isElectron() {
  return process.env.APP_MODE === "Electron";
}
