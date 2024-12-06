// const cp = require("child_process");

// console.log("Parent process PID:", process.pid);

// // Use cp.exec and bind 'this' to the 'child' object
// const child = cp.exec(
//   "ls",
//   { cwd: process.cwd(), shell: "powershell.exe" },
//   function (e, stdout, stderr) {
//     // 'this' refers to the child process object after binding

//     if (e) {
//       console.error("Error:", e);
//     } else {
//       console.log("stdout:", stdout);
//       console.error("stderr:", stderr);
//     }
//   }
// );

// console.log("Child process PID using child:", child.pid);

// experimenting with worker threads
// const { Worker, isMainThread, parentPort } = require("worker_threads");

// const NUM_WORKERS = 14; // You can change this number to test with more or fewer workers

// // Function to create a worker
// function createWorker(workerIndex) {
//   const worker = new Worker(__filename); // Create a new worker from the same script
//   worker.postMessage(workerIndex); // Send the worker's index as the message

//   worker.on("message", (msg) => {
//     console.log(`Worker ${workerIndex} says: ${msg}`);
//   });

//   worker.on("error", (err) => {
//     console.error(`Worker ${workerIndex} error:`, err);
//   });

//   worker.on("exit", (code) => {
//     if (code !== 0) {
//       console.error(`Worker ${workerIndex} stopped with exit code ${code}`);
//     } else {
//       console.log(`Worker ${workerIndex} stopped successfully`);
//     }
//   });
// }

// if (isMainThread) {
//   // Create multiple workers
//   for (let i = 0; i < NUM_WORKERS; i++) {
//     createWorker(i);
//   }
// } else {
//   // In the worker thread, listen for messages from the main thread
//   parentPort.on("message", (workerIndex) => {
//     console.log(`Message received by Worker ${workerIndex}`);

//     // Simulate some work and send a greeting message back
//     const result = `Hi from Worker ${workerIndex}`;

//     // Send a message back to the main thread
//     parentPort.postMessage(result);
//   });
// }

//simulating workers that blocks all threads
const { Worker, isMainThread, parentPort } = require("worker_threads");

const NUM_WORKERS = 1; // Set to 14 to simulate more workers than logical processors

// Function to create a worker
function createWorker(workerIndex) {
  const worker = new Worker("./temp.js"); // Create a new worker from the same script
  worker.postMessage(workerIndex); // Send the worker's index as the message

  worker.on("message", (msg) => {
    console.log(`Worker ${workerIndex} says: ${msg}`);
  });

  worker.on("error", (err) => {
    console.error(`Worker ${workerIndex} error:`, err);
  });

  worker.on("exit", (code) => {
    if (code !== 0) {
      console.error(`Worker ${workerIndex} stopped with exit code ${code}`);
    } else {
      console.log(`Worker ${workerIndex} stopped successfully`);
    }
  });
}

if (isMainThread) {
  // Create multiple workers
  for (let i = 0; i < NUM_WORKERS; i++) {
    createWorker(i);
  }

  // Block the main thread indefinitely (to simulate waiting for all workers to finish)
  console.log("Main thread is now blocked, observing worker threads...");
  setInterval(() => {}, 1000); // Infinite loop to block the main thread
} else {
  // In the worker thread, simulate a CPU-bound task (infinite loop)
  parentPort.on("message", (workerIndex) => {
    console.log(`Worker ${workerIndex} started a CPU-bound task`);

    // Simulate CPU-bound work with an infinite loop (this will block the worker)
    while (true) {
      // Just keep the worker busy
    }

    // Normally, we would send back a message here, but the loop never exits
    // const result = `Worker ${workerIndex} completed work`;
    // parentPort.postMessage(result);
  });
}
