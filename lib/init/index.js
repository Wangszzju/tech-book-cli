const inquirer = require('inquirer');
const path = require('path');
const gitUrlParse = require('git-url-parse');
const download = require('download-git-repo');
const exec = require('child_process').exec;
const tplJson = require('../../templates.json');
const { spinnerCreator } = require('../../utils/spinner');

module.exports = () => {
  // 首先获取项目信息
  let needGit = false;
  getNewProjectInfo()
    .then(({ gitRepo, newProjectName, gitInit }) => {
      needGit = gitInit;
      return gitCloneAndCdToDir(gitRepo, newProjectName);
    })
    .then(npmInstall)
    .then(path => {
      if (needGit && path) {
        exec(`cd ${path} && git init`);
      }
    });
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
    },
    {
      type: 'confirm',
      name: 'gitInit',
      message: 'Need Git ? ',
      default: false
    },
  ];
  return inquirer.prompt(questions)
    .then(({ newProjectName, templateName, gitInit }) => {
      const { gitRepo } = tplJson[templateName];
      return { gitRepo, newProjectName, gitInit };
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
    const gitUrlInfo = gitUrlParse(repo);
    const { source, full_name } = gitUrlInfo;
    const type = source.replace('.com', '');
    const projectPath = path.resolve(process.cwd(), projectName);
    download(`${type}:${full_name}`, projectPath, err => {
      if (err) {
        spinner.fail('模板下载失败');
        reject(err);
      } else {
        spinner.succeed('模板下载成功');
        resolve(projectPath);
      }
    });
  });
}
/**
 * 安装依赖
 */
function npmInstall(path) {
  const spinner = spinnerCreator({
    text: '正在安装依赖...'
  });
  spinner.start();
  return new Promise((resolve, reject) => {
    exec(`cd ${path} && npm install`, err => {
      if (err) {
        spinner.fail('依赖安装失败');
        reject(err);
      } else {
        spinner.succeed('依赖安装成功');
        resolve(path);
      }
    });
  });
}
