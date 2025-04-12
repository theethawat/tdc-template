const fs = require("fs");
const path = require("path");
const changecase = require("change-case");

const updateMenuList = ({
  modelName: inputModelName,
  moduleName: inputModuleName,
  thaiName,
}) => {
  const modelName = changecase.pascalCase(inputModelName);
  const modelAPIName = changecase.kebabCase(inputModelName);
  const moduleName = changecase.pascalCase(inputModuleName);
  const moduleAPIName = changecase.kebabCase(inputModuleName);

  const menuListLink = "../packages/constants/menuList.js";
  const viewFolderPath = path.join(__dirname, menuListLink);
  const menuListFile = fs.readFileSync(viewFolderPath, "utf8");

  const existModuleOrNot = menuListFile.includes(
    `/** Script Add Link ${moduleName} */`
  );

  if (!existModuleOrNot) {
    console.log(`Module ${modelName} not found in menuList.js`);
    const newModuleList = `{
      label: "${moduleName}",
      icon: IconAdjustments,
      initiallyOpened: false,
      links: [
        
        /** Script Add Link ${moduleName} */
      ],
    },
    `;
    const newMenuListFile = menuListFile.replace(
      `/** Script Add Module Link */`,
      `${newModuleList} /** Script Add Module Link */`
    );
    fs.writeFileSync(viewFolderPath, newMenuListFile, "utf8");
  }

  const newLink = `{
    label: "จัดการ${thaiName}",
    link: "/${moduleAPIName}/${modelAPIName}",
  },`;

  const newMenuListFile = menuListFile.replace(
    `/** Script Add Link ${moduleName} */`,
    `${newLink}\n /** Script Add Link ${moduleName} */`
  );
  fs.writeFileSync(viewFolderPath, newMenuListFile, "utf8");
  console.log(`Added ${modelName} to menuList.js`);
};

module.exports = updateMenuList;
