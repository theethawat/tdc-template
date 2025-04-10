const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const changecase = require("change-case");

const createModelFile = (modelName) => {
  const modelFileName = changecase.pascalCase(modelName);
  const modelTemplate = fs.readFileSync(
    path.join(__dirname, "../template", "model.template.js"),
    "utf8"
  );
  const template = Handlebars.compile(modelTemplate);
  const result = template({ modelName: modelFileName });
  const modelFilePath = path.join(
    __dirname,
    "../packages/backend/src/models",
    `${modelFileName}.js`
  );
  fs.writeFileSync(modelFilePath, result, "utf8");
};

module.exports = createModelFile;
