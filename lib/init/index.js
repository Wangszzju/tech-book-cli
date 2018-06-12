const inquirer = require('inquirer');
const exec = require('child_process').exec;
const tplJson = require('../../templates.json');

module.exports = () => {
  // 首先获取项目信息
  getNewProjectInfo()
    .then(({ gitRepo, newProjectName }) => {
      return gitCloneAndCdToDir(gitRepo, newProjectName);
    })
    .then(npmInstall);
};

/**
 * 获取新项目的配置信息
 */
function getNewProjectInfo() {
  const questions = [
    {
      type: 'input',
      name: 'newProjectName',
      message: '请输入新项目的名称'
    },
    {
      type: 'list',
      name: 'templateName',
      message: '请选择模板',
      choices: Object.keys(tplJson)
    }
  ];
  return inquirer.prompt(questions)
    .then(({ newProjectName, templateName }) => {
      const { gitRepo } = tplJson[templateName];
      return { gitRepo, newProjectName };
    });
}

/**
 * Clone仓库并且安装依赖
 * @param {*} repo git仓库地址
 */
function gitCloneAndCdToDir(repo, projectName) {
  return new Promise((resolve, reject) => {
    exec(`git clone ${repo} ${projectName} && cd ${projectName}`, err => {
      if (err) {
        reject(err);
      } else {
        resolve(repo);
      }
    });
  });
}

function npmInstall() {
  return new Promise((resolve, reject) => {
    exec('npm install', err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
