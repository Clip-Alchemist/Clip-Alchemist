self.clipalchemist = new Proxy(
  {
    log: function log(message) {
      postMessage({ type: "log", message: message });
    },
    message: function message(message) {
      postMessage({ type: "message", message: message });
    },
    addEventListener: function addEventListener(event, handler) {
      self.addEventListener("message", async (e) => {
        if (!e.data || e.data.type !== event) return;
        const output = await handler(e);
        postMessage({ type: "response", event, output });
      });
    },
  },
  {
    set: (_target, key, _value) => {
      console.error("Cannot set property " + key + " on clipalchemist");
      return false;
    },
  },
);
{
  const disableAPI = [
    "console",
    "consoleAPI",
    "__REACT_DEVTOOLS_GLOBAL_HOOK__",
    "Navigator",
  ];
  for (const api of disableAPI) {
    Object.defineProperty(self, api, {
      get: () => undefined,
      set: () => {},
    });
  }
}
