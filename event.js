// import { EventEmitter } from "events";
// class customevent extends EventEmitter {
//   constructor() {
//     super();
//   }

//   trigger() {
//     this.emit("event");
//     console.log("event emitted");
//   }
// }

// class catcher extends EventEmitter {
//   constructor() {
//     super();
//   }

//   catch(event) {
//     event.on("event", () => {
//       console.log("event triggered");
//     });
//   }
// }

// const event = new customevent();
// const catchEvent = new catcher();

// catchEvent.catch(event);

// event.trigger();

// process.on("SIGINT", () => {
//   console.log("GOT YOU");
//   process.exit();
// });
// process.title = "Daman node script";
// console.log(process.title);
// setTimeout(() => {}, 100000);

process.stdin.resume();
process.stdin.setEncoding("utf8");
process.stdin.on("data", function (chunk) {
  process.stdout.write("data: " + chunk);
});
process.stdin.on("end", function () {
  process.stdout.write("end");
});
