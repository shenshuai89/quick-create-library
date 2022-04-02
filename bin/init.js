const { promisify } = require("util");
const ora = require("ora");
const download = promisify(require("download-git-repo"));
const clone = require("git-clone/promise");
const shell = require("shelljs");
const chalk = require("chalk");
const log = (content) => console.log(chalk.yellow(content));

module.exports = async (name) => {
  log("creat project");
  const spinner = ora("loading...").start();
  shell.rm("-rf", name);
  try {
    await download(
      "direct:https://github.com/shenshuai89/librarytemp.git#main",
      name,
      { clone: true }
    );
    spinner.succeed("🚀🚀🚀 下载成功");
    log(`
=================================================
cd ${name}
yarn or npm install
yarn run dev   
    `)
  } catch (error) {
    console.error(error);
    log("⚡️⚡️⚡️下载失败");
    spinner.stop();
  }
};
