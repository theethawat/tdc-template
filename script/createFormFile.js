const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const changecase = require("change-case");

const createFormFile = ({ modelName: inputModelName, isCommon = true }) => {
  const modelCamelCase = changecase.camelCase(inputModelName);
  const modelName = changecase.pascalCase(inputModelName);
  const modelAPIName = changecase.kebabCase(inputModelName);

  // Import Template file
  const formTemplateFile = fs.readFileSync(
    path.join(__dirname, "../template", "Form.template.jsx"),
    "utf8"
  );

  const formTemplate = Handlebars.compile(formTemplateFile);

  // Writing code for new file
  const newFormFileData = formTemplate({ modelName });

  const formFolderLink = `../packages/frontend/src/components/${
    isCommon ? "common" : "specific"
  }/forms`;

  // Writing the new file
  fs.writeFileSync(
    path.join(__dirname, formFolderLink, `${modelName}Form.jsx`),
    newFormFileData,
    "utf8"
  );

  //  Import to index file
  const eachViewIndexFile = path.join(__dirname, formFolderLink, "index.js");

  const indexFileContent = fs.readFileSync(eachViewIndexFile, "utf8");

  const newImportLine = `import ${modelName}Form from "./${modelName}Form";`;
  const newIndexFileContent = indexFileContent
    .replace(
      "/** Script Import New Form */",
      `${newImportLine}/** Script Import New Form */`
    )
    .replace(
      " /** Script Export New Form */",
      `${modelName}Form,\n /** Script Export New Form */`
    )
    .replace(
      "/** Script Export Default New Form */",
      `${modelName}Form,\n/** Script Export Default New Form */`
    );

  fs.writeFileSync(eachViewIndexFile, newIndexFileContent, "utf8");

  console.log(
    `Create ${modelName} Form files successfully in ${formFolderLink}`
  );
};

module.exports = createFormFile;
