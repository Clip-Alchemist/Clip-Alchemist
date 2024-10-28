export async function requestToWorker(
  worker: Worker,
  event: string,
  data?: string | Object | Array<any>,
) {
  worker.postMessage({ type: event, message: data });
  const output = await new Promise((resolve) => {
    function handleMessage(e: MessageEvent) {
      if (e.data.type === "response") {
        worker.removeEventListener("message", handleMessage);
        resolve(e.data?.message);
      }
    }
    worker.addEventListener("message", handleMessage);
  });
  return output;
}
