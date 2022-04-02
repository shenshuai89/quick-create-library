const figlet = require("figlet");
const { promisify } = require("util");
const asyncFiglet = promisify(figlet);

// 传统的callback调用方法
/* figlet("Hello World!!", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
}); */
// 使用aysnc 同步调用的方式
async function run(text) {
  try {
    let data = await asyncFiglet(text);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}
run(process.argv[2]);
