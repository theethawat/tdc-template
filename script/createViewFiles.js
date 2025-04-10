const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const changecase = require("change-case");

const createViewFile = ({
  modelName: inputModelName,
  thaiName,
  moduleName: inputModuleName,
  isCommon = true,
}) => {
  const modelCamelCase = changecase.camelCase(modelName);
  const modelName = changecase.pascalCase(inputModelName);
  const modelAPIName = changecase.kebabCase(inputModelName);
  const moduleAPIName = changecase.kebabCase(inputModuleName);
  const moduleName = changecase.pascalCase(inputModuleName);

  // Import Template file
  const managementTemplateFile = fs.readFileSync(
    path.join(__dirname, "../template", "Management.template.jsx"),
    "utf8"
  );
  const detailTemplateFile = fs.readFileSync(
    path.join(__dirname, "../template", "Detail.template.jsx"),
    "utf8"
  );
  const createTemplateFile = fs.readFileSync(
    path.join(__dirname, "../template", "Create.template.jsx"),
    "utf8"
  );
  const editTemplateFile = fs.readFileSync(
    path.join(__dirname, "../template", "Edot.template.jsx"),
    "utf8"
  );

  const managementTemplate = Handlebars.compile(managementTemplateFile);
  const detailTemplate = Handlebars.compile(detailTemplateFile);
  const createTemplate = Handlebars.compile(createTemplateFile);
  const editTemplate = Handlebars.compile(editTemplateFile);

  const dataPayload = {
    modelName,
    modelCamelCase,
    thaiName,
    moduleRouterName: moduleAPIName,
    routerName: modelAPIName,
  };

  // Writing code for new file
  const newManagementFileData = managementTemplate(dataPayload);
  const newDetailFileData = detailTemplate(dataPayload);
  const newCreateFileData = createTemplate(dataPayload);
  const newEditFileData = editTemplate(dataPayload);

  const viewFolderLink = `../packages/frontend/src/views/${
    isCommon ? "common" : "specific"
  }/${moduleName}`;

  const viewFolderPath = path.join(__dirname, viewFolderLink);
  if (!fs.existsSync(viewFolderPath)) {
    fs.mkdirSync(viewFolderPath, { recursive: true });
  }

  // Writing the new file
  fs.writeFileSync(
    path.join(__dirname, viewFolderLink, `Management${modelName}.jsx`),
    newManagementFileData,
    "utf8"
  );
  fs.writeFileSync(
    path.join(__dirname, viewFolderLink, `Create${modelName}.jsx`),
    newCreateFileData,
    "utf8"
  );
  fs.writeFileSync(
    path.join(__dirname, viewFolderLink, `Detail${modelName}.jsx`),
    newDetailFileData,
    "utf8"
  );
  fs.writeFileSync(
    path.join(__dirname, viewFolderLink, `Edit${modelName}.jsx`),
    newEditFileData,
    "utf8"
  );

  //  Import to index file
  const eachViewIndexFile = path.join(__dirname, "viewFolderLink", "index.js");

  let indexFileContent = "";
  if (fs.existsSync(eachViewIndexFile)) {
    indexFileContent = fs.readFileSync(eachViewIndexFile, "utf8");
  } else {
    indexFileContent = `/** Script Import New View */\n\n\n 
    export default{ /** Script Export View */ };\n\n
    /** ห้ามลบคอมเมนต์ตรงคำว่า 
 Script Import New View, Script Export View
  นะเป็น Script ที่วางเอาไว้ ให้มันอยู่ล่างสุดเสมอ */`;
    fs.writeFileSync(eachViewIndexFile, indexFileContent, "utf8");
  }

  const newImportLine = `import Management${modelName} from "./Management${modelName}";
  import Create${modelName} from "./Create${modelName}";
  import Detail${modelName} from "./Detail${modelName}";
  import Edit${modelName} from "./Edit${modelName}";
  `;
  const newOutputLine = `Create${modelName},\nEdit${modelName},\nDetail${modelName},\nManagement${modelName},\n`;
  const newIndexFileContent = indexFileContent
    .replace(
      "/** Script Import New View */",
      `${newImportLine}/** Script Import New View */`
    )
    .replace(
      "/** Script Export View */",
      `${newOutputLine}/** Script Export View */`
    );

  fs.writeFileSync(eachViewIndexFile, newIndexFileContent, "utf8");
};

module.exports = createViewFile;
