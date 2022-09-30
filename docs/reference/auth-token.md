# Auth Token

Auth tokens are created with a Portive API Key.

> You can get a free API key from the [Portive website](https://portive.com).

## Static Methods

### `createAuthToken(apiKey: string, options: AuthTokenOptions) => string`

```typescript
const createAuthToken = (apiKey: string, {
  expiresIn: string | number
  maxFileBytes: number
  maxFileBytesMessage: string
}) => string
```

The `createAuthToken` method takes an `apiKey` and a set of options and returns an `authToken`. The `authToken` is in the form of a JSON Web Token and is signed using the [`secretKey`](./api-key.md#secret-key) part of the API Token

#### Options

- `expiresIn`: The time until the auth token expires expressed in seconds as a number or expressed as a string like `1d` for 1 day. To learn more about the string options, see the [`ms`](https://github.com/vercel/ms) library.
- `maxFileBytes` (optional): The maximum number of bytes allowed for this file upload.
- `maxFileBytesMessage` (optional): The error message to display if the `maxFileBytes` is exceeded. Can be useful to indicate to a user that they can upgrade to increase their max file size limit for example.
