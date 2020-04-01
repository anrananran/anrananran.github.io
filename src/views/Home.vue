<template>
  <div class="home">
    <div class="home-items">
      <ul>
        <li v-for="item in items" :key="item.link" class="home-item" @click="onClickLink(item.link)">
          <h2 class="name" :title="item.name">{{ item.name }}</h2>
          <div class="bottom">
            <div class="tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="from">
              <span class="author" :title="item.author.name" @click.stop="onClickLink(item.author.homePage)">作者：{{ item.author.name }}</span>
              <span :title="item.from" @click.stop="onClickLink(item.from)">来源：{{ item.from }}</span>
            </div>
          </div>
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

<style lang="scss" scoped>
.home {
  .home-items {
    width: 800px;
    margin: 0 auto;
  }
  .home-item {
    margin-bottom: 10px;
    background-color: #2F333B;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #191A1E;

    &:hover {
      background-color: #333741;
      cursor: pointer;
    }

    .name {
      color: #D3D5DC;
      font-size: 24px;
      font-weight: 400;
      margin: 0 0 15px;
    }
    .bottom {
      line-height: 30px;

      &:after {
        content: "\20";
        display: block;
        clear: both;
        overflow: hidden;
        height: 0;
      }
    }
    .tags {
      color: #9298A7;
      font-size: 16px;
      margin: 0;
      line-height: 1.8;
      float: left;
    }
    .tag {
      margin: 0 10px 0 0;
      background-color: #5271C7;
      padding: 5px 10px;
      color: #fff;
      font-size: 14px;
      border: 1px solid #191A1E;
      border-radius: 4px;
    }
    .from {
      float: right;
      color: #9298A7;
      cursor: pointer;
      width: 500px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .author {
      margin-right: 10px;
    }
  }
}
</style>
