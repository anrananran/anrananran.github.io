<template>
  <div class="home">
    <div class="home-header">
      <logo class="logo" />
      <a class="github" href="https://github.com/anrananran/anrananran.github.io" target="_blank">
        <svg-icon icon-class="github" />
      </a>
    </div>
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

    <div class="copyright">
      Powerd with love ©2019-Now
    </div>
  </div>
</template>

<script>
import Logo from '@/components/Logo'
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
    Page,
    Logo
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
      return this.items.slice(start, start + this.size)
    }
  },
  mounted() {
    window.addEventListener('message', (event) => {
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

<style lang="scss" scoped>
.home {
  padding: 70px 0;
  height: 100vh;
  box-sizing: border-box;

  .home-header {
    height: 60px;
    background-color: #000;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 2px 20px 2px rgba(#000, .3);
    border-bottom: 2px solid #ff4200;
    z-index: 5;

    .logo {
      position: absolute;
      left: 12px;
      top: 8px;
    }

    .github {
      position: absolute;
      right: 10px;
      top: 6px;
      font-size: 40px;
      line-height: 1;
      color: #fff;
    }
  }
  .home-items {
    width: 930px;
    margin: 20px auto;

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

  .copyright {
    box-shadow: 0 -2px 15px 2px rgba(#000, .1);
    padding: 15px 20px;
    background-color: #000;
    color: #fff;
    font-size: 14px;
    text-align: center;
    position: fixed;
    z-index: 2000;
    bottom: 0;
    left: 0;
    right: 0;
  }
}

.home /deep/ {
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
    border-color: #000;
    min-width: 40px;
    height: 40px;
    line-height: 40px;

    a {
      color: #fefefe;
    }

    &:hover {
      box-shadow: 0 0 12px 1px rgba(#000, .1);
      border-color: darken(#d2ba47, 10%);

      a {
        color: darken(#d2ba47, 10%)
      }
    }
  }
  .ivu-page-item-active {
    border-color: #d2ba47;

    a, &:hover a {
      color: #d2ba47;
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
