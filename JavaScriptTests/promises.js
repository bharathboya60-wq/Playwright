const myPromise = new Promise((resolve, reject) => {
  let success = false;

  setTimeout(() => {
    if (success) {
      resolve("Task completed successfully!");
    } else {
      reject("Task failed!");
    }
  }, 2000);
});


myPromise.then((message) => {
  console.log("Promise Resolved:", message);
}).catch((error) => {
  console.log("Promise Rejected:", error);
});
