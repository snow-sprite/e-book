<template>
  <div class="detail-box">
    <header class="header">
      <main>
        <div class="btn" v-for="(item, ind) in leftNavs" :key="ind">
          <img :src="item.pic" alt="" />
        </div>
        <input type="text" v-model="searchNum" />
        <div class="btn" v-for="(item, ind) in rightNavs" :key="ind">
          <img :src="item.pic" alt="" />
        </div>
      </main>
      <div class="search-box">
        <input type="text" />
        <div class="search-icon">
          <img src="@assets/images/search.png" alt="" />
        </div>
      </div>
    </header>
    <div class="page-left"></div>
    <div class="page-right"></div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import zoomIn from '@assets/images/zoom-in.png';
import nav from '@assets/images/nav.png';
import list from '@assets/images/list.png';
import autoplay from '@assets/images/autoplay.png';
import start from '@assets/images/start.png';
import pre from '@assets/images/pre.png';

import next from '@assets/images/next.png';
import end from '@assets/images/end.png';
import voice from '@assets/images/voice.png';
import share from '@assets/images/share.png';
import down from '@assets/images/down.png';
import full from '@assets/images/full.png';

@Component
export default class Detail extends Vue {
  leftNavs = [
    { title: '放大', pic: zoomIn },
    { title: '缩略图', pic: nav },
    { title: '目录', pic: list },
    { title: '自动翻页', pic: autoplay },
    { title: '第一页', pic: start },
    { title: '前一页', pic: pre }
  ];
  rightNavs = [
    { title: '下一页', pic: next },
    { title: '最后一页', pic: end },
    { title: '打开声音', pic: voice },
    { title: '分享', pic: share },
    { title: '下载', pic: down },
    { title: '全屏', pic: full }
  ];

  searchNum = '';

  init() {
    // TODO
  }
  mounted() {
    this.init();
  }
}
</script>

<style scoped lang="scss">
.detail-box {
  width: 100%;
  height: 100vh;
  background: skyblue;
  position: relative;
  .header {
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 0.09rem;
    width: 80%;
    height: 0.46rem;
    font-size: 0.18rem;
    background: rgb(68, 68, 68);
    border-radius: 0 0 0.05rem 0.05rem;
    box-shadow: rgb(48, 48, 48) 0 0.01rem 0.02rem;
    main {
      width: 60%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      .btn {
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 0.03rem;
        text-align: center;
        cursor: pointer;
        opacity: 0.8;
        background: transparent;
        margin: 0 0.03rem;
        img {
          width: 0.22rem;
          height: 0.22rem;
          margin: 0.04rem 0 0 0.02rem;
        }
      }
      .btn:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.3);
      }
      input {
        width: 150px;
        outline: 0;
        border: 0;
        box-sizing: border-box;
        padding: 0 10px;
        text-align: center;
        font-size: 0.13rem;
      }
    }
    .search-box {
      width: 200px;
      height: 0.3rem;
      position: absolute;
      right: 200px;
      top: 0.09rem;
      background: #fff;
      border-radius: 0.03rem;
      display: flex;
      input {
        width: 1.5rem;
        outline: 0;
        border: 0;
        padding: 0 6px 0 10px;
        font-size: 0.13rem;
        border-radius: 0.03rem;
      }
      .search-icon {
        cursor: pointer;
        img {
          width: 0.25rem;
          height: 0.25rem;
          margin: 0.02rem 0 0 0.01rem;
        }
      }
    }
  }
  .page-left,
  .page-right {
    width: 0.48rem;
    height: 0.96rem;
    position: absolute;
    top: calc(50% - 0.48rem);
    cursor: pointer;
  }
  .page-left {
    left: 0;
    background: url('../assets/images/previous_normal.png') no-repeat center;
    &:hover {
      background: url('../assets/images/previous_normal_down.png') no-repeat
        center;
    }
  }
  .page-right {
    right: 0;
    background: url('../assets/images/next_normal.png') no-repeat center;
    &:hover {
      background: url('../assets/images/next_normal_down.png') no-repeat center;
    }
  }
}
</style>
