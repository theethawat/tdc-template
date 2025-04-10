const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const changecase = require("change-case");

const createActionFile = (modelName) => {
  const constantName = changecase.constantCase(modelName);
  const pascalCaseName = changecase.pascalCase(modelName);
  const apiRouterName = changecase.kebabCase(modelName);

  // Import Template file
  const templateFile = fs.readFileSync(
    path.join(__dirname, "../template", "action.template.js"),
    "utf8"
  );
  const template = Handlebars.compile(templateFile);

  // Writing code for new file
  const result = template({
    modelCapital: constantName,
    modelName: pascalCaseName,
    modelURLPrefix: apiRouterName,
  });

  const actionFilePath = path.join(
    __dirname,
    "../packages/frontend/src/redux/actions",
    `${pascalCaseName}Action.js`
  );

  // Writing the new file
  fs.writeFileSync(actionFilePath, result, "utf8");

  //  Import Reducer index file
  const actionIndexFile = path.join(
    __dirname,
    "../packages/frontend/src/redux/actions",
    "index.js"
  );
  const actionFileContent = fs.readFileSync(actionIndexFile, "utf8");
  const newImportLine = `export * from "./${pascalCaseName}Action";\n`;
  const newApiFileContent = actionFileContent.replace(
    "/** Script Import New Action */",
    `${newImportLine}/** Script Import New Action */`
  );

  fs.writeFileSync(actionIndexFile, newApiFileContent, "utf8");
};

module.exports = createActionFile;
