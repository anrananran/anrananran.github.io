<template>
  <div class="home">
    <div class="home-items">
      <ul>
        <li v-for="item in renderItems" :key="item.link" class="home-item" @click="onClickLink(item.link)">
          <tooltip :content="item.name">
            <iframe v-if="!item.thumb" :id="item.id" class="iframe" width="100%" height="100%" loading="lazy" :src="item.link" frameborder="0" scrolling="no" seamless />
            <img v-else class="thumb" :src="item.thumb" :alt="item.name">
          </tooltip>
        </li>
      </ul>
    </div>
    <page :total="items.length" :page-size="size" :current.sync="curr" class="home-pages" @on-change="onPageChange" />
  </div>
</template>

<script>
import { items } from '@/mock/list'
import { Tooltip, Page } from 'view-design'
import { getRandomString } from '@/utils/util'

function parseItems(items) {
  return items.map(item => {
    return {
      id: getRandomString(8),
      thumb: '',
      ...item
    }
  })
}

export default {
  name: 'Home',
  components: {
    Tooltip,
    Page
  },
  data() {
    return {
      items: parseItems(items),
      curr: 1,
      size: 6
    }
  },
  computed: {
    renderItems() {
      const start = (this.curr - 1) * this.size
      console.log('总数', this.items.length)
      return this.items.slice(start, start + this.size)
    }
  },
  mounted() {
    window.addEventListener('message', (event) => {
      console.log('缩略图：', event.data)
      const res = event.data
      this.items.forEach(item => {
        if (item.link === res.link) {
          item.thumb = res.thumb
        }
      })
    })
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

  .ivu-tooltip-inner {
    max-width: inherit;
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
    margin: 0 auto 20px;

    &:after {
      content: '\20';
      height: 0;
      clear: both;
      display: block;
      visibility: hidden;
    }
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
    position: relative;

    &:hover {
      background-color: #333741;
      cursor: pointer;
    }

    .iframe {
      display: block;
      border-radius: 3px;
      pointer-events: none;
    }

    .thumb {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 3;
      object-fit: cover;
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
