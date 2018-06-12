const inquirer = require('inquirer');
const exec = require('child_process').exec;
const tplJson = require('../../templates.json');
const { spinnerCreator } = require('../../utils/spinner');

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
  const spinner = spinnerCreator({
    text: '正在下载模板...'
  });
  spinner.start();
  return new Promise((resolve, reject) => {
    exec(`git clone ${repo} ${projectName} && cd ${projectName}`, err => {
      if (err) {
        spinner.fail('模板下载失败');
        reject(err);
      } else {
        spinner.succeed('模板下载成功');
        resolve(repo);
      }
    });
  });
}

function npmInstall() {
  const spinner = spinnerCreator({
    text: '正在安装依赖...'
  });
  spinner.start();
  return new Promise((resolve, reject) => {
    exec('npm install', err => {
      if (err) {
        spinner.fail('依赖安装失败');
        reject(err);
      } else {
        spinner.succeed('依赖安装成功');
        resolve();
      }
    });
  });
}
