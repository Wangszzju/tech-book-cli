const originTemplateJSON = require('../templates.json');
const cloneDeep = require('lodash/cloneDeep');

// 获取Mock的templates.json，检查输出结果
const getMockTemplatesJson = () => {
  return cloneDeep(originTemplateJSON);
};
