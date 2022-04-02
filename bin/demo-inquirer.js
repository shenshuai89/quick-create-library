var inquirer = require("inquirer");
inquirer
  .prompt([
    {
      name: "author",
      type: "input",
      message: "开发人员姓名",
    },
    {
      name: "age",
      type: "checkbox",
      message: "年龄多大？",
      choices: ["20-30", "30-40", "40以上"],
    },
    {
      name: "salary",
      type: "list",
      message: "薪资多少",
      choices: ["20", "30", "40"],
    },
  ])
  .then((answers) => {
    console.log("answer: ", answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
