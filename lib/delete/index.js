const templatesJSON = require('../../templates.json');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { writeJsonToTplFile } = require('../../utils/tpls');

const tplNames = Object.keys(templatesJSON);

const questions = [
  {
    type: 'checkbox',
    name: 'targets',
    message: '请问你要删除哪些模板？',
    choices: tplNames
  }
];

module.exports = () => {
  // 如果没什么可删除的，直接退出
  if (!tplNames.length) {
    console.log(chalk.yellow('没什么可删除的，退下吧'));
    return false;
  } else {
    inquirer.prompt(questions)
      .then(({ targets }) => {
        if (!targets.length) {
          console.log(chalk.red('你什么也没有删啊'));
          return;
        }
        targets.forEach(name => {
          delete templatesJSON[name];
        });
        writeJsonToTplFile(templatesJSON)
          .then(() => {
            console.log(chalk.red(`成功删除${targets.join('、')}等模板`));
          });
      });
  }
};