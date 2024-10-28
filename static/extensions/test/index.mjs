// extensions/test/index.js
function handleInit() {
  clipalchemist.log("Hello from the test extension!");
}

function handleRender(e) {
  clipalchemist.message("rendering");
  const data = {};
  return data;
}

clipalchemist.addEventListener("init", handleInit);
clipalchemist.addEventListener("render", handleRender);
