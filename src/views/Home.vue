<template>
  <div class="home">
    <div class="home-items">
      <ul>
        <li v-for="item in items" :key="item.link" class="home-item">
          <a target="_blank" :href="item.link">
            <h2 class="name">{{ item.name }}</h2>
            <p class="desc">{{ item.desc }}</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { items } from '@/mock/list' 

export default {
  name: 'Home',
  data() {
    return {
      items
    }
  }
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
