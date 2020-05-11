<template>
  <div>
    <div class="neon-wrapper">
      <span class="txt">神笔</span>
      <span class="gradient" />
      <span class="dodge" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
.txt {
  color: #ffffff;
  background: #000000;
  font-size: 30px;
  font-weight: bold;
  font-family: Arial;
  text-transform: uppercase;
}
.txt::before {
  content: '神笔';
  position: absolute;
  mix-blend-mode: difference;
  filter: blur(1px);
}
.neon-wrapper {
  display: inline-flex;
  filter: brightness(200%);
  overflow: hidden;
  opacity: .9;
}
.gradient {
  background: linear-gradient(114.57931deg, #e27324 4.92708%, #5d4933 97.84375%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  mix-blend-mode: multiply;
}
.dodge {
  background: radial-gradient(circle, white, black 35%) center / 25% 25%;
  position: absolute;
  top: -100%;
  left: -100%;
  right: 0;
  bottom: 0;
  mix-blend-mode: color-dodge;
  animation: dodge-area 12s linear infinite;
}
@keyframes dodge-area {
  to {
    transform: translate(50%, 50%);
  }
}
</style>
