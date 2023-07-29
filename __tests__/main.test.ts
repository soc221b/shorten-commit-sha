import {shorten} from '../src/shorten'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
import core from '@actions/core'

test('default', async () => {
  const input: Record<string, string> = {
    env_name: 'shortened_commit_sha',
    length: '7',
    output_name: 'shortened_commit_sha',
    pull_request_github_sha: 'github.sha'
  }
  const getInput: typeof core.getInput = name => {
    return input[name]
  }
  const output: Record<string, string> = {}
  const setOutput: typeof core.setOutput = (name, value) => {
    output[name] = value
  }
  const env: Record<string, string> = {}
  const exportVariable: typeof core.exportVariable = (name, value) => {
    env[name] = value
  }

  await shorten({
    core: {getInput, setOutput, exportVariable},
    github: {
      context: {
        eventName: 'push',
        payload: {},
        sha: 'Lorem Ipsum is simply dummy text of the '
      }
    }
  })

  expect(output).toEqual({shortened_commit_sha: 'Lorem I'})
  expect(env).toEqual({shortened_commit_sha: 'Lorem I'})
})

test('env_name', async () => {
  const input: Record<string, string> = {
    env_name: 'foo',
    length: '7',
    output_name: 'shortened_commit_sha',
    pull_request_github_sha: 'github.sha'
  }
  const getInput: typeof core.getInput = name => {
    return input[name]
  }
  const output: Record<string, string> = {}
  const setOutput: typeof core.setOutput = (name, value) => {
    output[name] = value
  }
  const env: Record<string, string> = {}
  const exportVariable: typeof core.exportVariable = (name, value) => {
    env[name] = value
  }

  await shorten({
    core: {getInput, setOutput, exportVariable},
    github: {
      context: {
        eventName: 'push',
        payload: {},
        sha: 'Lorem Ipsum is simply dummy text of the '
      }
    }
  })

  expect(output).toEqual({shortened_commit_sha: 'Lorem I'})
  expect(env).toEqual({foo: 'Lorem I'})
})

test('length', async () => {
  const input: Record<string, string> = {
    env_name: 'shortened_commit_sha',
    length: '8',
    output_name: 'shortened_commit_sha',
    pull_request_github_sha: 'github.sha'
  }
  const getInput: typeof core.getInput = name => {
    return input[name]
  }
  const output: Record<string, string> = {}
  const setOutput: typeof core.setOutput = (name, value) => {
    output[name] = value
  }
  const env: Record<string, string> = {}
  const exportVariable: typeof core.exportVariable = (name, value) => {
    env[name] = value
  }

  await shorten({
    core: {getInput, setOutput, exportVariable},
    github: {
      context: {
        eventName: 'push',
        payload: {},
        sha: 'Lorem Ipsum is simply dummy text of the '
      }
    }
  })

  expect(output).toEqual({shortened_commit_sha: 'Lorem Ip'})
  expect(env).toEqual({shortened_commit_sha: 'Lorem Ip'})
})

test('output_name', async () => {
  const input: Record<string, string> = {
    env_name: 'shortened_commit_sha',
    length: '7',
    output_name: 'foo',
    pull_request_github_sha: 'github.sha'
  }
  const getInput: typeof core.getInput = name => {
    return input[name]
  }
  const output: Record<string, string> = {}
  const setOutput: typeof core.setOutput = (name, value) => {
    output[name] = value
  }
  const env: Record<string, string> = {}
  const exportVariable: typeof core.exportVariable = (name, value) => {
    env[name] = value
  }

  await shorten({
    core: {getInput, setOutput, exportVariable},
    github: {
      context: {
        eventName: 'push',
        payload: {},
        sha: 'Lorem Ipsum is simply dummy text of the '
      }
    }
  })

  expect(output).toEqual({foo: 'Lorem I'})
  expect(env).toEqual({shortened_commit_sha: 'Lorem I'})
})

test('pull_request_github_sha', async () => {
  const input: Record<string, string> = {
    env_name: 'shortened_commit_sha',
    length: '7',
    output_name: 'shortened_commit_sha',
    pull_request_github_sha: 'github.event.pull_request.head.sha'
  }
  const getInput: typeof core.getInput = name => {
    return input[name]
  }
  const output: Record<string, string> = {}
  const setOutput: typeof core.setOutput = (name, value) => {
    output[name] = value
  }
  const env: Record<string, string> = {}
  const exportVariable: typeof core.exportVariable = (name, value) => {
    env[name] = value
  }

  await shorten({
    core: {getInput, setOutput, exportVariable},
    github: {
      context: {
        eventName: 'pull_request',
        payload: {
          pull_request: {
            body: undefined,
            html_url: undefined,
            number: 0,
            head: {sha: 'Sed ut perspiciatis unde omnis iste natu'}
          }
        },
        sha: 'Lorem Ipsum is simply dummy text of the '
      }
    }
  })

  expect(output).toEqual({shortened_commit_sha: 'Sed ut '})
  expect(env).toEqual({shortened_commit_sha: 'Sed ut '})
})
