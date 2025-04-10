const process = require("node:process");
const createModelFile = require("./script/createModelFile.js");
const createControllerFile = require("./script/createControllerFile.js");
const createRouterFile = require("./script/createRouterFiles.js");

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

const main = () => {
  const notCreateModelIndex =
    process.argv.indexOf("-nm") || process.argv.indexOf("--no-model");
  const notCreateControllerIndex =
    process.argv.indexOf("-nc") || process.argv.indexOf("--no-controller");
  const notCreateRouterIndex =
    process.argv.indexOf("-nr") || process.argv.indexOf("--no-router");
  let createModel = true;
  let createRouter = true;
  let createController = true;
  const modelName = process.argv[2];

  // Checking Condition
  if (notCreateModelIndex > -1) createModel = false;

  if (notCreateControllerIndex > -1) createController = false;

  if (notCreateRouterIndex > -1) createRouter = false;

  if (!modelName) {
    console.error("Please provide a model name.");
    process.exit(1);
  }

  // Running Command
  if (createModel) {
    createModelFile(modelName);
  }
  if (createController) {
    createControllerFile(modelName);
  }
  if (createRouter) {
    createRouterFile(modelName);
  }

  console.log("Create File Script Successfully Run");
};

main();
