# actions-exec-wrapper

[@actions/exec](https://www.npmjs.com/package/@actions/exec) wrapper to get listener data value as return value.

## Usage
```js
const exec = require('actions-exec-wrapper');

const options = {};
options.cwd = './lib';
const { stdout: stdBuffer, stderr: errBuffer } = await exec.exec('node', ['index.js', 'foo=bar'], options);
const myOutput = stdBuffer.toString();
const myError = errBuffer.toString();
```

### Using @actions/exec
```js
const exec = require('@actions/exec');

let myOutput = '';
let myError = '';

const options = {};
options.listeners = {
  stdout: (data: Buffer) => {
    myOutput += data.toString();
  },
  stderr: (data: Buffer) => {
    myError += data.toString();
  }
};
options.cwd = './lib';

await exec.exec('node', ['index.js', 'foo=bar'], options);
```
Above code from [actions/toolkit repository](https://github.com/actions/toolkit/tree/master/packages/exec)

## Install
```shell
$ npm install actions-exec-wrapper
$ # or
$ yarn add actions-exec-wrapper
```
