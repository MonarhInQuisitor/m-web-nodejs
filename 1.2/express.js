const express = require('express')
const app = express()
const port = 3000
let number =require(`fs`).readFileSync("number.txt");

app.get('/', (req, res) => {
  res.send(number+"")
  number++;
  require(`fs`).writeFileSync("number.txt",number+"")

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})