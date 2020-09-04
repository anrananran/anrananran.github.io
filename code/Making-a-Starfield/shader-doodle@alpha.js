'use strict';(function(E){"function"===typeof define&&define.amd?define(E):E()})(function(){function E(a){function b(a){console.log(a);f.add(a.targetElement)}function d(b){f.has(b.targetElement)?f.delete(b.targetElement):(b=a.createBufferSource(),b.buffer=a.createBuffer(1,1,a.sampleRate),b.connect(a.destination),b.start(0),"function"===typeof a.resume&&a.resume().then(c),e())}function c(){t.forEach(a=>{a()})}function e(){k.forEach(a=>{a.removeEventListener("touchstart",d);a.removeEventListener("touchmove",
b);a.removeEventListener("touchend",d);a.removeEventListener("mouseup",d)});k.clear();f.clear()}let f=new Set,k=new Set,t=[];return{onStart:function(c){"running"===a.state?(console.log("already"),c()):t.push(c)},register:function(a){a.addEventListener("touchstart",d);a.addEventListener("touchmove",b);a.addEventListener("touchend",d);a.addEventListener("mouseup",d);k.add(a)},dispose:e}}function Z(){function a(a){d[0].value[0]=a.alpha;d[0].value[1]=a.beta;d[0].value[2]=a.gamma}let b=!1,d=JSON.parse(JSON.stringify(J));
return{get ustate(){return d},setup:function(){b||(b=!0,"object"===typeof DeviceOrientationEvent&&"function"===typeof DeviceOrientationEvent.requestPermission?DeviceOrientationEvent.requestPermission().then(c=>{"granted"===c&&window.addEventListener("deviceorientation",a)}).catch(console.error):window.addEventListener("deviceorientation",a))},dispose:function(){window.removeEventListener("deviceorientation",a)}}}function aa(a){let b={},d=a.getExtension.bind(a);return{get:function(a){if(void 0!==b[a])return b[a];
let c=d(a)||d("MOZ_".concat(a))||d("WEBKIT_".concat(a));null===c&&console.warn("<shader-doodle /> ".concat(a," extension not supported."));return b[a]=c}}}function z(){function a(a,b){if(a>l||b>h)a=Math.max(a,l),b=Math.max(b,h),a!==l&&(l=a,c.width=Math.floor(1*l)),b!==h&&(h=b,c.height=Math.floor(1*h))}function b(a){let b=n?(a-n)/1E3:0;n=a;r[0].value+=b;r[1].value=b;r[3].value++;a=new Date;r[2].value[0]=a.getFullYear();r[2].value[1]=a.getMonth()+1;r[2].value[2]=a.getDate();r[2].value[3]=3600*a.getHours()+
60*a.getMinutes()+a.getSeconds()+.001*a.getMilliseconds()}function d(e){if(q.size){b(e);var m=[...r,...f.ustate];q.forEach(b=>b.render(c,a,l,h,1,m));p=requestAnimationFrame(d)}else p=void 0}let c=document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),e=c.getContext("webgl")||c.getContext("experimental-webgl"),f=Z(),k=new (window.AudioContext||window.webkitAudioContext),t=new E(k);k.onStart=t.onStart;e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA);e.enable(e.BLEND);let l=0,h=0,p,n,q=new Set,
r=JSON.parse(JSON.stringify(K)),u=aa(e);u.get("OES_texture_float");u.get("OES_texture_float_linear");u.get("OES_texture_half_float");u.get("OES_texture_half_float_linear");e.clearColor(0,0,0,0);return Object.freeze({get gl(){return e},get wa(){return k},addSurface:function(a){t.register(a.dom);a.addClick(f.setup);q.add(a);p||(p=requestAnimationFrame(d))},removeSurface:function(a){q.delete(a)},addUniform:function(a,b,c){r.push({name:a,value:b,type:c,toyname:a})},setUniform:function(a,b){for(let c=
0;c<r.length;c++)if(r[c].name===a){r[c].value=b;break}},dispose:function(){q.forEach(a=>a.dispose());q.clear();q=void 0;cancelAnimationFrame(p);f.dispose();t.dispose()}})}function ba(a,b){let d={},c=a.getProgramParameter(b,a.ACTIVE_ATTRIBUTES);for(let e=0;e<c;e++){let {name:c}=a.getActiveAttrib(b,e);d[c]=a.getAttribLocation(b,c)}return d}function L(a){function b(b){a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,
a.TEXTURE_MIN_FILTER,b?a.NEAREST:a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,b?a.NEAREST:a.LINEAR)}let d,c,e=a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,e);let f=a.createTexture();if(!f)throw Error("createTexture returned null");a.bindTexture(a.TEXTURE_2D,f);b(!0);a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,f,0);return{get handle(){return e},get texture(){return f},updateTexture:b,bind:function(){a.bindFramebuffer(a.FRAMEBUFFER,e);a.viewport(0,0,
d,c)},updateResolution:function(b,e){if(b!==d||e!==c)d=b,c=e,a.bindTexture(a.TEXTURE_2D,f),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,b,e,0,a.RGBA,a.FLOAT,null)},dispose:function(){a.deleteFramebuffer(e);a.deleteTexture(f)}}}function M(a,b,d){b=a.createShader(b);a.shaderSource(b,d);a.compileShader(b);if(!a.getShaderParameter(b,a.COMPILE_STATUS)){let c=a.getShaderInfoLog(b);a.deleteShader(b);console.warn(c,"\nin shader:\n",d)}return b}function H(a,b){if(a.length!==b.length)return!1;for(let d=0,c=a.length;d<
c;d++)if(a[d]!==b[d])return!1;return!0}function I(a,b){for(let d=0,c=b.length;d<c;d++)a[d]=b[d]}function ca(a,b,d,c){a[0]!==c&&(d.uniform1f(b,c),a[0]=c)}function da(a,b,d,c){H(a,c)||(d.uniform2fv(b,c),I(a,c))}function ea(a,b,d,c){H(a,c)||(d.uniform3fv(b,c),I(a,c))}function fa(a,b,d,c){H(a,c)||(d.uniform4fv(b,c),I(a,c))}function ha(a,b,d,c){a[0]!==c&&(d.uniform1i(b,c),a[0]=c)}function ia(a){switch(a){case 5126:return ca;case 35664:return da;case 35665:return ea;case 35666:return fa;case 35678:case 36198:return ha}}
function ja(a,b,d){let c=[],e=ia(b.type);return{get location(){return d},get name(){return b.name},setValue:function(){for(var b=arguments.length,k=Array(b),t=0;t<b;t++)k[t]=arguments[t];e(c,d,a,...k)}}}function ka(a,b){let d={},c=a.getProgramParameter(b,a.ACTIVE_UNIFORMS);for(let f=0;f<c;f++){var e=a.getActiveUniform(b,f);let c=a.getUniformLocation(b,e.name);e=ja(a,e,c);d[e.name]=e}return d}function la(a,b){if(b){let b=a.match(N);a=a.replace("mainImage","main");a=a.replace(N,"()");a=(b?"#define ".concat(b[1],
" gl_FragColor\n#define ").concat(b[2]," gl_FragCoord.xy\n"):"")+a}a=ma(na,b)+a;return"precision highp float;\n"+a}function oa(a,b,d,c){function e(a){let b=v[F(a,k,"name")];b&&b.setValue(F(a,k,"value"))}function f(b){b.forEach(e);y.forEach(a=>a.update(e));m&&v.u_prevbuffer&&(b=v.u_prevbuffer)&&(b.setValue(w),a.activeTexture(a["TEXTURE".concat(w)]),a.bindTexture(a.TEXTURE_2D,m.texture),m.updateTexture());x.forEach(b=>{v[b.name].setValue(b.u);a.activeTexture(a["TEXTURE".concat(b.u)]);a.bindTexture(a.TEXTURE_2D,
b.fbo.texture);b.fbo.updateTexture()})}let k=4<arguments.length&&void 0!==arguments[4]?arguments[4]:!1,t=pa++,l=a.createProgram(),h=a.createBuffer();var p=M(a,a.VERTEX_SHADER,b);let n=M(a,a.FRAGMENT_SHADER,la(d,k));a.attachShader(l,p);a.attachShader(l,n);a.linkProgram(l);let q,r,u,m,w,g=ba(a,l),v=ka(a,l),x=new Set,y=new Set,A=0;if(!a.getProgramParameter(l,a.LINK_STATUS)){let b=a.getProgramInfoLog(l);console.warn(b)}a.detachShader(l,p);a.detachShader(l,n);a.deleteShader(p);a.deleteShader(n);p=g.position;
a.bindBuffer(a.ARRAY_BUFFER,h);a.bufferData(a.ARRAY_BUFFER,c,a.STATIC_DRAW);a.enableVertexAttribArray(p);a.vertexAttribPointer(p,2,a.FLOAT,!1,0,0);return{get id(){return t},get nodes(){return x},get fbo(){return u},get name(){return q},get u(){return r},render:function(b,c,d){x.size&&x.forEach(a=>a.render(b,c,d));if(u){if(m){let a=u;u=m;m=a;m.bind();m.updateResolution(b,c)}u.updateResolution(b,c);u.bind()}else a.bindFramebuffer(a.FRAMEBUFFER,null),a.viewport(0,0,b,c);a.clear(a.COLOR_BUFFER_BIT);a.useProgram(l);
f(d);a.drawArrays(a.TRIANGLES,0,6)},addNode:function(a,b,c){a.toFbo(b,A++,c);x.add(a)},removeNode:function(a){x.delete(a)},addTexture:function(a){y.add(a)},removeTexture:function(a){y.delete(a)},getTexUnit:function(){return A++},update:f,toFbo:function(b,c,d){q=b;r=c;u=L(a);d&&(m=L(a),w=A++)},dispose:function(){y.forEach(a=>a.dispose());y.clear();a.deleteProgram(l)}}}function O(a,b){function d(){a.getParameter(a.ACTIVE_TEXTURE)!==b&&a.activeTexture(a["TEXTURE".concat(b)])}function c(){h.forEach(b=>
{a.texParameteri(k,b[0],b[1])})}function e(b){if("object"===typeof b){Object.assign(l,b);d();a.bindTexture(k,t);var {level:e,internalFormat:f,offsetX:m,offsetY:h,width:g,height:v,border:q,format:y,type:A,flipY:B,buffer:z,pixels:C}=l;c();a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL,B);if(C){if(0===C.width||0===C.height){console.warn("Texture size is invalid ".concat(C.width," x ").concat(C.height,". Update is skipped;"));return}{({pixels:b}=l);let c=a.getTexParameter(k,a.TEXTURE_WRAP_S),d=a.getTexParameter(k,
a.TEXTURE_WRAP_T),e=a.getTexParameter(k,a.TEXTURE_MIN_FILTER),f=G(b.width)&&G(b.height);c===a.CLAMP_TO_EDGE&&d===a.CLAMP_TO_EDGE&&(e===a.LINEAR||e===a.NEAREST)||f||(n||(n=document.createElement("canvas"),n.width=2**Math.floor(Math.log(b.width)/Math.LN2),n.height=2**Math.floor(Math.log(b.height)/Math.LN2),console.warn("Texture is not power of two ".concat(b.width," x ").concat(b.height,". Resized to ").concat(n.width," x ").concat(n.height,";"))),n.getContext("2d").drawImage(b,0,0,n.width,n.height));
p=n||b}}"number"===typeof m&&"number"===typeof h?p?a.texSubImage2D(k,e,m,h,y,A,p):a.texSubImage2D(k,e,m,h,g,v,y,A,z):p?a.texImage2D(k,e,f,y,A,p):a.texImage2D(k,e,f,g,v,q,y,A,z);p&&G(p.width)&&G(p.height)&&(b=a.getTexParameter(k,a.TEXTURE_MIN_FILTER),b!==a.LINEAR&&b!==a.NEAREST&&a.generateMipmap(k))}}let f=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},k=a.TEXTURE_2D,t=a.createTexture(),l={},h=[],p,n;e(Object.assign({level:0,internalFormat:a.RGBA,offsetX:null,offsetY:null,width:1,height:1,
border:0,format:a.RGBA,type:a.UNSIGNED_BYTE,flipY:!0,buffer:qa,pixels:null},"object"===typeof f?f:{}));return{setParameters:function(b){d();h.length=0;b.forEach(b=>{h.push(b);a.texParameteri(k,b[0],b[1])})},shallow:function(){d();a.bindTexture(k,t);c()},update:e,dispose:function(){a.deleteTexture(t)}}}function ra(a){return new Promise((b,d)=>{let c=new XMLHttpRequest;c.open("GET",a,!0);c.responseType="arraybuffer";c.onreadystatechange=()=>{c.readyState===XMLHttpRequest.DONE&&(200===c.status||206===
c.status?b(c.response):(console.log(c),d(c.status)))};c.send()})}function sa(a,b){return new Promise((d,c)=>{b.decodeAudioData(a,d,c)})}function ta(a,b,d,c,e,f,k,t){async function l(){g=n.createBufferSource();g.buffer=await sa(await ra(c),n);g.loop=f;g.start();v=!0}function h(){let a=document.querySelector(c);a&&a instanceof HTMLAudioElement&&(w=a,g=n.createMediaElementSource(a))}function p(a,b){a.connect(q);q.connect(b)}e=a.gl;let n=a.wa,q=n.createAnalyser();q.fftSize=1024;let r=new Uint8Array(q.frequencyBinCount),
u=new Uint8Array(q.frequencyBinCount),m=O(e,b,{internalFormat:e.LUMINANCE,width:u.length,height:2,format:e.LUMINANCE,buffer:null});m.setParameters([[e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE],[e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE],[e.TEXTURE_MIN_FILTER,e.NEAREST]]);let w,g,v=!1,x=[{name:d,value:b}];"#"===c[0]?h():c&&l();g&&p(g,n.destination);return{dispose:function(){m.dispose()},update:function(a){x.forEach(a);if(v||w&&2<w.readyState&&!w.paused&&!w.ended&&w.currentTime)q.getByteFrequencyData(r),q.getByteTimeDomainData(u),
m.update({offsetX:0,offsetY:0,height:1,buffer:r}),m.update({offsetX:0,offsetY:1,height:1,buffer:u})}}}function P(a,b){var d=Object.keys(a);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(a);b&&(c=c.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable}));d.push.apply(d,c)}return d}function Q(a){let b=document.createElement("div");b.style.width=b.style.height="1px";b.style.overflow="hidden";b.style.position="absolute";b.style.opacity="0";b.style.pointerEvents=
"none";b.style.zIndex="-1000";b.appendChild(a);document.body.appendChild(b)}function ua(a,b,d,c,e,f,k,t,l,h){function p(){v=0;g=new Image;g.crossOrigin="anonymous";g.onload=n;g.onerror=()=>{console.warn("failed loading src: ".concat(c))};g.src=c}function n(){u();w.setParameters([[m.TEXTURE_WRAP_S,f],[m.TEXTURE_WRAP_T,k],[m.TEXTURE_MIN_FILTER,t],[m.TEXTURE_MAG_FILTER,l]]);w.update({pixels:g})}function q(){u();w.setParameters([[m.TEXTURE_WRAP_S,m.CLAMP_TO_EDGE],[m.TEXTURE_WRAP_T,m.CLAMP_TO_EDGE],[m.TEXTURE_MIN_FILTER,
m.LINEAR]])}function r(){v=2;let a=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia,b=a=>{g=document.createElement("video");g.width=320;g.height=240;g.autoplay=!0;g.srcObject=a;Q(g);q()},c=()=>{navigator.mediaDevices.getUserMedia({video:!0}).then(b).catch(a=>console.log(a.name+": "+a.message))},d=()=>{a({video:!0},b,a=>a)};navigator.mediaDevices&&navigator.mediaDevices.getUserMedia?c():a&&d()}function u(){g&&(x[1].value[0]=g.width,x[1].value[1]=g.height)}let m=a.gl,
w=O(m,b),g,v,x=[{name:d,value:b},{name:d+"_resolution",value:[0,0]}];if(e)r();else if(va.test(c))v=1,g=document.createElement("video"),g.autoplay=!0,g.muted=!0,g.loop=!0,g.playsInline=!0,g.crossOrigin="anonymous",g.src=c,Q(g),q(),g.play();else if(wa.test(c))p();else{try{g=document.querySelector(c)}catch(y){console.warn("src: ".concat(c,": invalid selector"))}g?g instanceof HTMLImageElement?(v=0,g.complete?n():g.addEventListener("load",n)):g instanceof HTMLVideoElement?(v=1,q()):g instanceof HTMLCanvasElement?
(v=3,n()):console.warn("src: ".concat(c,": element is not a valid texture source")):console.warn("src: ".concat(c,": no element could be selected"))}return{dispose:function(){w.dispose()},update:function(a){x.forEach(a);h||(2===v||1===v)&&g instanceof HTMLVideoElement&&g.readyState===g.HAVE_ENOUGH_DATA?w.update({pixels:g}):w.shallow()}}}function xa(a){function b(a){l.forEach(a=>"function"===typeof a&&a());r=!0;a=R(a);let {top:b,left:c,height:d}=p;h[2].value[0]=h[2].value[2]=a[0]-Math.floor(c);h[2].value[1]=
h[2].value[3]=Math.floor(d)-(a[1]-Math.floor(b))}function d(a){if(!q){a=R(a);let {top:b,left:c,height:d}=p;h[1].value[0]=a[0]-Math.floor(c);h[1].value[1]=Math.floor(d)-(a[1]-Math.floor(b));r&&(h[2].value[0]=h[1].value[0],h[2].value[1]=h[1].value[1]);q=!0}}function c(a){r=!1;1===Math.sign(h[2].value[2])&&(h[2].value[2]*=-1);1===Math.sign(h[2].value[3])&&(h[2].value[3]*=-1)}function e(){let b=f.getBoundingClientRect();n=0<=b.top+b.height&&0<=b.left+b.width&&b.bottom-b.height<=(window.innerHeight||document.documentElement.clientHeight)&&
b.right-b.width<=(window.innerWidth||document.documentElement.clientWidth);let c=0<a.height?a.height:b.height,d=0<a.width?a.width:b.width;d!==h[0].value[0]&&(f.width=h[0].value[0]=d);c!==h[0].value[1]&&(f.height=h[0].value[1]=c);p=b}let f=a.canvas instanceof HTMLCanvasElement?a.canvas:document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),k=f.getContext("2d"),t=a.program,l=new Set,h=JSON.parse(JSON.stringify(S)),p={},n,q,r;f.addEventListener("mousedown",b);f.addEventListener("mousemove",
d);f.addEventListener("mouseup",c);f.addEventListener("mouseout",c);f.addEventListener("touchstart",b);f.addEventListener("touchmove",d);f.addEventListener("touchend",c);e();return Object.freeze({get dom(){return f},render:function(a,b,c,d,f,l){e();q=!1;if(n&&t){var g=h[0].value[0]||0;c=h[0].value[1]||0;b(g,c);t.render(g,c,[...l,...h]);b=g*f;f*=c;k.clearRect(0,0,b,f);k.drawImage(a,0,d-f,b,f,0,0,b,f)}},addClick:function(a){l.add(a)},dispose:function(){l.clear();f.removeEventListener("mousedown",b);
f.removeEventListener("mousemove",d);f.removeEventListener("mouseup",c);f.removeEventListener("mouseout",c);f.removeEventListener("touchstart",b);f.removeEventListener("touchmove",d);f.removeEventListener("touchend",c)}})}var T={render(a,b){return"".concat(this.css(a,b),"\n            ").concat(this.html())},map(a){return{canvas:a.querySelector("canvas")}},html(a){return"<canvas></canvas>"},css(a,b){return"<style>\n      :host {\n        position: relative;\n        display: inline-block;\n        width: ".concat(a||
250,"px;\n        height: ").concat(b||250,"px;\n      }\n      :host > canvas {\n        position: absolute;\n        top: 0;\n        left: 0;\n        height: 100%;\n        width: 100%;\n        border-radius: inherit;\n      }\n    </style>")}};let K=[{name:"u_time",toyname:"iTime",type:"float",value:0},{name:"u_delta",toyname:"iTimeDelta",type:"float",value:0},{name:"u_date",toyname:"iDate",type:"vec4",value:[0,0,0,0]},{name:"u_frame",toyname:"iFrame",type:"int",value:0}],S=[{name:"u_resolution",
toyname:"iResolution",type:"vec2",value:[0,0]},{name:"u_mouse",toyname:"iCurrentMouse",type:"vec2",value:[0,0]},{name:"u_mousedrag",toyname:"iMouse",type:"vec4",value:[0,0,0,0]}],J=[{name:"u_orientation",toyname:"iOrientation",type:"vec3",value:[0,0,0]}],na=[...K,...J,...S],N=/\(\s*out\s+vec4\s+(\S+)\s*,\s*in\s+vec2\s+(\S+)\s*\)/,B;z.singleton=function(){B||(B=z());return B};z.resetSingleton=function(){B&&B.dispose();B=z()};class D extends HTMLElement{get renderer(){return z.singleton()}get name(){return this.getAttribute("name")}set name(a){this.setAttribute("name",
a)}}var F=(a,b,d)=>{if(!b)return a[d];b="toy".concat(d);return a.hasOwnProperty(b)?a[b]:a[d]},ma=(a,b)=>Object.values(a).reduce((a,c)=>a+"uniform ".concat(F(c,b,"type")," ").concat(F(c,b,"name"),";\n"),"");let pa=0;var ya=a=>new Promise((b,d)=>{let c=new XMLHttpRequest;c.open("GET",a);c.onreadystatechange=()=>{c.readyState===XMLHttpRequest.DONE&&(200===c.status?b(c.responseText):d(c.status))};c.send()}),U=async a=>a.src?ya(a.src):a.text;let V=new Float32Array([-1,1,1,1,1,-1,-1,1,1,-1,-1,-1]),za=0;
class W extends D{disconnectedCallback(){this.program.dispose();this.program=void 0}get shadertoy(){return this.hasAttribute("shadertoy")}set shadertoy(a){a?this.setAttribute("shadertoy",""):this.removeAttribute("shadertoy")}get prevbuffer(){return this.hasAttribute("prevbuffer")}set prevbuffer(a){a?this.setAttribute("prevbuffer",""):this.removeAttribute("prevbuffer")}get vertices(){let a=this.getAttribute("vertices");if(!a)return V;a=JSON.parse(a);return Array.isArray(a)?new Float32Array(a):V}set vertices(a){a&&
Array.isArray(a)&&this.setAttribute("vertices",JSON.stringify(a))}async init(a){a&&!this.name&&(this.name="".concat("u_node").concat(za++));let b=[],d,c;for(let a=0;a<this.children.length;a++){let e=this.children[a];if(e instanceof D)b.push(e);else switch(e.getAttribute("type")){case "x-shader/x-fragment":c=await U(e);break;case "x-shader/x-vertex":d=await U(e)}}this.program=oa(this.renderer.gl,d||"attribute vec2 position;\nvoid main() {\n  gl_Position = vec4(position, 0.0, 1.0);\n}",c,this.vertices,
this.shadertoy);b.forEach(a=>{a.init(this.program)});a&&a.addNode(this.program,this.name,this.prevbuffer)}}customElements.get("sd-node")||customElements.define("sd-node",W);let qa=new Uint8Array([0,0,0,255]),G=a=>!(a&a-1)&&!!a,Aa=0;class Ba extends D{disconnectedCallback(){this.program.removeTexture(this.texture);this.texture.dispose()}get src(){return this.getAttribute("src")}set src(a){this.setAttribute("src",a)}get autoplay(){return this.hasAttribute("autoplay")}set autoplay(a){a?this.setAttribute("autoplay",
""):this.removeAttribute("autoplay")}get loop(){return this.hasAttribute("loop")}set loop(a){a?this.setAttribute("loop",""):this.removeAttribute("loop")}get crossOrigin(){return this.getAttribute("crossorigin")}set crossOrigin(a){this.setAttribute("crossorigin",a)}get mic(){return this.hasAttribute("mic")}set mic(a){a?this.setAttribute("mic",""):this.removeAttribute("mic")}init(a){this.name||(this.name="".concat("u_audio").concat(Aa++));this.src&&(this.program=a,this.texture=ta(this.renderer,a.getTexUnit(),
this.name,this.src,this.mic,this.loop,this.autoplay,this.crossOrigin),a.addTexture(this.texture))}}customElements.get("sd-audio")||customElements.define("sd-audio",Ba);let wa=/\w+\.(jpg|jpeg|png|gif|bmp)(?=\?|$)/i,va=/\w+\.(mp4|3gp|webm|ogv)(?=\?|$)/i,X={NEAREST:9728,LINEAR:9729},Ca=function(a){for(var b=1;b<arguments.length;b++){var d=null!=arguments[b]?arguments[b]:{};b%2?P(d,!0).forEach(function(b){var c=d[b];b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):
a[b]=c}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(d)):P(d).forEach(function(b){Object.defineProperty(a,b,Object.getOwnPropertyDescriptor(d,b))})}return a}({},X,{NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987}),Y={REPEAT:10497,MIRRORED_REPEAT:33648,CLAMP_TO_EDGE:33071},Da=0;class Ea extends D{static get observedAttributes(){return"mag-filter min-filter name src wrap-s wrap-t".split(" ")}disconnectedCallback(){this.program.removeTexture(this.texture);
this.texture.dispose()}get forceUpdate(){return this.hasAttribute("force-update")}set forceUpdate(a){a?this.setAttribute("force-update",""):this.removeAttribute("force-update")}get magFilter(){return X[this.getAttribute("mag-filter")]||9729}get minFilter(){return Ca[this.getAttribute("min-filter")]||9987}get src(){return this.getAttribute("src")}set src(a){this.setAttribute("src",a)}get webcam(){return this.hasAttribute("webcam")}set webcam(a){a?this.setAttribute("webcam",""):this.removeAttribute("webcam")}get wrapS(){return Y[this.getAttribute("wrap-s")]||
10497}get wrapT(){return Y[this.getAttribute("wrap-t")]||10497}init(a){this.name||(this.name="".concat("u_texture").concat(Da++));if(this.src||this.webcam)this.program=a,this.texture=ua(this.renderer,a.getTexUnit(),this.name,this.src,this.webcam,this.wrapS,this.wrapT,this.minFilter,this.magFilter,this.forceUpdate),a.addTexture(this.texture)}}customElements.get("sd-texture")||customElements.define("sd-texture",Ea);class Fa extends D{disconnectedCallback(){}get x(){return parseFloat(this.getAttribute("x"))}set x(a){null!=
a?this.setAttribute("x",a):this.removeAttribute("x")}get y(){return parseFloat(this.getAttribute("y"))}set y(a){null!=a?this.setAttribute("y",a):this.removeAttribute("y")}get z(){return parseFloat(this.getAttribute("z"))}set z(a){null!=a?this.setAttribute("z",a):this.removeAttribute("z")}get w(){return parseFloat(this.getAttribute("w"))}set w(a){null!=a?this.setAttribute("w",a):this.removeAttribute("w")}getValue(){switch(this.type){case "vec2":return[this.x,this.y];case "vec3":return[this.x,this.y,
this.z];case "vec4":return[this.x,this.y,this.z,this.w];default:return this.x}}get type(){return this.getAttribute("type")}set type(a){null!=a?this.setAttribute("type",a):this.removeAttribute("type")}static get observedAttributes(){return["x","y","z","w"]}attributeChangedCallback(a,b,d){switch(a){case "x":case "y":case "z":case "w":null!=d&&this.renderer.setUniform(this.name,this.getValue())}}init(a){this.name?(this.program=a,this.renderer.addUniform(this.name,this.getValue(),this.type)):console.warn("sd-uniform created without a name.")}}
customElements.get("sd-uniform")||customElements.define("sd-uniform",Fa);let Ga=new Set(["touchstart","touchmove","touchend"]);var R=a=>{a=Ga.has(a.type)&&"object"===typeof a.touches[0]?a.touches[0]:a;return[a.clientX||0,a.clientY||0]};class Ha extends W{static get observedAttributes(){return["height","width"]}constructor(){super();this.shadow=this.attachShadow({mode:"open"})}connectedCallback(){this.shadow.innerHTML=T.render(this.width,this.height);this.canvas=T.map(this.shadow).canvas;setTimeout(()=>
{try{this.init()}catch(a){console.error(a&&a.message||"Error in shader-doodle.")}})}disconnectedCallback(){super.disconnectedCallback();this.renderer.removeSurface(this.surface);this.surface.dispose();this.surface=void 0}attributeChangedCallback(a){let b=this.shadow.styleSheets;if(("height"===a||"width"===a)&&0<b.length){let d=this[a];b[0].cssRules[0].style[a]=Number.isInteger(d)?"".concat(d,"px"):"250px"}}get height(){let a=parseInt(this.getAttribute("height"));return Number.isInteger(a)?a:void 0}set height(a){let b=
parseInt(a);Number.isInteger(b)&&this.setAttribute("height",a)}get width(){let a=parseInt(this.getAttribute("width"));return Number.isInteger(a)?a:void 0}set width(a){a=parseInt(a);Number.isInteger(a)&&this.setAttribute("width",a)}async init(){await super.init();this.surface=xa(this);this.renderer.addSurface(this.surface)}}customElements.get("shader-doodle")||customElements.define("shader-doodle",Ha)})
