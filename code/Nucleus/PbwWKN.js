/*
function addNote(color) {
var gmoyerImg = document.createElement('img');
  gmoyerImg.setAttribute("id","gmoyerImg");
//var css = '.gmoyerImg:hover{width: 110px; height: 110px }';
//document.cssText = css
gmoyerImg.style.position = 'absolute';
//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
gmoyerImg.style.width = 100;
gmoyerImg.style.height = 100;
gmoyerImg.setAttribute('src', "https://s3-us-west-2.amazonaws.com/s.cdpn.io/783666/profile/profile-80_8.jpg")
gmoyerImg.style.borderRadius = 50 + "%";
gmoyerImg.style.bottom = 10 + 'px';
gmoyerImg.style.right = 10 + 'px';
  function gmoyerPage() {
    //document.location.href = "https://codepen.io/gmoyer";
    window.open("https://codepen.io/gmoyer")
  }
gmoyerImg.addEventListener("click", gmoyerPage)

document.body.appendChild(gmoyerImg);
  //addName(color)
}
*/
function addNote(shade) {
  var style = "#gm-signature{font-family:Helvetica,Arial,sans-serif;display:block;position:fixed;z-index:99999;bottom:2rem;right:1rem;line-height:50px;border-radius:2px;color:#444;text-transform:uppercase;font-weight:700;font-size:10px;-webkit-animation:gm-signature-in 500ms cubic-bezier(0,1.2,1,1);animation:gm-signature-in 500ms cubic-bezier(0,1.2,1,1);opacity:.6}#gm-signature strong{position:absolute;right:50%;width:200px;text-align:right;padding-right:8px;opacity:0;-webkit-transition:right 200ms,opacity 200ms;transition:right 200ms,opacity 200ms;z-index:-1;pointer-events:none}#gm-signature:hover{opacity:1}#gm-signature:hover strong{opacity:1;right:100%}#gm-signature .fill-1{fill:#fff}#gm-signature .fill-2,#gm-signature.gm-signature-light .fill-1{fill:#000}#gm-signature.gm-signature-light strong{color:#fff;text-shadow:1px 1px 0 rgba(0,0,0,.1)}#gm-signature.gm-signature-light .fill-2{fill:#fff}#gm-signature a{text-decoration:none;color:#444!important;height:20px;display:block;padding:4px}#gm-signature img{border-radius:50%}#gm-signature img,#gm-signature svg{vertical-align:middle}#gm-signature .codepen-logo,#gm-signature img{width:50px;height:50px}#gm-signature @-webkit-keyframes gm-signature-in{from{-webkit-transform:translateX(2rem);transform:translateX(2rem);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:.6}}@keyframes gm-signature-in{from{-webkit-transform:translateX(2rem);transform:translateX(2rem);opacity:0}to{-webkit-transform:translateX(0);transform:translateX(0);opacity:.6}}";

var signature = "<a href=http:\/\/codepen.io\/gmoyer target=blank title=\"gmoyer on CodePen\"><strong>Griffin Moyer<\/strong> <img src=https://s3-us-west-2.amazonaws.com/s.cdpn.io/783666/profile/profile-512.jpg height=100 width=\"100\">"
var _container, _signature, _style;
  if (!shade) {
    shade = "light"
  }
  if (shade == "dark") {
    shade = ""
  } else {
    shade = "light"
  }
  _style = document.createElement("style");
  _style.innerHTML = style;
  _signature = document.createElement("div");
  _signature.setAttribute("id", "gm-signature");
  _signature.className = "gm-signature-" + shade;
  _signature.innerHTML = signature;
  _container = document.createElement("div");
  _container.appendChild(_signature);
  document.body.appendChild(_style);
  document.body.appendChild(_container);
  return true
}
//addNote("dark")
/*
function addName(color) {
var gmoyer = document.createElement('div');
gmoyer.setAttribute("id","gmoyerName");
gmoyer.style.position = 'absolute';
//text2.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
gmoyer.style.width = 100;
gmoyer.style.height = 100;
gmoyer.style.color = color;
gmoyer.innerHTML = "gmoyer";
gmoyer.style.bottom = 10 + 'px';
gmoyer.style.right = 10 + 'px';
document.body.appendChild(gmoyer);
}
*/