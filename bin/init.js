const { promisify } = require("util");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const ora = require("ora");
const inquirer = require("inquirer");
const download = promisify(require("download-git-repo"));
const shell = require("shelljs");
const chalk = require("chalk");
const log = (content) => console.log(chalk.yellow(content));

module.exports = async (name, options) => {
  const cwd = process.cwd(); //获取当前命令行所在目录
  const targetPath = path.join(cwd, name); //生成项目路径
  if (fs.existsSync(targetPath)) {
    if (options.force) {
      // --force 配置直接移除旧的项目
      shell.rm("-rf", name);
    } else {
      //否则的话 让用户选择是要覆盖还是退出
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Target directory already exists,please choose an action:",
          choices: [
            {
              name: "Overwrite",
              value: "overwrite",
            },
            {
              name: "Cancel",
              value: false,
            },
          ],
        },
      ]);
      // 选择cancle就直接退出
      if (!action) return;
      else {
        shell.rm("-rf", name);
      }
    }
  }
  log(`create project ${name}`);
  const spinner = ora("loading...").start();

  try {
    await download(
      "direct:https://github.com/shenshuai89/librarytemp.git#main",
      name,
      { clone: true }
    );
    spinner.succeed("🚀🚀🚀 download success!");
    /* 动态设置模版信息 */
    const pkgPath = path.resolve(targetPath, "pkg.json");
    const packagePath = path.join(targetPath, "package.json");
    // 设置examples中的文件引入
    const exampleIndexPath = path.join(targetPath, "examples/index.html");
    const exampleNodePath = path.join(targetPath, "examples/useNodeTest.js");
    let pkgData;
    if (fs.existsSync(pkgPath)) {
      const pkg = fs.readFileSync(pkgPath).toString();
      //这里会询问pkg.json里面的那些问题，并将用户的交互内容返回
      pkgData = await inquirer.prompt(JSON.parse(pkg));
    }
    console.log({ projectName: name, ...pkgData });
    if (fs.existsSync(packagePath)) {
      const content = fs.readFileSync(packagePath).toString();
      //编译package.json文件
      const result = ejs.compile(content)({ projectName: name, ...pkgData });
      fs.writeFileSync(packagePath, result);
    }
    if (fs.existsSync(exampleIndexPath)) {
      const content = fs.readFileSync(exampleIndexPath).toString();
      //编译package.json文件
      const result = ejs.compile(content)({ projectName: name });
      fs.writeFileSync(exampleIndexPath, result);
    }
    if (fs.existsSync(exampleNodePath)) {
      const content = fs.readFileSync(exampleNodePath).toString();
      //编译package.json文件
      const result = ejs.compile(content)({ projectName: name });
      fs.writeFileSync(exampleNodePath, result);
    }

    log(`
=================================================
cd ${name}
yarn or npm install
yarn run dev   
    `);
    // 删除pkg.json文件
    fs.unlinkSync(pkgPath);
  } catch (error) {
    console.error(error);
    log("⚡️⚡️⚡️ download failed");
    spinner.stop();
  }
};
