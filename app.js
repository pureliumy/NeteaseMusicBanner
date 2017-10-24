const superagent = require('superagent')
const cheerio = require('cheerio')
const Express = require('express')
const fs = require('fs')

const app = new Express()
const jsonPath = './banners.json'

start()
let timer = setInterval(start, 1000 * 60 * 10)
let status

function start () {
  superagent.get('http://music.163.com/discover')
    .end((err, res) => {
      status = res.status
      if (err && !res.ok) {
        console.log(err)
        setTimeout(start(), 1000)
      } else {
        const tempString = extract(res)
        const jsonData = parse(res.status, tempString)
        write(jsonData)
      }
    })
}

function extract (res) {
  const item = cheerio.load(res.text)('#g_backtop+script').html()
  const index = item.indexOf('[')
  const lastIndex = item.lastIndexOf(';')
  const tempString = item.substring(index, lastIndex)
  return tempString
}

function parse (status, string) {
  const jsonString = eval('({code:' + status + ',result:' + string + '})')
  const jsonData = JSON.stringify(jsonString, null, 2)
  return jsonData
}

function write (data) {
  fs.writeFile(jsonPath, data, (err) => {
    if (err) {
      console.log(err)
    }
    const time = new Date()
    console.log('json data has been saved to', jsonPath, 'at', time.toLocaleString())
  })
}

app.get('/', (req, res) => {
  if (status === 200) {
    const jsonData = JSON.parse(fs.readFileSync(jsonPath))
    res.set({
      'Cache-control': 'no-cache'
    })
    res.jsonp(jsonData)
  } else {
    res.send('{"code":' + status + '}')
  }
})

app.listen(3001)
console.log('app is listen at 3001')
