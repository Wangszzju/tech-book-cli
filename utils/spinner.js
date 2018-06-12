const Ora = require('ora');
const spinnerCreator = (options) => {
  const { spinner = 'triangle' } = options;
  return new Ora({
    ...options,
    spinner
  });
};

exports.spinnerCreator = spinnerCreator;
