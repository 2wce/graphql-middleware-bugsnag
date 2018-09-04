import * as bugsnagClient from 'bugsnag'
import { IMiddlewareFunction } from 'graphql-middleware/dist/types'

// Options for graphql-middleware-bugsang
export interface Options {
  apiKey: string,
  forwardErrors?: boolean
}

export class BugsnagError extends Error {
  constructor(...props) {
    super(...props)
  }
}

const normalizeOptions = (options: Options): Options => {
  // Check if bugsnag API KEY is present
  if (!options.apiKey) {
    throw new BugsnagError('Missing api key parameter in configuration.')
  }

  return {
    apiKey: options.apiKey,
    forwardErrors:
      options.forwardErrors !== undefined ? options.forwardErrors : false
  }
}

export const bugsnag = (_options: Options): IMiddlewareFunction => {
  const options = normalizeOptions(_options)

  // Configure and install Raven
  bugsnagClient.register(options.apiKey)

  // Return middleware resolver
  return async (resolve, parent, args, ctx, info) => {
    try {
      const res = await resolve(parent, args, ctx, info)
      return res
    } catch (error) {
      // Notify bugsnag
      bugsnagClient.notify(error)

      // Forward error
      if (options.forwardErrors) {
        throw error
      }
    }
  }
}
