var unparse = require('../main');
var subarg = require('subarg');
var minimist = require('minimist');

var fake_argv = [
    'node',
    '/Users/arjun/example/example.js',
    'another',
    '--number',
    '297261',
    '-t',
    'something',
    '-x',
    'something longer than just 1 word',
    '-a',
    '-e'
];

var fake_argv_withSubcontext = [
    'node',
    '/Users/arjun/example/example.js',
    'another',
    '--number',
    '297261',
    '-t',
    'something',
    '-x',
    'something longer than just 1 word',
    '-a',
    '-e',
    '[',
    'subcontext',
    'here',
    '-w',
    'another',
    '-a',
    'something else',
    '-b',
    '276287',
    ']'
];

var subarg_parsed = subarg(fake_argv_withSubcontext);
var minimist_parsed = minimist(fake_argv);
var yargs_parsed = require('yargs').parse(fake_argv);


exports['Exported Properly'] = function(test) {
    test.expect(1);
    test.equal(typeof unparse, 'function');

    test.done();
};

exports['Unparse Subarg with SubContexts'] = function(test) {
    var unparsed = unparse(subarg_parsed);
    var i;

    test.expect(fake_argv_withSubcontext.length);


    for (i = fake_argv_withSubcontext.length - 1; i >= 0; i--) {
        test.equal(fake_argv_withSubcontext[i], unparsed[i]);
    }

    test.done();
};

exports['Unparse Yargs'] = function(test) {
    var unparsed = unparse(yargs_parsed);
    var i;

    test.expect(fake_argv.length);


    for (i = fake_argv.length - 1; i >= 0; i--) {
        test.equal(fake_argv[i], unparsed[i]);
    }

    test.done();
};

exports['Unparse Minimist'] = function(test) {
    var unparsed = unparse(minimist_parsed);
    var i;

    test.expect(fake_argv.length);

    for (i = fake_argv.length - 1; i >= 0; i--) {
        test.equal(fake_argv[i], unparsed[i]);
    }

    test.done();
};

exports['Minimist Command String'] = function(test) {
    var unparsed = unparse(minimist_parsed);
    var unparsed_command_string = unparsed.command_string;

    test.expect(1);

    test.equal(unparsed_command_string, "node '/Users/arjun/example/example.js' another --number 297261 -t something -x 'something longer than just 1 word' -a -e");
    test.done();
};

exports['Subarg Command String with SubContexts'] = function(test) {
    var unparsed = unparse(subarg_parsed);
    var unparsed_command_string = unparsed.command_string;

    test.expect(1);

    test.equal(unparsed_command_string, "node '/Users/arjun/example/example.js' another --number 297261 -t something -x 'something longer than just 1 word' -a -e '[' subcontext here -w another -a 'something else' -b 276287 ']'");
    test.done();
};


exports.tearDown = function(done) {
    done();
};
