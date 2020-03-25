const actionsExec = require('@actions/exec')
import { ExecOptions } from '@actions/exec/lib/interfaces'

const exec = async (command: string, args?: string[], options?: ExecOptions) => {
  let stdout = Buffer.concat([], 0)
  let stderr = Buffer.concat([], 0)
  let stdline = ''
  let errline = ''
  let debug = ''

  const listeners = {
    stdout: (data: Buffer) => {
      const concatData = [stdout, data]
      const concatLength = stdout.length + data.length
      stdout = Buffer.concat(concatData, concatLength)
    },
    stderr: (data: Buffer) => {
      const concatData = [stderr, data]
      const concatLength = stderr.length + data.length
      stderr = Buffer.concat(concatData, concatLength)
    },
    stdline: (data: Buffer) => {
      stdline += data.toString()
    },
    errline: (data: Buffer) => {
      stdline += data.toString()
    },
    debug: (data: Buffer) => {
      stdline += data.toString()
    }
  }

  const exitCode = await actionsExec.exec(command, args, {
    listeners,
    ...options,
  })

  return {
    exitCode,
    stdout,
    stdoutStr: stdout.toString(),
    stderr,
    stderrStr: stderr.toString(),
    stdline,
    errline,
    debug,
  }
}

module.exports = {
  ...actionsExec,
  exec,
}
// module.exports.exec = exec