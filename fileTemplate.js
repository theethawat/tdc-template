const process = require("node:process");
const createModelFile = require("./script/createModelFile.js");
const createControllerFile = require("./script/createControllerFile.js");
const createRouterFile = require("./script/createRouterFiles.js");
const createActionFile = require("./script/createActionFile.js");
const createReducerFile = require("./script/createReducerFile.js");

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

const main = () => {
  const modelName = process.argv[2];

  if (!modelName) {
    console.error("Please provide a model name.");
    process.exit(1);
  }

  const createModel =
    !process.argv.includes("-nm") && !process.argv.includes("--no-model");
  const createController =
    !process.argv.includes("-nc") && !process.argv.includes("--no-controller");
  const createRouter =
    !process.argv.includes("-nr") && !process.argv.includes("--no-router");
  const createAction =
    !process.argv.includes("-na") && !process.argv.includes("--no-action");
  const createReducer =
    !process.argv.includes("-nre") && !process.argv.includes("--no-reducer");

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
  if (createAction) {
    createActionFile(modelName);
  }
  if (createReducer) {
    createReducerFile(modelName);
  }

  console.log("Create File Script Successfully Run");
};

main();
