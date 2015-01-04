var unparse = require('../main');
var subarg = require('subarg');
var minimist = require('minimist');

var fake_argv = [
    "node",
    "/Users/arjun/example/example.js",
    "another",
    "--number",
    "297261",
    "-t",
    "something",
    "-x",
    "something longer than just 1 word",
    "-a",
    "-e"
];

var fake_argv_withSubcontext = [
    "node",
    "/Users/arjun/example/example.js",
    "another",
    "--number",
    "297261",
    "-t",
    "something",
    "-x",
    "something longer than just 1 word",
    "-a",
    "-e",
    "[",
    "subcontext",
    "here",
    "-w",
    "another",
    "-a",
    "something else",
    "-b",
    "276287",
    "]"
];

var subarg_parsed = subarg(fake_argv_withSubcontext);
var minimist_parsed = minimist(fake_argv);
var yargs_parsed = require('yargs').parse(fake_argv);

// console.log('subarg_parsed', subarg_parsed);
// console.log('minimist_parsed', minimist_parsed);
// console.log('yargs_parsed', yargs_parsed);

exports['Exported Properly'] = function(test) {
    test.expect(1);
    test.equal(typeof unparse, 'function');

    test.done();
};

exports['Unparse Subarg with SubContexts'] = function(test) {

    test.expect(fake_argv_withSubcontext.length);

    var unparsed = unparse(subarg_parsed);

    for (var i = fake_argv_withSubcontext.length - 1; i >= 0; i--) {
        test.equal(fake_argv_withSubcontext[i], unparsed[i]);
    }

    test.done();
};

exports['Unparse Yargs'] = function(test) {

    test.expect(fake_argv.length);

    var unparsed = unparse(yargs_parsed);

    for (var i = fake_argv.length - 1; i >= 0; i--) {
        test.equal(fake_argv[i], unparsed[i]);
    }

    test.done();
};

exports['Unparse Minimist'] = function(test) {

    test.expect(fake_argv.length);

    var unparsed = unparse(minimist_parsed);

    for (var i = fake_argv.length - 1; i >= 0; i--) {
        test.equal(fake_argv[i], unparsed[i]);
    }

    test.done();
};

exports['Minimist Command String'] = function(test) {

    test.expect(1);

    var unparsed = unparse(minimist_parsed);
    var unparsed_command_string = unparsed.command_string;

    test.equal(unparsed_command_string, "node $'/Users/arjun/example/example.js' another --number 297261 -t something -x $'something longer than just 1 word' -a -e");
    test.done();
};

exports['Subarg Command String with SubContexts'] = function(test) {

    test.expect(1);

    var unparsed = unparse(subarg_parsed);
    var unparsed_command_string = unparsed.command_string;

    test.equal(unparsed_command_string, "node $'/Users/arjun/example/example.js' another --number 297261 -t something -x $'something longer than just 1 word' -a -e $'[' subcontext here -w another -a $'something else' -b 276287 $']'");
    test.done();
};


exports['tearDown'] = function(done) {
    done();
};
