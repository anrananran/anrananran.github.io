<template>
  <div class="home">
    <div class="home-items">
      <ul>
        <li v-for="item in items" :key="item.link" class="home-item" @click="onClickLink(item.link)">
          <tooltip :content="item.name">
            <iframe class="iframe" width="100%" height="150" :src="`/tulu${item.link}`" frameborder="0" scrolling="no" seamless />
          </tooltip>
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
  },
  methods: {
    onClickLink(link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style lang="scss">
.home {
  .ivu-tooltip,
  .ivu-tooltip-rel {
    display: block;
  }
}
</style>

<style lang="scss" scoped>
.home {
  .home-items {
    width: 930px;
    overflow: hidden;
    margin: 50px auto;
  }
  .home-item {
    width: 300px;
    margin: 5px;
    background-color: #2F333B;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #191A1E;
    display: flex;
    flex-direction: row;
    align-items: center;
    float: left;
    cursor: pointer;

    &:hover {
      background-color: #333741;
      cursor: pointer;
    }

    .iframe {
      display: block;
      border-radius: 3px;
      pointer-events: none;
    }
  }
}
</style>
