const request = require('request')

const database = require('./database.js')

const LAMBDA_URL = process.env.LAMBDA_URL

module.exports = {
  tweet() {
    const record = database[database.length-1]
    if (!record) return
    if (!record.silent) request.post(LAMBDA_URL, {
      json: {
        op: 'tweet',
        status: `${record.name} has joined the community!`
      }
    }, (error, response, body) => {
      record.tweetId = body.id_str
      console.log('Tweet sent with id', body.id_str)
    })
  },

  yeet() {
    for (let record of database) {
      if (record && record.yeet && !record.yeeted) {
        request.post(LAMBDA_URL, {
          json: {
            op: 'yeet',
            tweetId: record.tweetId
          }
        }, (error, response, body) => {
          if (!error) {
            record.yeeted = true
            console.log(record.name, 'yeeted successfully.')
          }
        })
      }
    }
  },

  initCreateSpreadsheet(user) {
    return () => {
      if (user.online) {
        console.log('Generating spreadsheet...')
        setTimeout(() => console.log('Done.'), 4000)
      }
    }
  },

  whiteHeat() {
    if (database.length === 0) {
      console.log('W H I T E  H E A T')
      database.push({ name: 'Oscar', silent: true })
    }
  },

  somethingBittersweet() {
    const record = database[database.length-1]
    if (!record) return
    if (record.name === 'Oscar') {
      request.post(LAMBDA_URL, {
        json: {
          op: 'tweet',
          status: 'Thanks to everyone at VueConf US for listening!'
        }
      }, (error, response, body) => {
        record.tweetId = body.id_str
        console.log('Tweet sent with id', body.id_str)
      })
    }
  }
}