const templatesJSON = require('../../templates.json');
const chalk = require('chalk');
const tplKeys = Object.keys(templatesJSON);

const colorMap = ['red', 'yellow', 'green', 'blue'];

module.exports = () => {
  if (!tplKeys.length) {
    console.log('暂无模板');
  } else {
    console.log('目前的模板为：');
    tplKeys.forEach((key, index) => {
      const outputFormat = `${index + 1}) TplName: ${templatesJSON[key].name}；TplRepo: ${templatesJSON[key].gitRepo}`;
      const colorMethod = colorMap[Math.floor(index++ % 4)];
      console.log(chalk[colorMethod](outputFormat));
    });
  }
};

