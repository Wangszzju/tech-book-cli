const path = require('path');
const targetPath = path.resolve(__dirname, '../templates.json');
const fs = require('fs');

function writeJsonToTplFile(jsonData) {
  return new Promise((resolve, reject) => {
    fs.writeFile(targetPath, JSON.stringify(jsonData), 'utf-8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  writeJsonToTplFile
};
