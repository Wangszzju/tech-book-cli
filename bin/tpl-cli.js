#!/usr/bin/env node

const program = require('commander');
const packageInfo = require('../package.json');

const list = require('../lib/list');
const add = require('../lib/add');
const init = require('../lib/init');
const deleteTpl = require('../lib/delete');

program
  .version(packageInfo.version)
  .usage('<command> [options]');

// 列出所有模板
program
  .command('list')
  .description('显示所有模板')
  .action(list);

// 添加模板
program
  .command('add')
  .description('添加模板')
  .action(add);

// 生成项目
program
  .command('init')
  .description('生成项目')
  .action(init);

// 生成项目
program
  .command('delete')
  .description('删除项目')
  .action(deleteTpl);

// 解析参数
program.parse(process.argv);
