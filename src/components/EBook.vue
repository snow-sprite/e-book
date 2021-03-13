<template>
  <div>
    <div id="canvas">
      <div class="magazine-viewport">
        <div class="container">
          <div class="magazine"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import '@/assets/js/turn.min.js';
import '@/assets/js/zoom.min.js';
import store from '@/store/index';

import {
  isChrome,
  resizeViewport,
  loadSmallPage,
  loadLargePage,
  largeMagazineWidth,
  addPage
} from '@libs/turnUtils';

const CMAP_URL = '../node_modules/pdfjs-dist/cmaps';

@Component({
  name: 'EBook'
})
export default class EBook extends Vue {
  // pdf link
  private pdfUrl = 'http://image.cache.timepack.cn/nodejs.pdf';
  // total pages
  private pages = 0;
  private currentPage = 1;

  private async getPdfPages() {
    const data = await window['pdfjsLib'].getDocument({
      url: this.pdfUrl,
      cMapUrl: CMAP_URL,
      cMapPacked: true
    }).promise;

    // 设置总页数
    this.pages = data.numPages;
    store.commit('book/setPage', this.currentPage);
    store.commit('book/setPages', this.pages);

    this.init(data); // 初始化容器
  }

  private init(pdf: object) {
    // Hide canvas
    $('#canvas').hide();
    this.loadApp(pdf);
  }

  @PropSync('zoomflag', { type: Boolean }) private zoomFlagPro!: boolean;
  @Watch('zoomflag')
  onZooms(n: boolean) {
    // Zoom
    if (n) {
      // 放大双页
      $('.magazine').turn('display', 'double');
      $('.magazine-viewport').zoom('zoomIn');
    } else {
      // 缩小单页
      $('.magazine').turn('display', 'single');
      $('.magazine-viewport').zoom('zoomOut');
    }
  }

  // 第一页
  public first() {
    if ($('.magazine').turn('page') <= 1) return;
    store.commit('book/setPage', 1);
    $('.magazine').turn('page', 1);
  }

  // 前一页
  public previous() {
    if ($('.magazine').turn('page') <= 1) return;
    store.commit('book/setPage', $('.magazine').turn('page'));
    $('.magazine').turn('previous');
  }

  // 后一页
  public next() {
    if ($('.magazine').turn('page') > this.pages) return;
    store.commit('book/setPage', $('.magazine').turn('page'));
    $('.magazine').turn('next');
  }

  // 最后一页
  public last() {
    if ($('.magazine').turn('page') > this.pages) return;
    store.commit('book/setPage', $('.magazine').turn('page'));
    $('.magazine').turn('page', this.pages);
  }

  // 跳转到具体某一页
  public jumpPage(p) {
    if (p < 1 || p > this.pages) {
      alert('输入合法字符！');
      return;
    }
    $('.magazine').turn('page', p);
  }

  private loadApp = (pdf: object) => {
    $('#canvas').fadeIn(1000);
    const flipbook = $('.magazine');
    // Check if the CSS was already loaded

    if (flipbook.width() == 0 || flipbook.height() == 0) {
      setTimeout(() => {
        this.loadApp(pdf);
      }, 10);
      return;
    }

    // Create the flipbook

    flipbook.turn({
      // Magazine width

      // width: 960,
      width: 480,

      // Magazine height

      height: 600,

      // Duration in millisecond

      duration: 1000,

      // Hardware acceleration

      acceleration: !isChrome(),

      // Enables gradients

      gradients: true,

      // Auto center this flipbook

      autoCenter: true,

      // Elevation from the edge of the flipbook when turning a page

      elevation: 50,

      // The number of pages

      pages: pdf['numPages'],
      display: 'single',

      // Events

      when: {
        turning: (event: Event, page: number) => {
          store.commit('book/setPage', page);
          // TODO 添加缩略图时
        },

        turned: function() {
          $(this).turn('center');
        },

        missing: function(event, pages) {
          // Add pages that aren't in the magazine

          for (let i = 0; i < pages.length; i++)
            addPage(pages[i], $(this), pdf);
        }
      }
    });

    // Zoom.js

    $('.magazine-viewport').zoom({
      flipbook,

      max: () => {
        return largeMagazineWidth() / flipbook.width();
      },

      when: {
        swipeLeft: function() {
          $(this)
            .zoom('flipbook')
            .turn('next');
        },

        swipeRight: function() {
          $(this)
            .zoom('flipbook')
            .turn('previous');
        },

        resize: function(
          event: Event,
          scale: number,
          page: number,
          pageElement: HTMLElement
        ) {
          if (scale == 1) loadSmallPage(page, pageElement);
          else loadLargePage(page, pageElement);
        },

        zoomIn: function() {
          flipbook.removeClass('animated').addClass('zoom-in');
          flipbook.removeClass('zoom-icon-in').addClass('zoom-icon-out');
        },

        zoomOut: function() {
          $('.zoom-icon')
            .removeClass('zoom-icon-out')
            .addClass('zoom-icon-in');

          setTimeout(function() {
            flipbook.addClass('animated').removeClass('zoom-in');
            resizeViewport();
          }, 0);
        }
      }
    });
    // Using arrow keys to turn the page

    $(document).keydown(function(e: Event) {
      const previous = 37,
        next = 39,
        esc = 27;

      switch (e.keyCode) {
        case previous:
          // left arrow
          flipbook.turn('previous');
          e.preventDefault();

          break;
        case next:
          //right arrow
          flipbook.turn('next');
          e.preventDefault();

          break;
        case esc:
          $('.magazine-viewport').zoom('zoomOut');
          e.preventDefault();

          break;
      }
    });

    $(window)
      .resize(function() {
        resizeViewport();
      })
      .bind('orientationchange', function() {
        resizeViewport();
      });

    resizeViewport();

    flipbook.addClass('animated');
  };

  mounted() {
    this.getPdfPages(); // 初始化pdf
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/magazine.css';
</style>
