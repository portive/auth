# JavaScript

To create an `authToken`:

```ts
import { createAuthToken } from "@portive/auth"

const authToken = createAuthToken(process.env.PORTIVE_API_KEY, {
  path: "articles/123", // sub-folder to upload in
  expiresIn: "1d", // expires in 1 day
})
```

Where `process.env.PORTIVE_API_KEY` is from https://admin.portive.com. In this example, the value could be found in the environment. You can use a library like [dotenv](https://www.npmjs.com/package/dotenv) to manage your environment variables.

## Suggested Practices

- Store the API key in an environment variable and not in the source code
- `path`: We recommend using the table/collection name followed by a slash and the record id for your path like `blog_posts/123`
- `expiresIn`: The value is a `number` in seconds or a `string` that describes a duration from the [`ms` library on NPM](https://www.npmjs.com/package/ms) like `1d` (1 day), `1h` (1 hour) or `1m` (1 minute).

## Delivering the `authToken` to Component

How you get the `authToken` to your component depends on the library or framework you are using. See our guides for specific JavaScript frameworks below:

- [Next.js](./next.md)
