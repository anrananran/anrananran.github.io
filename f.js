const walk = require('walkdir')
const fs = require('fs')
const path = require('path')

const emitter = walk('./public/code')
const content = {
  items: []
}

function toCamelCase(str) {
  return str.split(' ').map(item => {
    return item.charAt(0).toUpperCase() + item.slice(1)
  }).join(' ')
}

emitter.on('file', function(file) {
  if (file && file.endsWith('.html')) {
    const p = path.relative(__dirname, file).replace('public', '').replace(/\\/g, '/')
    console.info('写入:', p)
    const name = p => {
      const n = p.split('/')
      return toCamelCase(n[n.length - 2].replace(/\-/g, ' '))
    }

    if (p.indexOf('share-ppt') === -1) { // 排除ppt目录
      content.items.push({
        name: name(p),
        link: p
      })
    }
  }
})
emitter.on('end', function() {
  fs.writeFile('./src/mock/list.json', JSON.stringify(content), () => {
    console.log('写入完成')
  })
})
