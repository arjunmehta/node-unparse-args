var shellescape = require('shell-escape');

function unparse(parsed_args) {
  var argv = [];
  var flag;
  var option;
  var i;

  for (option in parsed_args) {
    if (option === '$0') {
      continue;
    }

    flag = parsed_args[option];

    if (option !== '_') {
      if (testBoolean(flag) === false) {
        argv.push('--no-' + option);
      } else if (option.length === 1) {
        argv.push('-' + option);
      } else {
        argv.push('--' + option);
      }
    }

    if (testBoolean(flag) === true) {
      continue;
    } else {
      if (Array.isArray(flag)) {
        for (i = 0; i < flag.length; i++) {
          argv.push(flag[i]);
        }
      } else if (typeof flag === 'string' || typeof flag === 'number') {
        argv.push('' + flag);
      } else if (typeof flag === 'object') {
        argv = argv.concat('[').concat(unparse(flag)).concat(']');
      }
    }
  }

  Object.defineProperty(argv, 'command_string', {
    enumerable: false,
    get: commandString
  });

  return argv;
}


function testBoolean(flag) {
  if (flag === true || flag === 'true') {
    return true;
  } else if (flag === false || flag === 'false') {
    return false;
  }

  return flag;
}

function commandString() {
  return shellescape(this);
}


module.exports = exports = unparse;
