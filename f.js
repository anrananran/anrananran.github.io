const walk = require('walkdir')
const fs = require('fs')
const path = require('path')

const emitter = walk('./')
let content = ''

function hasString(file) {
  const arr = [
    'zrender', 
    'webuploader', 
    'swiper',
    'include',
    'component',
    'inc'
  ]

  for (let i = 0; i < arr.length; i++) {
    if (file.includes(arr[i] + '\\')) {
      return true
    }
  }
  return false
}

emitter.on('file', function(file, stat) {
  if (file && file.endsWith('.html') && !hasString(file)) {
    const p = path.relative(__dirname, file)
    content += `<li><a href="${p}">${p}</a></li>`
    // console.log('file from emitter: ', file)
  }
})
emitter.on('end', function(file, stat) {
  fs.writeFile('./index.html', `
    <h1>目录</h1>
    <ul>${content}</ul>
  `, () => {
    console.log('写入完成')
  })
})
