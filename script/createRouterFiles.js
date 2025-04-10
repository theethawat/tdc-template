const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const changecase = require("change-case");

const createRouterFile = (modelName) => {
  const controllerFileName = changecase.camelCase(modelName);
  const modelFileName = changecase.pascalCase(modelName);

  const routerTemplate = fs.readFileSync(
    path.join(__dirname, "../template", "routes.template.js"),
    "utf8"
  );
  const template = Handlebars.compile(routerTemplate);
  const result = template({
    modelName: modelFileName,
    controllerName: controllerFileName,
  });

  const modelFilePath = path.join(
    __dirname,
    "../packages/backend/src/routers",
    `${controllerFileName}.routes.js`
  );
  fs.writeFileSync(modelFilePath, result, "utf8");

  // Append to api.js
  const apiFilePath = path.join(
    __dirname,
    "../packages/backend/src/routers",
    "api.js"
  );
  const apiFilePathContent = fs.readFileSync(apiFilePath, "utf8");
  const newImportLine = `import ${controllerFileName}Router from './${controllerFileName}.routes';\n`;
  const newUseLine = `router.use('/${controllerFileName}', ${controllerFileName}Router);\n`;
  const newApiFileContent = apiFilePathContent
    .replace(
      "/** Place For Import */",
      `${newImportLine}/** Place For Import */`
    )
    .replace("/** Place For Use */", `${newUseLine}/** Place For Use */`);

  fs.writeFileSync(apiFilePath, newApiFileContent, "utf8");
};

module.exports = createRouterFile;
