const copy = require('copy')

copy('./dist/**', './', function(err, files) {
  if (err) throw err
  console.log('复制完成')
})
