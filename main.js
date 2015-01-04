var shellescape = require('shell-escape');

function unparse(parsed_args) {

    var argv = [],
        flag;

    for (var option in parsed_args) {

        if (option === '$0') {
            continue;
        }
        flag = parsed_args[option];

        if (option !== '_') {
            if (option.length === 1) {
                argv.push('-' + option);
            } else {
                argv.push('--' + option);
            }
        }

        if (flag === 'true') {
            continue;
        } else {
            if (Array.isArray(flag)) {
                for (var i = 0; i < flag.length; i++) {
                    argv.push(flag[i]);
                }
            } else if (typeof flag === 'string') {
                argv.push('' + flag);
            } else if (typeof flag === 'number') {
                argv.push('' + flag);
            } else if (typeof flag === 'object') {
                argv = argv.concat('[').concat(unparse(flag)).concat(']');
            }
        }
    }

    Object.defineProperty(argv, "command_string", {
        enumerable: false,
        get: commandString
    });

    return argv;
}

function commandString() {
    return shellescape(this);
}

// Unparsed Object is just an Array with a special method

// function Unparsed(){}

// Unparsed.prototype = [];

// Object.defineProperty(Unparsed.prototype, "command_string", {
//   enumerable: false,
//   get: function(){
//     return shellescape(this);
//   }
// });

// Object.defineProperty(Unparsed.prototype, "raw", {
//   enumerable: false,
//   get: function(){
//     return this.concat();
//   }
// });


// Export

module.exports = exports = unparse;
