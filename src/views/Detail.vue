<template>
  <div class="flipbook-viewport">
    <div class="container">
      <div class="flipbook">
        <!--  class="hard" 硬皮开启  -->
        <div><img src="./pages/1.jpg" alt="" /></div>
        <div><img src="./pages/2.jpg" alt="" /></div>
        <div><img src="./pages/3.jpg" alt="" /></div>
        <div><img src="./pages/4.jpg" alt="" /></div>
        <div><img src="./pages/5.jpg" alt="" /></div>
        <div><img src="./pages/6.jpg" alt="" /></div>
        <div><img src="./pages/7.jpg" alt="" /></div>
        <div><img src="./pages/8.jpg" alt="" /></div>
        <div><img src="./pages/9.jpg" alt="" /></div>
        <div><img src="./pages/10.jpg" alt="" /></div>
        <div><img src="./pages/11.jpg" alt="" /></div>
        <div><img src="./pages/12.jpg" alt="" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Detail extends Vue {
  init() {
    yepnope({
      test: Modernizr.csstransforms,
      complete: this.loadApp
    });
  }

  loadApp() {
    // Create the flipbook
    $('.flipbook').turn({
      width: 922, // flipbook's Width
      height: 600, // flipbook's Height
      acceleration: true, // 硬件加速
      autoCenter: true, // Auto center this flipbook
      direction: 'ltr',
      display: 'double', // or 'single'
      duration: '600',
      gradients: true, // amination gradient && shadows
      elevation: 50, // Elevation: 0
      page: 1, // set the page when init the flitbook: 1
      // pages: 3, // 总页数
      turnCorners: 'bl,br', // 'bl,br' or 'tl,tr' or 'bl,tr'
      when: {
        // end
        // first
        // last
        // missing
        // start
        // turning: (event, page, pageObject) => {}
        // turned
        // zooming
      }
    });
  }
  mounted() {
    this.init();
  }
}
</script>

<style scoped lang="scss">
/* Basic sample */
body {
  overflow: hidden;
  background-color: #fcfcfc;
  margin: 0;
  padding: 0;
}

.flipbook-viewport {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.flipbook-viewport .container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: auto;
}

.flipbook-viewport .flipbook {
  width: 922px;
  height: 600px;
  left: -461px;
  top: -300px;
}

.flipbook-viewport .page {
  width: 461px;
  height: 600px;
  background-color: white;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.flipbook .page {
  -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  -ms-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.flipbook {
  img {
    width: 100%;
    height: 100%;
  }
}

.flipbook-viewport .page img {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: 0;
}

.flipbook-viewport .shadow {
  -webkit-transition: -webkit-box-shadow 0.5s;
  -moz-transition: -moz-box-shadow 0.5s;
  -o-transition: -webkit-box-shadow 0.5s;
  -ms-transition: -ms-box-shadow 0.5s;

  -webkit-box-shadow: 0 0 20px #ccc;
  -moz-box-shadow: 0 0 20px #ccc;
  -o-box-shadow: 0 0 20px #ccc;
  -ms-box-shadow: 0 0 20px #ccc;
  box-shadow: 0 0 20px #ccc;
}
</style>
