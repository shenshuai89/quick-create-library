#! /usr/bin/env node 
const program = require("commander");
const { promisify } = require("util");
const asyncFiglet = promisify(require("figlet"));
const chalk = require("chalk");
const log = (content) => console.log(chalk.yellow(content));
const inquirer = require("inquirer");
const init = require("./init");
const { version } = require("../package.json");

program.version(version);

program.option("-n --name <type>", "set project name");
async function printLogo(name) {
  let data = await asyncFiglet(name);
  console.log(data);
}

program
  .command("create <app-name>")
  .description("Create a project")
  // 配置force参数，如果新建的项目已经存在，是否进行覆盖，或者取消创建操作
  .option('-f,--force', 'overwrite target directory if it exists')
  .action(async (name, options) => {
    await printLogo(name);
    log("准备创建项目");
    let answer = await inquirer.prompt([
      {
        name: "language",
        type: "list",
        message: "请选择语言版本",
        choices: ["javascript", "typescript"],
      },
    ]);
    if (answer.language) {
      log("javascript project");
      init(name, options);
    } else {
      log("typescript project TODO::");
    }
  });

program.parse(process.argv);
