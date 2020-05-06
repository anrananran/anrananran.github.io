
function getCanvasThumb() {
  setTimeout(() => {
    const canvas = document.querySelector('canvas')
    const thumb = canvas.toDataURL('image/png', 1)
    window.top.postMessage({ link: window.location.pathname, thumb }, '*')
  }, 8000)
}

function insertStyle() {
  const style = `
body {
  margin: 0;
}

#Loading {
  background:#000;
  position: fixed; 
  left: 0; 
  right: 0; 
  top: 0; 
  bottom: 0;
  overflow:visible;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  cursor:default;
  overflow: hidden;
  z-index: 1000;
}

#Loading div {
  position:absolute;
  width:20px;
  height:36px;
  opacity:0;
  top: 40%;
  font-family:Helvetica, Arial, sans-serif;
  animation:move 2s linear infinite;
  -o-animation:move 2s linear infinite;
  -moz-animation:move 2s linear infinite;
  -webkit-animation:move 2s linear infinite;
  transform:rotate(180deg);
  -o-transform:rotate(180deg);
  -moz-transform:rotate(180deg);
  -webkit-transform:rotate(180deg);
  color:#35C4F0;
}

#Loading div:nth-child(2) {
  animation-delay:0.2s;
  -o-animation-delay:0.2s;
  -moz-animation-delay:0.2s;
  -webkit-animation-delay:0.2s;
}
#Loading div:nth-child(3) {
  animation-delay:0.4s;
  -o-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
  -webkit-animation-delay:0.4s;
}
#Loading div:nth-child(4) {
  animation-delay:0.6s;
  -o-animation-delay:0.6s;
  -moz-animation-delay:0.6s;
  -webkit-animation-delay:0.6s;
}
#Loading div:nth-child(5) {
  animation-delay:0.8s;
  -o-animation-delay:0.8s;
  -moz-animation-delay:0.8s;
  -webkit-animation-delay:0.8s;
}
#Loading div:nth-child(6) {
  animation-delay:1s;
  -o-animation-delay:1s;
  -moz-animation-delay:1s;
  -webkit-animation-delay:1s;
}
#Loading div:nth-child(7) {
  animation-delay:1.2s;
  -o-animation-delay:1.2s;
  -moz-animation-delay:1.2s;
  -webkit-animation-delay:1.2s;
}

@keyframes move {
  0% {
    left:0;
    opacity:0;
  }
  35% {
    left: 41%; 
    -moz-transform:rotate(0deg);
    -webkit-transform:rotate(0deg);
    -o-transform:rotate(0deg);
    transform:rotate(0deg);
    opacity:1;
  }
  65% {
    left:59%; 
    -moz-transform:rotate(0deg); 
    -webkit-transform:rotate(0deg); 
    -o-transform:rotate(0deg);
    transform:rotate(0deg); 
    opacity:1;
  }
  100% {
    left:100%; 
    -moz-transform:rotate(-180deg); 
    -webkit-transform:rotate(-180deg); 
    -o-transform:rotate(-180deg); 
    transform:rotate(-180deg);
    opacity:0;
  }
}

@-moz-keyframes move {
  0% {
    left:0; 
    opacity:0;
  }
  35% {
    left:41%; 
    -moz-transform:rotate(0deg); 
    transform:rotate(0deg);
    opacity:1;
  }
  65% {
    left:59%; 
    -moz-transform:rotate(0deg); 
    transform:rotate(0deg);
    opacity:1;
  }
  100% {
    left:100%; 
    -moz-transform:rotate(-180deg); 
    transform:rotate(-180deg);
    opacity:0;
  }
}

@-webkit-keyframes move {
  0% {
    left:0; 
    opacity:0;
  }
  35% {
    left:41%; 
    -webkit-transform:rotate(0deg); 
    transform:rotate(0deg); 
    opacity:1;
  }
  65% {
    left:59%; 
    -webkit-transform:rotate(0deg); 
    transform:rotate(0deg); 
    opacity:1;
  }
  100% {
    left:100%;
    -webkit-transform:rotate(-180deg); 
    transform:rotate(-180deg); 
    opacity:0;
  }
}

@-o-keyframes move {
  0% {
    left:0; 
    opacity:0;
  }
  35% {
    left:41%; 
    -o-transform:rotate(0deg); 
    transform:rotate(0deg); 
    opacity:1;
  }
  65% {
    left:59%; 
    -o-transform:rotate(0deg); 
    transform:rotate(0deg); 
    opacity:1;
  }
  100% {
    left:100%; 
    -o-transform:rotate(-180deg); 
    transform:rotate(-180deg); 
    opacity:0;
  }
}
  `
  const styleEle = document.createElement('style')
  styleEle.innerHTML = style
  document.head.appendChild(styleEle)
}

function startLoading() {
  const loader = document.createElement('div')
  loader.setAttribute('id', 'Loading')
  loader.innerHTML = `
    <div>G</div>
    <div>N</div>
    <div>I</div>
    <div>D</div>
    <div>A</div>
    <div>O</div>
    <div>L</div>
  `
  document.body.appendChild(loader)
}

function endLoading() {
  document.body.removeChild(document.getElementById('Loading'))
}

insertStyle()
startLoading()
window.addEventListener('load', function() {
  getCanvasThumb()
  console.log('loaded scripts')
  setTimeout(() => {
    endLoading()
  }, 2000)
})
