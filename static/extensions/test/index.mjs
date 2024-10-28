// extensions/test/index.js

clipalchemist.addEventListener("init", () => {
  clipalchemist.log("Hello from the test extension!");
});
clipalchemist.addEventListener("render", (e) => {
  clipalchemist.message("rendering");
  const data = {};
  return data;
});
