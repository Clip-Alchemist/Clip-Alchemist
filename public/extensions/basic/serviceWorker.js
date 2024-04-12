console.log("Service Worker is running!");
ServiceWorker.addEventListener("postMessage", function (event) {
  console.log("Service Worker received a message: ", event.data);
});
