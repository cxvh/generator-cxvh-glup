"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the badass ${chalk.red("generator-cxvh-gulp")} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        // Name: 'someAnswer',
        name: "install",
        message: "Would you like to enable this option?",
        default: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath("**"), // 把所有文件都复制到 generator
      this.destinationPath("./") // 当前目录
    );
  }

  install() {
    this.installDependencies({
      bower: false
    });
  }
};
