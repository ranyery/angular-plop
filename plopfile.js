// @ts-check

const foldersWithGitkeep = ["components", "pages", "models"];

const actionsGitkeep = foldersWithGitkeep.map((folderName) => ({
  type: "add",
  path: `src/app/modules/{{ kebabCase name }}/${folderName}/.gitkeep`,
}));

// https://plopjs.com/documentation/
/** @param { import('plop').NodePlopAPI } plop */
module.exports = function (plop) {
  plop.setGenerator("module", {
    description: "Create a new module",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Please insert the module's name:",
      },
    ],
    actions: [
      ...actionsGitkeep,
      {
        type: "add",
        path: "src/app/modules/{{ kebabCase name }}/apis/{{ kebabCase name }}.api.ts",
        templateFile: "plop-templates/module/api.hbs",
      },
      {
        type: "add",
        path: "src/app/modules/{{ kebabCase name }}/services/{{ kebabCase name }}.service.ts",
        templateFile: "plop-templates/module/service.hbs",
      },
      {
        type: "add",
        path: "src/app/modules/{{ kebabCase name }}/{{ kebabCase name }}-routing.module.ts",
        templateFile: "plop-templates/module/routing-module.hbs",
      },
      {
        type: "add",
        path: "src/app/modules/{{ kebabCase name }}/{{ kebabCase name }}.facade.ts",
        templateFile: "plop-templates/module/facade.hbs",
      },
      {
        type: "add",
        path: "src/app/modules/{{ kebabCase name }}/{{ kebabCase name }}.module.ts",
        templateFile: "plop-templates/module/module.hbs",
      },
      // {
      //   type: "modify",
      //   path: "src/app/modules/{{ kebabCase name }}/{{ kebabCase name }}.module.ts",
      //   pattern: /(\/\/ Placeholder)/g,
      //   template: "// Placeholder Alterado",
      // },
    ],
  });
};
