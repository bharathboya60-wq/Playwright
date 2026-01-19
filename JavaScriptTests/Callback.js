function callbackFunction() {
     console.log("Callback function executed successfully!");
}

function executeCallback(callback) {
    setTimeout(() => {
        console.log("Executing callback...");
        callback();
    },2000);
}

// Test the executeCallback function
executeCallback(callbackFunction);

  // Output: Callback function executed successfully!


  setTimeout(() => {
    console.log("Step 1");
    setTimeout(() => {
        console.log("Step 2");
        setTimeout(() => {
            console.log("Step 3");
        }, 1000);
    }, 1000);
}, 1000);


