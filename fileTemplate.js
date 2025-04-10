const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const changecase = require("change-case");
const process = require("node:process");

const createModelFile = (modelName) => {
  const modelFileName = changecase.pascalCase(modelName);
  const modelTemplate = fs.readFileSync(
    path.join(__dirname, "template", "model.template.js"),
    "utf8"
  );
  const template = Handlebars.compile(modelTemplate);
  const result = template({ modelName: modelFileName });
  const modelFilePath = path.join(
    __dirname,
    "packages/backend/src/models",
    `${modelFileName}.js`
  );
  fs.writeFileSync(modelFilePath, result, "utf8");
};

const createControllerFile = (modelName) => {
  const controllerFileName = changecase.camelCase(modelName);
  const modelFileName = changecase.pascalCase(modelName);
  const controllerTemplate = fs.readFileSync(
    path.join(__dirname, "template", "controller.template.js"),
    "utf8"
  );
  const template = Handlebars.compile(controllerTemplate);
  const result = template({ modelName: modelFileName });
  const modelFilePath = path.join(
    __dirname,
    "packages/backend/src/controllers",
    `${controllerFileName}.controller.js`
  );
  fs.writeFileSync(modelFilePath, result, "utf8");
};

const createRouterFile = (modelName) => {
  const controllerFileName = changecase.camelCase(modelName);
  const modelFileName = changecase.pascalCase(modelName);

  const routerTemplate = fs.readFileSync(
    path.join(__dirname, "template", "routes.template.js"),
    "utf8"
  );
  const template = Handlebars.compile(routerTemplate);
  const result = template({
    modelName: modelFileName,
    controllerName: controllerFileName,
  });

  const modelFilePath = path.join(
    __dirname,
    "packages/backend/src/routers",
    `${controllerFileName}.routes.js`
  );
  fs.writeFileSync(modelFilePath, result, "utf8");
};

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
