const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const changecase = require("change-case");

const createControllerFile = (modelName) => {
  const controllerFileName = changecase.camelCase(modelName);
  const modelFileName = changecase.pascalCase(modelName);
  const controllerTemplate = fs.readFileSync(
    path.join(__dirname, "../template", "controller.template.js"),
    "utf8"
  );
  const pipelineTempalte = fs.readFileSync(
    path.join(__dirname, "../template", "pipeline.template.js"),
    "utf8"
  );
  const template = Handlebars.compile(controllerTemplate);
  const result = template({
    modelName: modelFileName,
    controllerName: controllerFileName,
  });
  const modelFilePath = path.join(
    __dirname,
    "../packages/backend/src/controllers",
    `${controllerFileName}.controller.js`
  );
  const pipelineFilePath = path.join(
    __dirname,
    "../packages/backend/src/pipeline",
    `${controllerFileName}.pipeline.js`
  );
  fs.writeFileSync(modelFilePath, result, "utf8");
  fs.writeFileSync(pipelineFilePath, pipelineTempalte, "utf8");
};

module.exports = createControllerFile;
