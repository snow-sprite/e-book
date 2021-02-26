<template>
  <ul class="wraper">
    <li
      class="card"
      v-for="(lis, ind) in list"
      :key="ind"
      title="名字"
      @click="jumpDetail(ind)"
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

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class List extends Vue {
  list = [
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

  jumpDetail(id) {
    this.$router.push({
      name: 'detail',
      params: { id }
    });
  }
}
</script>

<style lang="scss" scoped>
.wraper {
  width: 90%;
  max-width: 1800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  // 必要时折行
  flex-wrap: wrap;
  margin-top: 20px;
  li {
    list-style: none;
  }
  .card {
    position: relative;
    left: 0;
    cursor: pointer;
    transition: transform 0.3s;
    &:hover {
      transform: translate(0, -10px);
      box-shadow: 4px 4px 5px 4px #ccc;
    }
    .name {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: auto;
      background: rgba(0, 0, 0, 0.5);
      font-size: 18px;
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
      width: calc(80%);
      margin: 0 auto 10px;
      .thumb {
        height: 160px;
      }
    }
  }
}
@media (min-width: 600px) {
  .wraper {
    .card {
      width: calc(50% - 3%);
      margin-bottom: 10px;
      .thumb {
        height: 350px;
      }
    }
  }
}
@media (min-width: 768px) {
  .wraper {
    .card {
      width: calc(33% - 3%);
      margin-bottom: 10px;
      .thumb {
        height: 400px;
      }
    }
  }
}

@media (min-width: 1300px) {
  .wraper {
    .card {
      width: calc(25% - 3%);
      .thumb {
        height: 450px;
      }
    }
  }
}

@media (min-width: 1450px) {
  .wraper {
    .card {
      width: calc(25% - 3%);
      .thumb {
        height: 500px;
      }
    }
  }
}
</style>
