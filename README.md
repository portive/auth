# @portive/auth

A library to help generate auth tokens for use with Portive's cloud services for open source components

There are two ways to use Portive:

1. Directly using the Portive API keys provided to you
2. With JWT auth tokens generated using the API keys

Using API keys is a good way to start but auth tokens have these benefits:

- More secure because auth tokens expire in a specified time length.
- More granular access controls with an auth token where as using the API key is all or nothing
- The ability to pass other parameters like tags which are added to any files uploaded
- Access to other features like upload limits based on tags mentioned above (e.g. user "john123" can only upload a max of 1GB of files)
