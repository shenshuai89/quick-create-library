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
async function printLogo() {
  let data = await asyncFiglet("quick-cli");
  console.log(data);
}

program
  .command("create <app-name>")
  .description("Create a project")
  .action(async (name) => {
    await printLogo();
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
      log("javascript: ");
      init(name);
    } else {
      log("typescript: ");
    }
  });

program.parse(process.argv);
