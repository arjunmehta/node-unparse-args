unparse-args
=================

[![Build Status](https://travis-ci.org/arjunmehta/node-unparse-args.svg?branch=master)](https://travis-ci.org/arjunmehta/node-unparse-args)

A node.js module to help you unparse parsed arguments back to the original argv array or a command string.

This module will:
- **unparse parsed arguments back to an argv array**
- **easily regenerate a command string based on the unparsed array**
- **work with [yargs](https://github.com/chevex/yargs), [minimist](https://github.com/substack/minimist), and [subarg](https://github.com/substack/subarg) (also handles subcontexts)**

## Use Scenario
Imagine a hypothetical command string with flags, subcommands, options... etc:

```bash
node example.js another --number 297261 -t something -x 'something longer than just 1 word' -a -e
```

Popular argument parsing modules for node.js: [yargs](https://github.com/chevex/yargs), [subarg](https://github.com/substack/subarg), and [minimist](https://github.com/substack/minimist) all parse these into an object like: 

```javascript
var args = { 
    _: [ 'node', '/Users/arjun/example/example.js', 'another' ],
    number: 297261,
    t: 'something',
    x: 'something longer than just 1 word',
    a: true,
    e: true
};
```

But we might want to manipulate it and flatten it out again to be like:
```javascript
['node', '/Users/arjun/example/example.js', 'another', '--number', '297261', '-t', 'something', '-x', 'something longer than just 1 word', '-a', '-e']
```

## Installation
```bash
npm install --save unparse-args
```

## Basic Usage

### Include

```javascript
var unparse = require('unparse-args');
```

Assume some parsed arguments.
```javascript
var parsed = subarg(process.argv);
// OR
var parsed = minimist(process.argv);
// OR
var parsed = require('yargs').parse(process.argv);
```

### Unparse Parsed Arguments

Easily unparse them into an array.
```javascript
var unparsed = unparse(parsed)
console.log(unparsed); // ['node', 'example.js', 'another', '--number', '297261', '-t', 'something', '-x', 'something longer than just 1 word', '-a', '-e']
```

### Convert Arg Array to Command String

```javascript
var command_string = unparsed.command_string;
console.log(command_string); // node example.js another --number 297261 -t something -x $'something longer than just 1 word' -a -e
```

I know I know, unparsed is an `array`, so how can it have a **property**?? [Magic](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty).

## License

The MIT License (MIT)
Copyright (c) 2014 Arjun Mehta