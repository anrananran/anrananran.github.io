function getCanvasThumb() {
  setTimeout(() => {
    const canvas = document.querySelector('canvas')
    const thumb = canvas.toDataURL('image/jpeg')
    console.log('生成成功')
    window.top.postMessage({ link: window.location.pathname, thumb }, '*')
  }, 6000)
}

window.onload = function() {
  getCanvasThumb()
}
