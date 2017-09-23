const superagent = require('superagent')
const cheerio = require('cheerio')
const Express = require('express')
const fs = require('fs')

const app = new Express()
const jsonPath = './banners.json'

saveJson()
let timer = setInterval(saveJson, 1000 * 60 * 10)

function saveJson () {
  superagent.get('http://music.163.com/discover')
    .end((err, res) => {
      if (err) {
        console.log(err)
        this.saveJson()
      }
      const $ = cheerio.load(res.text)
      const item = $('#g_backtop+script').html()
      const index = item.indexOf('[')
      const lastIndex = item.lastIndexOf(';')
      const tempString = item.substring(index, lastIndex)
      const jsonString = '{code:' + res.status + ',result:' + tempString + '}'
      const jsonData = eval('(' + jsonString + ')')

      fs.writeFile(jsonPath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) console.log(err)
        console.log('json have been saved to', jsonPath)
      })
    })
}

app.get('/', (req, res) => {
  const jsonData = fs.readFileSync(jsonPath)
  res.jsonp(JSON.parse(jsonData))
})

app.listen(3001)
console.log('app is listen at 3000')
