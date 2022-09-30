# Getting Started with Next.js

There are two ways to generate and use auth tokens securely in Next.js.

- [Getting Started with `getServerSideProps`](#getting-started-with-getserversideprops)
- [Getting Started with Next.js API routes]()

## Getting Started with `getServerSideProps`

The easiest way to use auth tokens in Next.js is to generate the auth tokens in `getServerSideProps` and pass it to the component.

This example assumes that you've set up an environment variable for `PORTIVE_API_KEY`.
Learn [how to set up environment variables with Next.js here](https://nextjs.org/docs/basic-features/environment-variables).

```javascript
import { createAuthToken } from "@portive/auth"

export async function getServerSideProps(context) {
  // Create an Auth Token that expires in one day
  const portiveAuthToken = createAuthToken(process.env.PORTIVE_API_KEY, {
    expiresIn: "1d",
  })
  // pass it to the `Page` component
  return {
    props: { portiveAuthToken },
  }
}

// The `portiveAuthToken` is available on the exported web page
export default function Page({ portiveAuthToken }) {
  const client = new Client({ authToken }) // <-- authToken used here
  return <div>...</div>
}
```

Some things to note in this example:

- The API key is never exposed to the browser.
- The `createAuthToken` import is not sent to the browser. Next.js removes it because it is only used in `getServerSideProps` which executes on the server.
- The `authToken` expires 1 day after the page is shown to the user which is a sensible default. You can learn more about [Auth Token Expiration Best Practices]()

## Getting Started with API Routes

Another way to use auth tokens in Next.js is to generate them right when they are required which allows you to have a shorter expires time.

For example, when a user uploads a file, the `authToken` is requested right after the file is selected. The `authToken` is then used, with a short expiry time like a minute, to authenticate the request for the upload.

This increases security but adds complexity.

```javascript
export default function Page() {
  /**
   * The `authToken` can be passed as an async function to an Portive enabled
   * component or with `@portive/client`. Here we make a request to the
   * Next.js API route `/api/get-auth-token` which returns the auth token.
   */
  const client = new Client({
    authToken: async () => {
      const response = await fetch("/api/get-auth-token")
      const json = await response.json()
      return json.authToken
    },
  })
  return <div>...</div>
}
```

And the API endpoint in this example would be at `/pages/api/get-auth-token` and look like:

```javascript
import { createAuthToken } from "@portive/auth"

export default function handler(req, res) {
  const authToken = createAuthToken(process.env.PORTIVE_API_KEY, {
    expiresIn: "1m",
  })
  res.status(200).json({ authToken })
}
```
