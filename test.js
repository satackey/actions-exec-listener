const exec = require('./dist/index')

exec.exec('python -V').then((obj) => console.log(obj))