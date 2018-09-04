# graphql-middleware-bugsnag

> GraphQL Middleware plugin for Bugsnag.

## Usage

> With GraphQL Yoga

```ts
import { GraphQLServer } from 'graphql-yoga'
import { bugsnag } from 'graphql-middleware-bugsnag'

const typeDefs = `
  type Query {
    hello: String!
    bug: String!
  }
`

const resolvers = {
  Query: {
    hello: () => `Hey there!`
    bug: () => {
      throw new Error(`Many bugs!`)
    }
  }
}

const bugsnagMiddleware = bugsnag({
  apiKey: BUGSNAG_API_KEY
})

const server = GraphQLServer({
  typeDefs,
  resolvers,
  middlewares: [bugsnagMiddleware]
})

serve.start(() => `Server running on http://localhost:4000`)
```

## API & Configuration

```ts
export interface Options {
  apiKey: string
  forwardErrors?: boolean
}

const bugsnag = (options: Options): IMiddlewareFunction
```

### Options

| property        | required | description                                                   |
| --------------- | -------- | ------------------------------------------------------------- |
| `apiKey`        | true     | Your Bugsnag API KEY                                          |
| `forwardErrors` | false    | Should middleware forward errors to the client or block them. |

## License

This project is licensed under the [MIT License](LICENSE.md).
