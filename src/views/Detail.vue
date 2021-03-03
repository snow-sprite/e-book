<template>
  <div class="detail-box" v-throttle="resizeFn">
    <header class="header" v-show="!isMobile">
      <main>
        <div
          class="btn"
          v-for="item in leftNavs"
          :key="item.id"
          v-show="item.isShow"
        >
          <img :src="item.pic" alt="" />
        </div>
        <input class="page-input" type="text" v-model="searchNum" />
        <div
          class="btn"
          v-for="item in rightNavs"
          :key="item.id"
          v-show="item.isShow"
        >
          <img :src="item.pic" alt="" />
        </div>
      </main>
      <div class="search-box" v-show="isSearch">
        <input type="text" />
        <div class="search-icon">
          <img src="@assets/images/search.png" alt="" />
        </div>
      </div>
    </header>
    <div class="page-left" v-show="!isMobile"></div>
    <div class="page-right" v-show="!isMobile"></div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
import { simple } from '@libs/simple';
import device from '@libs/device';
// images
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
import more from '@assets/images/more.png';
@Component
export default class Detail extends Vue {
  leftNavs = [
    { id: 1, title: '放大', pic: zoomIn, isShow: true },
    { id: 2, title: '缩略图', pic: nav, isShow: true },
    { id: 3, title: '目录', pic: list, isShow: true },
    { id: 4, title: '自动翻页', pic: autoplay, isShow: true },
    { id: 5, title: '第一页', pic: start, isShow: true },
    { id: 6, title: '前一页', pic: pre, isShow: true }
  ];
  rightNavs = [
    { id: 7, title: '下一页', pic: next, isShow: true },
    { id: 8, title: '最后一页', pic: end, isShow: true },
    { id: 9, title: '打开声音', pic: voice, isShow: true },
    { id: 10, title: '分享', pic: share, isShow: true },
    { id: 11, title: '下载', pic: down, isShow: true },
    { id: 12, title: '全屏', pic: full, isShow: true },
    { id: 13, title: '更多', pic: more, isShow: false }
  ];

  searchNum = '';

  init() {
    // TODO
  }

  isSearch = false;

  isMobile = device.isMobile();

  resizeFn() {
    const docWidth = (document.body || document.documentElement).clientWidth;
    this.isSearch = docWidth <= 869 ? false : true;
    simple(docWidth, this.leftNavs, this.rightNavs);
  }

  mounted() {
    this.init();
    this.resizeFn();
  }
}
</script>

<style scoped lang="scss">
.detail-box {
  width: 100%;
  height: 100vh;
  background: #fff;
  .header {
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 0.09rem;
    position: relative;
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
        margin: 0 0.03rem 0;
        &:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.3);
        }
        &:active {
          opacity: 0.6;
        }
        img {
          width: 0.22rem;
          height: 0.22rem;
          margin: 0.04rem 0 0 0.02rem;
        }
      }
      .page-input {
        width: 1rem;
        outline: 0;
        border: 0;
        border-radius: 0.03rem;
        box-sizing: border-box;
        padding: 0 0.1rem;
        text-align: center;
        font-size: 0.13rem;
        margin: 0 0.03rem 0;
      }
      .btn-13 {
        display: none;
      }
    }
    .search-box {
      width: 1.8rem;
      height: 0.3rem;
      position: absolute;
      // right: 2rem;
      right: 10px;
      left: auto;
      top: 0.09rem;
      background: #fff;
      border-radius: 0.03rem;
      display: flex;
      input {
        width: 80%;
        outline: 0;
        border: 0;
        padding: 0 0.06rem 0 0.1rem;
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
    &:active {
      opacity: 0.8;
    }
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
