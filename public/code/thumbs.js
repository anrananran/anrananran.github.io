function getCanvasThumb() {
  setTimeout(() => {
    const canvas = document.querySelector('canvas')
    const thumb = canvas.toDataURL('image/png', 1)
    console.log('生成成功', thumb)
    window.top.postMessage({ link: window.location.pathname, thumb }, '*')
  }, 6000)
}

window.onload = function() {
  getCanvasThumb()
}
