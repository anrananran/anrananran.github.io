<template>
  <div class="home">
    <div class="home-items">
      <ul>
        <li class="home-item">
          <a target="_blank" href="/tulu/code/ppt/">
            <h2 class="name">旋转的粒子特效</h2>
            <p class="desc">旋转的粒子特效描述</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style lang="scss" scoped>
.home {
  .home-items {
    width: 800px;
    margin: 0 auto;
  }
  .home-item {
    margin-bottom: 10px;
  }
  .home-item > a {
    display: block;
    background-color: #2F333B;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #191A1E;
  }
  .home-item > a:hover {
    background-color: #333741;
  }
  .home-item .name {
    color: #D3D5DC;
    font-size: 20px;
    margin: 0 0 15px;
  }
  .home-item .desc {
    color: #9298A7;
    font-size: 16px;
    margin: 0;
    line-height: 1.8;
  }
}
</style>
