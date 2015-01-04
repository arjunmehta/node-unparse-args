node-unparse-args
=================

Unparse parsed arguments back to an argv pseudo-array or a command string.
Works with:
- **yargs**
- **minimist**
- **optimist**
- **subarg (!!)**

Imagine a hypothetical command string with flags, subcommands, options... etc:

```bash
node example.js another --number 297261 -t something -x 'something longer than just 1 word' -a -e
```

We've parsed it with yargs, minimist or subarg but we want to take arguments passed in that style and get the original argv array or command string!

**Well this module is the one for you!**

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