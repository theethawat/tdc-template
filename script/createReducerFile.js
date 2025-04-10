const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const changecase = require("change-case");

const createReducerFile = (modelName) => {
  const constantName = changecase.constantCase(modelName);
  const camelCaseName = changecase.camelCase(modelName);
  const pascalCaseName = changecase.pascalCase(modelName);
  const apiRouterName = changecase.kebabCase(modelName);

  // Import Template file
  const templateFile = fs.readFileSync(
    path.join(__dirname, "../template", "reducer.template.js"),
    "utf8"
  );
  const template = Handlebars.compile(templateFile);

  // Writing code for new file
  const result = template({
    modelCapital: constantName,
    modelName: pascalCaseName,
  });

  const modelFilePath = path.join(
    __dirname,
    "../packages/frontend/src/redux/reducers",
    `${pascalCaseName}Reducer.js`
  );

  // Writing the new file
  fs.writeFileSync(modelFilePath, result, "utf8");

  //  Import Reducer index file
  const apiFilePath = path.join(
    __dirname,
    "../packages/frontend/src/redux/reducers",
    "index.js"
  );
  const apiFilePathContent = fs.readFileSync(apiFilePath, "utf8");
  const newImportLine = `import ${pascalCaseName}Reducer from "./${pascalCaseName}Reducer";\n`;
  const newReducerLine = `${camelCaseName}:${pascalCaseName}Reducer,\n`;
  const newApiFileContent = apiFilePathContent
    .replace(
      "/** Script Import New Reducer */",
      `${newImportLine}/** Script Import New Reducer */`
    )
    .replace(
      "/** Script Add New Reducer */",
      `${newReducerLine}/** Script Add New Reducer */`
    );

  fs.writeFileSync(apiFilePath, newApiFileContent, "utf8");

  // Import const template file
  const constTemplateFile = fs.readFileSync(
    path.join(__dirname, "../template", "reduxConst.template.js"),
    "utf8"
  );
  const constantTemplate = Handlebars.compile(constTemplateFile);
  const newConstantData = constantTemplate({
    modelCapital: constantName,
  });

  // Import Constant index file
  const constantFilePath = path.join(
    __dirname,
    "../packages/frontend/src/redux/type.js"
  );

  // Read and Update type file
  const constantFileData = fs.readFileSync(constantFilePath, "utf8");
  const newTypeFileContent = constantFileData.replace(
    "/** Script Add New Const */",
    `${newConstantData}\n/** Script Add New Const */`
  );

  // Write the new type file
  fs.writeFileSync(constantFilePath, newTypeFileContent, "utf8");
  console.log(` Created ${pascalCaseName}Reducer.js and updated index.js`);
};

module.exports = createReducerFile;
