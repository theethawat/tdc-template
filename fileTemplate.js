const process = require("node:process");
const changecase = require("change-case");
const createModelFile = require("./script/createModelFile.js");
const createControllerFile = require("./script/createControllerFile.js");
const createRouterFile = require("./script/createRouterFiles.js");
const createActionFile = require("./script/createActionFile.js");
const createReducerFile = require("./script/createReducerFile.js");
const createViewFiles = require("./script/createViewFiles.js");
const createFormFile = require("./script/createFormFile.js");
const updateMenuList = require("./script/updateMenuList.js");

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
  const createViews =
    !process.argv.includes("-nv") && !process.argv.includes("--no-view");
  const createFrom =
    !process.argv.includes("-nf") && !process.argv.includes("--no-form");
  const updateMenu =
    !process.argv.includes("-nu") && !process.argv.includes("--no-update-menu");
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
  if (createViews) {
    const moduleNameIndex = process.argv.includes("-m")
      ? process.argv.indexOf("-m") + 1
      : process.argv.indexOf("--module") + 1;
    const moduleName = process.argv[moduleNameIndex];
    if (!moduleName) {
      console.error("Please provide a module name.");
      process.exit(1);
    }
    console.log("Module Name", moduleName);
    const thaiNameIndex = process.argv.includes("-t")
      ? process.argv.indexOf("-t") + 1
      : process.argv.indexOf("--thai-name") + 1;
    const thaiNameValue =
      process.argv[thaiNameIndex] || changecase.pascalCase(modelName);

    const isCommon =
      !process.argv.includes("-s") && !process.argv.includes("--specific");

    createViewFiles({
      modelName,
      moduleName,
      thaiName: thaiNameValue,
      isCommon,
    });

    if (updateMenu) {
      updateMenuList({
        modelName,
        moduleName,
        thaiName: thaiNameValue,
      });
    }
  }

  if (createFrom) {
    createFormFile({
      modelName,
      isCommon:
        !process.argv.includes("-s") && !process.argv.includes("--specific"),
    });
  }

  console.log("Create File Script Successfully Run");
};

main();
