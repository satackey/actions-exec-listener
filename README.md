# actions-exec-listener

[@actions/exec](https://www.npmjs.com/package/@actions/exec) wrapper to get listener data value as return value.

## Usage
```js
const exec = require('actions-exec-listener');
// instead of
// const exec = require('@actions/exec');

const options = {};
options.cwd = './lib';
const { stdoutStr: myOutput, stderrStr: myError } = await exec.exec('node', ['index.js', 'foo=bar'], options);
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
$ npm install actions-exec-listener @actions/exec
$ # or
$ yarn add actions-exec-listener @actions/exec
```

## Description
It can be used in the same way as [`@actions/exec`](https://github.com/actions/toolkit/tree/master/packages/exec), except for the return value.

## Return values
`require('actions-exec-listener').exec` returns object containing the below keys.
- Extended from `@actions/exec`
  - `stdout` _Buffer_
  - `stderr` _Buffer_
  - `stdline` _string_
  - `errline` _string_
  - `debug` _string_
- Added by `actions-exec-listener`
  - `stdoutStr`
    - Returned value of `stdout.toString()`.
  - `stderrStr`
    - Returned value of `stderr.toString()`.

## Contribution
PRs are accepted.

If you are having trouble or feature request, [post new issue](https://github.com/satackey/actions-exec-listener/issues/new).
