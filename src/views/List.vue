<template>
  <ul class="wraper">
    <li
      class="card"
      v-for="(lis, ind) in list.slice(0, 5)"
      :key="ind + 1"
      title="名字"
      @click="jumpDetail(ind + 1)"
    >
      <div class="thumb">
        <img :src="lis.thumb" alt="" />
      </div>
      <div class="name">
        <span>{{ lis.name }}</span>
      </div>
    </li>
    <li
      class="card"
      v-for="(lis, ind) in list.slice(5, 10)"
      :key="ind + 6"
      title="名字"
      @click="jumpDetail(ind + 6)"
    >
      <div class="thumb">
        <img :src="lis.thumb" alt="" />
      </div>
      <div class="name">
        <span>{{ lis.name }}</span>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
const traceBased = require('@assets/thumb/1.png');
const nodejs = require('@assets/thumb/2.png');

interface BookList {
  name?: string;
  thumb?: string;
  url?: string;
}

@Component({
  name: 'List'
})
export default class List extends Vue {
  private list: Array<BookList> = [
    {
      name: 'trace-based(readable)',
      thumb: traceBased,
      url:
        'http://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf'
    },
    {
      name: 'nodejs(readable)',
      thumb: nodejs,
      url: 'http://image.cache.timepack.cn/nodejs.pdf'
    },
    {
      name: '山',
      thumb:
        'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    },
    {
      name: '小鸟',
      thumb:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    },
    {
      name: '小鹿',
      thumb:
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
    },
    {
      name: '小马',
      thumb:
        'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
    }
  ];

  private jumpDetail(id: string) {
    this.$router.push({
      name: 'detail',
      query: { id }
    });
  }
}
</script>

<style lang="scss" scoped>
.wraper {
  width: 90%;
  max-width: 18rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 0.2rem;
  li {
    list-style: none;
  }
  .card {
    position: relative;
    left: 0;
    cursor: pointer;
    transition: transform 0.3s;
    margin: 0 0.1rem;
    &:hover {
      transform: translate(0, -0.1rem);
      box-shadow: 0 0.04rem 0.05rem 0.04rem #ccc;
    }
    .name {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: auto;
      background: rgba(0, 0, 0, 0.5);
      font-size: 0.18rem;
      color: #fff;
      text-align: center;
    }
    .thumb {
      img {
        padding: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}

@media (max-width: 600px) {
  .wraper {
    .card {
      width: calc(70%);
      margin: 0 auto 0.2rem;
      .thumb {
        height: 6rem;
      }
    }
  }
}
@media (min-width: 600px) {
  .wraper {
    .card {
      width: calc(48% - 3%);
      margin-bottom: 0.2rem;
      .thumb {
        height: 3.5rem;
      }
    }
  }
}
@media (min-width: 768px) {
  .wraper {
    .card {
      width: calc(20% - 3%);
      margin-bottom: 0.2rem;
      .thumb {
        height: 3rem;
      }
    }
  }
}

@media (min-width: 1300px) {
  .wraper {
    .card {
      width: calc(20% - 3%);
      .thumb {
        height: 3rem;
      }
    }
  }
}

@media (min-width: 1450px) {
  .wraper {
    .card {
      width: calc(20% - 3%);
      .thumb {
        height: 4rem;
      }
    }
  }
}
</style>
