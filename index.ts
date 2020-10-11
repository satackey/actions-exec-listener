import * as actionsExec from '@actions/exec'
import { ExecOptions } from '@actions/exec/lib/interfaces'

export const exec = async (command: string, args?: string[], options?: ExecOptions) => {
  const originalListeners = options?.listeners
  let stdout = Buffer.concat([], 0)
  let stderr = Buffer.concat([], 0)
  let stdline = ''
  let errline = ''
  let debug = ''

  const listeners: ExecOptions['listeners'] = {
    stdout: (data: Buffer): void => {
      const concatData = [stdout, data]
      const concatLength = stdout.length + data.length
      stdout = Buffer.concat(concatData, concatLength)

      if (originalListeners?.stdout != null) {
        originalListeners.stdout(data)
      }
    },
    stderr: (data: Buffer): void => {
      const concatData = [stderr, data]
      const concatLength = stderr.length + data.length
      stderr = Buffer.concat(concatData, concatLength)

      if (originalListeners?.stderr != null) {
        originalListeners.stderr(data)
      }
    },
    stdline: (data: string): void => {
      stdline += data.toString()

      if (originalListeners?.stdline != null) {
        originalListeners.stdline(data)
      }
    },
    errline: (data: string): void => {
      stdline += data.toString()

      if (originalListeners?.errline != null) {
        originalListeners.errline(data)
      }
    },
    debug: (data: string): void => {
      stdline += data.toString()

      if (originalListeners?.debug != null) {
        originalListeners.debug(data)
      }
    }
  }

  const exitCode = await actionsExec.exec(command, args, {
    ...options,
    listeners,
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
