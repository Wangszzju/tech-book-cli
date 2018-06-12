const templatesJSON = require('../../templates.json');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { checkGitRepo } = require('../../utils/index');
const { writeJsonToTplFile } = require('../../utils/tpls');
const questions = [
  {
    type: 'name',
    name: 'name',
    message: '请输入模板名称',
    validate: val => {
      return !!val || '模板名称不能为空';
    }
  },
  {
    type: 'input',
    name: 'gitRepo',
    message: '请输入模板的Git地址',
    validate: val => {
      return checkGitRepo(val) || '请输入合法的GitRepo地址';
    }
  }
];

function askUserConfirmUpdate() {
  return inquirer.prompt({
    name: 'update',
    type: 'confirm',
    message: '模板已经存在，你确定要更新吗？'
  });
}

module.exports = () => {
  inquirer.prompt(questions)
    .then(answers => {
      const { name, gitRepo } = answers;
      // 如果模板已经存在，那么就提醒用户确认是否要更新
      if (templatesJSON[name]) {
        askUserConfirmUpdate()
          .then(({ update }) => {
            if (update) {
              templatesJSON[name] = { name, gitRepo };
              writeJsonToTplFile(templatesJSON)
                .then(() => {
                  chalk.green(`Update the tpl, ${name}, successfully！`);
                });
            }
          });
      } else {
        templatesJSON[name] = { name, gitRepo };
        writeJsonToTplFile(templatesJSON)
          .then(() => {
            chalk.green(`Add the tpl, ${name}, successfully！`);
          });
      }
    });
};


