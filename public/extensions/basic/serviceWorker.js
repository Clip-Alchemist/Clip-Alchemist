console.log("Service Worker is running!");
addEventListener("message", function (event) {
  console.log("Service Worker received a message: ", event.data);
});
