# Introduction

To use the Portive Client or a Portive enabled component like **Slate Cloud**, **Plate Cloud** or **Wysimark Cloud**, you must provide an **API key** or an **Auth Token** (which is generated from an API Key) to the component.

Using the API Key directly is an easier way to start and is great for development. Using an auth token is more secure but takes a little more work to setup.

You can get free API Keys from the [Portive](https://portive.com) website.

### Getting Started Guide

This is the Getting Started guide for generating auth tokens securely on the server.

- [Next.js - Getting Started Guide](guides/next.md)

### Learn more about API keys and Auth Tokens

- [Using an API Key to get started](#using-an-api-key-to-get-started)
- [Using an Auth Token in production](#using-an-auth-token-in-production)

## Using an API Key to get started

We thinks it okay to use an API key directly to get started.

It is great for playing around during development and is the easiest way to get started.

The security risk is that somebody could use your API key to upload files to the cloud storage for your project.

```typescript
// Example of using an API key
const client = new Client({ apiKey: "YOUR_API_KEY" })
```

## Using an Auth Token in production

We recommend using an Auth Token for websites and apps in production.

Auth tokens are securely generated on your server using an API key and expire at a time you designate.

```typescript
// Example of generated an auth token that expires in 1 day.
// This should be generated on the server and needs access to the API key.
const authToken = createAuthToken(process.env.API_KEY, { expiresIn: "1d" })

// The generated `authToken` should be sent to the browser without the API key.
// It will be consumed by the Component something like this:
const client = new Client({ authToken: authToken })
```

When the auth token is generated on the server and then sent to the browser, from a security point of view, this means:

- Your API Key is not shown to the public
- The Auth Token expires after a limited time so it cannot be abused (in this example it is 1 day)

An Auth Token also enables other features like:

- Tagging uploads
- Limiting upload file size
- Limiting total uploads by user, team, project, article or whatever you desire
