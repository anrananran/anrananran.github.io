<template>
  <div class="home">
    <div class="home-items">
      <ul>
        <li v-for="item in items" :key="item.link" class="home-item" @click="onClickLink(item.link)">
          <iframe class="iframe" width="240" height="150" :src="item.link" frameborder="0" scrolling="no" seamless />
          <div class="right">
            <h2 class="name" :title="item.name">{{ item.name }}</h2>
            <div class="tags">
              <span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
            <div class="from">
              <span class="author" :title="item.author.name" @click.stop="onClickLink(item.author.homePage)">作者：{{ item.author.name }}</span>
            </div>
            <div class="from">
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
    width: 900px;
    margin: 0 auto;
  }
  .home-item {
    margin-bottom: 10px;
    background-color: #2F333B;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #191A1E;
    display: flex;
    flex-direction: row;
    align-items: center;

    &:hover {
      background-color: #333741;
      cursor: pointer;
    }
    .iframe {
      margin-right: 20px;
    }
    .right {
      flex: 1;
    }
    .name {
      color: #D3D5DC;
      font-size: 24px;
      font-weight: 400;
      margin: 6px 0 15px;
    }
    
    .tags {
      color: #9298A7;
      font-size: 16px;
      margin: 0 0 15px;
      line-height: 1.8;
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
      color: #9298A7;
      cursor: pointer;
      line-height: 1.8;
      width: 400px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-bottom: 5px;
    }
    .author {
      margin-right: 10px;
    }
  }
}
</style>
