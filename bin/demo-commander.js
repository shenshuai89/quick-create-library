#!/usr/bin/env node
const program = require("commander");
program.version("1.0.0");
// program

//  <> 和[]的区别
// <> 表示必选参数，不加参数的话就报错
// []表示可选参数，如果后边不加参数的话，就是布尔值

// command 和 option的区别
// command 执行的命令，传递参数不用再次标识
// option 执行命名时的参数设置，传递参数需要用【-简称】或者【--全称】标识
// program
//   .command("create-app <app-name>")
//   .option("-s --size [size]", "Pizza size", /^(large|medium|small)$/i, "medium")
//   .option("-d --drink <drink>", "Drink", /^(coke|pepsi|izze)$/i)
//   .action((name, options) => {
//     console.log("name done =>", name, options);
//   })
//   .parse(process.argv);
/* test
  node bin/demo1.js setupo -s large -d coke --输出->  name done => setupo { size: 'large', drink: 'coke' }
  node bin/demo1.js  -s large -d coke // 报错， error: missing required argument 'app-name'
   */
/* program
  .command("setup [env]")
  .description("run setup commands for all envs")
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function (env, options) {
    var mode = options.setup_mode || "normal";
    env = env || "all";
    console.log("setup for %s env(s) with %s mode", env, mode);
  })
  .parse(process.argv); */
/* 
  program.parse与action连接书写和分开的区别
  连接书写时：不用再次输入 create 指令,如果输入了create，会把create作为app-name的参数
  分开写时：必须输入 create 指令，否则会报错
   */
/* program
  .command("create <app-name>")
  .description("创建项目")
  .option("-n --name <type>", "output name")
  .action((name, options) => {
    console.log("done", name, options);
  })
  .parse(process.argv); */
/* program
  .command("create <app-name>")
  .description("创建项目")
  .option("-n --name <type>", "output name")
  .action((name, options) => {
    console.log("done", name, options);
  })

program.parse(process.argv); */
program.version("1.1.0");
program
  .command("create <app-name>")
  .option("-n --name <type>", "output name")
  .description("创建项目")
  .action((name, options) => {
    console.log("done", name, options);
  });

program.parse(process.argv);

// const options = program.opts();
// console.log("options: " + JSON.stringify(options));
