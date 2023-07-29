import * as core from '@actions/core'
import * as github from '@actions/github'
import {shorten} from './shorten'

async function run(): Promise<void> {
  try {
    await shorten({core, github})
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
