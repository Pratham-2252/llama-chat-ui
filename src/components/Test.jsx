async function executeSequentially(asyncFunctions) {
  for (const func of asyncFunctions) {
    try {
      await func(); // Execute each async function sequentially
    } catch (error) {
      throw new Error(`Execution stopped due to error: ${error.message}`);
    }
  }
}

// Example usage:
const asyncFunc1 = async () => {
  console.log("Function 1 executed");
};

const asyncFunc2 = async () => {
  console.log("Function 2 executed");
};

const asyncFunc3 = async () => {
  console.log("Function 3 executed");
  //   throw new Error("Function 3 failed");
};

const asyncFunc4 = async () => {
  console.log("Function 4 executed");
};

const asyncFunctions = [asyncFunc1, asyncFunc2, asyncFunc3, asyncFunc4];

executeSequentially(asyncFunctions)
  .then(() => {
    console.log("All functions executed successfully");
  })
  .catch((error) => {
    console.error(error.message); // Logs the error when one function fails
  });

const Test = () => {
  return <>Test</>;
};

export default Test;
