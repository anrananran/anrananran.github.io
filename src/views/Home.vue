<template>
  <div class="home">
    <div class="home-items">
      <ul>
        <li v-for="item in renderItems" :key="item.link" class="home-item" @click="onClickLink(item.link)">
          <tooltip :content="item.name">
            <iframe class="iframe" width="100%" height="100%" :src="item.link" frameborder="0" scrolling="no" seamless />
          </tooltip>
        </li>
      </ul>
    </div>
    <page :total="items.length" :current.sync="curr" class="home-pages" @on-change="onPageChange" />
  </div>
</template>

<script>
import { items } from '@/mock/list'
import { Tooltip, Page } from 'view-design'

export default {
  name: 'Home',
  components: {
    Tooltip,
    Page
  },
  data() {
    return {
      items,
      curr: 1
    }
  },
  computed: {
    renderItems() {
      const len = 6
      const start = (this.curr - 1) * len
      return this.items.slice(start, start + len)
    }
  },
  methods: {
    onClickLink(link) {
      window.open(link, '_blank')
    },
    onPageChange(curr) {
      console.log(curr)
    }
  }
}
</script>

<style lang="scss">
.home {
  .ivu-tooltip,
  .ivu-tooltip-rel {
    width: 100%;
    height: 100%;
    display: block;
  }

  .ivu-page {
    text-align: center;
  }
  .ivu-page-item,
  .ivu-page-prev,
  .ivu-page-next {
    background-color: rgba(#333, .8);
    color: #fefefe;
    border-color: #000;
    min-width: 40px;
    height: 40px;
    line-height: 40px;

    &:hover {
      border-color: #222;
    }
  }
}
</style>

<style lang="scss" scoped>
.home {
  padding: 50px 0;
  .home-items {
    width: 930px;
    overflow: hidden;
    margin: 0 auto 20px;
  }
  .home-item {
    width: 300px;
    height: 200px;
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

@media screen and (max-width: 500px) {
  .home {
    .home-items {
      width: 100%;
      box-sizing: border-box;
      padding: 5px;
    }

    .home-item {
      width: 100%;
      margin: 0 0 5px;
    }
  }
}
</style>
