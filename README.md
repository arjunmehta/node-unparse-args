unparse-args
=================

A node.js module to help you unparse parsed arguments back to the original argv array or a command string.

## Purpose

Imagine a hypothetical command string with flags, subcommands, options... etc:

```bash
node example.js another --number 297261 -t something -x 'something longer than just 1 word' -a -e
```

Popular argument parsing modules for node.js yargs, subargs, and minimist all parse these into an object like: 

```javascript
{ 
    _: [ 'node', '/Users/arjun/example/example.js', 'another' ],
    number: 297261,
    t: 'something',
    x: 'something longer than just 1 word',
    a: true,
    e: true
}
```

Unparse parsed arguments back to an argv pseudo-array or a command string.

Works with:
- **yargs/optimist**
- **minimist**
- **subarg** (and handles subcontexts)

## Installation
```bash
npm install --save unparse-args
```

## Basic Usage

### Include

```javascript
var unparse = require('unparse-args');
```

### Unparse Parsed Arguments

Assume some parsed arguments.
```javascript
var parsed = subarg(process.argv);
// OR
var parsed = minimist(process.argv);
// OR
var parsed = require('yargs').parse(process.argv);
```

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

I know I know, unparsed is an `array`, so how can it have a **property**?? Magic.

## License

The MIT License (MIT)
Copyright (c) 2014 Arjun Mehta