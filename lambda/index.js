const request = require('request-promise')

exports.handler = async (event) => {
  const oauth = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: process.env.OAUTH_TOKEN,
    token_secret: process.env.OAUTH_TOKEN_SECRET
  }

  const body = JSON.parse(event.body)
  
  let url
  const qs = {}

  switch (body.op) {
    case 'tweet': {
      url = 'https://api.twitter.com/1.1/statuses/update.json'
      qs.status = body.status
      break
    }
    case 'yeet': {
      url = `https://api.twitter.com/1.1/statuses/destroy/${body.tweetId}.json`
      qs.id = body.tweetId
      break
    }
  }
  try {
    const json = await request.post({url:url, oauth:oauth, qs:qs, json:true})
    const response = {
      statusCode: 201,
      body: JSON.stringify(json)
    };
    return response;
  } catch (e) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({
        error: e
      })
    };
    return response;
  }
};
