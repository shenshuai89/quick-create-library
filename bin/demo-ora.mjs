import ora from "ora";

const spinner = ora("Loading unicorns").start();

setTimeout(() => {
  spinner.color = "yellow";
  spinner.text = "Loading rainbows";
  setTimeout(() => {
    spinner.stop();
  }, 500);
}, 1000);
