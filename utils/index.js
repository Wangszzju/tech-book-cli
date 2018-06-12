const gitRepoRegExp = /^(git)@((\w|\.)+)\:(\w+)\/(.+?)(\.git)$/;

const checkGitRepo = val => gitRepoRegExp.test(val);

module.exports = {
  checkGitRepo
};