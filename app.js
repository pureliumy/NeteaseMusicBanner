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
      if (err && !res.ok) {
        saveJson()
      } else {
        const data = parse(res)
        write(data)
      }
    })
}

function parse (res) {
  const item = cheerio.load(res.text)('#g_backtop+script').html()
  const index = item.indexOf('[')
  const lastIndex = item.lastIndexOf(';')
  const tempString = item.substring(index, lastIndex)
  const jsonString = '{parseCode:' + res.status + ',result:' + tempString + '}'
  const jsonData = eval('(' + jsonString + ')')
  const data = JSON.stringify(jsonData, null, 2)
  return data
}

function write (data) {
  fs.writeFile(jsonPath, data, (err) => {
    if (err) {
      console.log(err)
    }
    const time = new Date()
    console.log('json data has been saved to', jsonPath)
  })
}

app.get('/', (req, res) => {
  const jsonData = JSON.parse(fs.readFileSync(jsonPath))
  res.jsonp(jsonData)
})

app.listen(3001)
console.log('app is listen at 3001')
