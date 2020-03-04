const express = require('express')
const { reactive, effect } = require('@vue/reactivity')
const { 
  tweet, 
  yeet, 
  initCreateSpreadsheet, 
  whiteHeat, 
  somethingBittersweet 
} = require('./effects.js')

const database = require('./database.js')

effect(tweet)
effect(yeet)

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => res.send('Database contents: ' + JSON.stringify(database, null, 2)))
app.post('/users', (req, res) => {
  database.push(req.body)
  res.sendStatus(201)
})
app.delete('/users/:name', (req, res) => {
  database.forEach((record) => {
    if (record.name === req.params.name) {
      record.yeet = true
    }
  })
  res.sendStatus(200)
})

app.patch('/users/:name', (req, res) => {
  database.forEach((record) => {
    if (record.name === req.params.name) {
      for (let [k, v] of Object.entries(req.body)) {
        record[k] = v
      }
    }
  })
  res.sendStatus(200)
})
app.post('/superusers', (req, res) => {
  const record = reactive(req.body)
  effect(initCreateSpreadsheet(record))
  database.push(record)
  res.sendStatus(201)
})

app.delete('/purge', (req, res) => {
  effect(whiteHeat)
  effect(somethingBittersweet)
  database.length = 0
  res.sendStatus(200)
})

app.listen(port, () => console.log(`Fired up that sweet Vue backend on port ${port}!`))
