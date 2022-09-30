# API Keys

> You can get a free API key from the [Portive website](https://portive.com).
>
> Note: Unless you are a contributor, you don't need to learn about the internals of API keys to use them.

An API key is a string made up of three parts separated by underscores that looks something like:

```
PRTV_y3txuDV2lnxv7onl_ZApfHvVyHVUGvB84bDgxkE2OZAia2zCk
```

- [Parts of an API Key](#parts-of-an-api-key)
  - [Key Type](#key-type)
  - [Key ID](#key-id)
  - [Secret Key](#secret-key)
- [Static Methods](#static-methods)
  - [`stringifyApiKey`](#stringifyapikeykeyid-string-secretkey-string--string)
  - [`parseAPiKey`](#parseapikeyapikey-string--apikeyinfo)

## Parts of an API Key

API keys are made up of three parts separated by underscores:

1. Key type
2. Key Id
3. Secret Key

#### Key Type

The first part, the Key Type, is always `PRTV` to make it easily identifiable as a Portive API key

#### Key ID

The second part, the API key id, is a unique id used to identify the API key. This value is not secret and is made up of uppercase/lowercase alphanumeric characters and is delivered in the open as part of any generated auth token.

#### Secret Key

The third part, the Secret key, is used to encrypt any generated auth token. It is not delivered in the open when an auth token is generated.

Of course, if you are providing the API key directly to a component the secret key is not being kept secret. Usually, the API key is used directly only during development. When going to production, we generate auth tokens and use those instead in which case the secret key is secret.

### Why an underscore separator

The separator is an underscore in order to make the key easy to select for copy and paste. Double-clicking on the API key in text selects the entire key which would not happen if the separator was a dash.

## Static Methods

### `stringifyApiKey({keyId: string, secretKey: string}) => string`

Takes the `keyId` of an API key and the `secretKey` of an API key and turns it into a single API key string.

#### Sample Code

```typescript
const apiKey = stringifyApiKey({
  keyId: "y3txuDV2lnxv7onl",
  secretKey: "ZApfHvVyHVUGvB84bDgxkE2OZAia2zCk",
})
// => "PRTV_y3txuDV2lnxv7onl_ZApfHvVyHVUGvB84bDgxkE2OZAia2zCk"
```

### `parseApiKey(apiKey: string) => APIKeyInfo`

Takes an API key in the form of a `string` and breaks it into its separate parts.

#### Detailed function definition

```typescript
type parseApiKey = (apiKey: string) => APIKeyInfo

type APIKeyInfo = {
  keyType: string
  keyId: string
  secretKey: string
}
```

#### Sample Code

```typescript
const apiKeyInfo = parseApiKey(
  "PRTV_y3txuDV2lnxv7onl_ZApfHvVyHVUGvB84bDgxkE2OZAia2zCk"
)

// => {
//   keyType: "PRTV",
//   keyId: "y3txuDV2lnxv7onl",
//   secretKey: "ZApfHvVyHVUGvB84bDgxkE2OZAia2zCk",
// })
```
