import type * as core from '@actions/core'
import type * as github from '@actions/github'

type Param = {
  core: Pick<typeof core, 'getInput' | 'setOutput' | 'exportVariable'>
  github: {
    context: {
      sha: typeof github.context.sha
      eventName: typeof github.context.eventName
      payload: Pick<typeof github.context.payload, 'pull_request'>
    }
  }
}

export async function shorten(param: Param): Promise<void> {
  const sha =
    param.github.context.eventName === 'pull_request' &&
    param.core.getInput('pull_request_github_sha') ===
      'github.event.pull_request.head.sha'
      ? (param.github.context.payload.pull_request?.head.sha ??
        (() => {
          throw ReferenceError('cannot get github.event.pull_request.head.sha')
        })())
      : param.github.context.sha

  const shortened_sha = sha.slice(
    0,
    parseInt(param.core.getInput('length'), 10)
  )

  param.core.setOutput(param.core.getInput('output_name'), shortened_sha)
  param.core.exportVariable(param.core.getInput('env_name'), shortened_sha)
}
