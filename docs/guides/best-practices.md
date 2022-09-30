# Best Practices

We think its okay to use the API Key directly during development; however, once you're in a production, we recommend generating and using auth tokens instead.

## Best Practices for Using Auth Tokens

Here are some best practices for using auth tokens:

- **Generate auth tokens on the server**: Always generate auth token on the server and not in the browser. If you are generating the auth token in the browser, that means the API key which is required to generate the auth token also needs to be available in the browser which defeats the purpose of using an auth token.
- **1 day expiry for Auth Tokens generated per page**: For auth tokens that are generated as part of a dynamically generated web page, we recommend an expiry of one day (`1d`). This is a good balance between security and convenience. If a user has been viewing a page for over 24 hours and tries to use a Portive service, the user will receive an expired token error and will have to reload the page which will generate a new auth token.
- **1 minute expiry for Auth Tokens generated on demand**: For auth tokens that are generated on-demand (i.e. the `authToken` is fetched from an API endpoint when it is needed), we recommend an expiry of 1 minute (`1m`). Since the user requests the `authToken` and uses it immediately, one minute is more than enough time to make the request to the Portive cloud server without expiring.
