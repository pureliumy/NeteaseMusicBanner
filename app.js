const superagent = require('superagent')
const cheerio = require('cheerio')
const Express = require('express')

const app = new Express()

app.get('/', function (req, res) {
  superagent.get('http://music.163.com/discover')
    .end((err, data) => {
      if (err) return res.send(err)
      const $ = cheerio.load(data.text)
      const item = $('#g_backtop+script').html()
      const index = item.indexOf('[')
      const lastIndex = item.lastIndexOf(';')
      const tempString = item.substring(index, lastIndex)
      const jsonString = '{code:' + data.status + ',result:' + tempString + '}'
      const jsonData = eval('(' + jsonString + ')')
      res.jsonp(jsonData)
    })
})

app.listen(3000)
console.log('app is listen at 3000')
