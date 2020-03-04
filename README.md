# Vue as a Backend Framework

This repo demonstrates a few ways Vue.js could be used as a backend framework. This was used as the demo portion of my talk at VueConf US 2020, _Unconventional Vue—Vue as a Backend Framework_. You can find the slides at https://slides.com/ospencer/vue-backend.

## Setup

First, install the dependencies:

```sh
npm install
```

This demo uses an AWS Lambda function to send tweets as Vue effects trigger. If you _really_ want to set that up, you can follow the instructions in the next section, but I'll admit that it's a hassle. If you rather just get going sooner, then just change the Lambda calls in `effects.js` to `console.log` statements. You can use a random string for the `tweetId`.

### AWS Lambda + Twitter Setup

1. Create an AWS Lambda function with an API Gateway.
1. Use the code in the `lambda` directory for the Lambda function. After running `npm install` in that directory, you can run `zip -r lambda.zip lambda/` from the root directory and upload the resulting zip file to AWS.
1. Acquire the Twitter API's consumer key and secret, along with the OAuth token and token secret for the Twitter account you plan to post from. You can learn more about that here: https://developer.twitter.com/en/docs/basics/authentication/oauth-1-0a/obtaining-user-access-tokens. You'll need to have a Twitter developer account, along with a Twitter app with consumer API keys. You can create an app here: https://developer.twitter.com/en/apps.
1. Set the `CONSUMER_KEY`, `CONSUMER_SECRET`, `OAUTH_TOKEN`, and `OAUTH_TOKEN_SECRET` environment variables for your AWS Lambda function.
1. Set the `LAMBDA_URL` environment variable for the node app.

## Running the App

You can start the app by running `node app.js`.

To replicate the demo, you can follow these steps:

1. `POST /users` with a new user, with a body resembling `{ "name": "Joe" }`. A Vue effect should trigger, and a tweet should be sent.
1. `DELETE /users/:user` with the user you previously created. An effect should trigger, and the tweet should be deleted.
1. `POST /superusers` with another user, this time including `{ "name": "Sally", "online": false }`. A tweet should be sent.
1. `PATCH /users/:user` with the previous user, and set `"online": true"`. A "background" task should be run and displayed in the console, since the user has come online.
1. `DELETE /purge`. The database should be cleared, one new user should be added to the database, and a final tweet should be sent.
