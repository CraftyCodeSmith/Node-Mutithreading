const { parentPort } = require("worker_threads");
var numCPUs = require("os").cpus().length;

parentPort.on("message", () => {
  console.log("hello from temp", numCPUs);
});
