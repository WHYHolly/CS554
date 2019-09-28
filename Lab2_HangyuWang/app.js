const path = require('path')
const express = require('express')
const app = express()

const publicPath = path.resolve(__dirname, 'public')

app.use('/public', express.static(publicPath))

app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, '/index.html'))
})

// non error 404 handler
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(publicPath, '/404.html'))
})

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});