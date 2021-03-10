<template>
  <div id="canvas">
    <div class="magazine-viewport">
      <div class="container">
        <div class="magazine"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import '@assets/js/turn.min';
import '@assets/js/zoom.min';
import store from '@/store/index';
import PDFJS from 'pdfjs-dist';

import {
  isChrome,
  resizeViewport,
  loadSmallPage,
  loadLargePage,
  largeMagazineWidth,
  addPage
} from '@libs/turnUtils';
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
    // const loadingTask = PDFJS.getDocument(this.pdfUrl);
    // const data = await loadingTask.promise;
    // console.log('data', loadingTask);

    // 设置总页数
    // this.pages = data.numPages;
    store.commit('book/setPage', this.currentPage);
    store.commit('book/setPages', this.pages);

    this.init(this.pdfUrl); // 初始化容器
  }

  private loadApp(url: string) {
    $('#canvas').fadeIn(1000);

    const flipbook = $('.magazine');

    // Check if the CSS was already loaded
    console.log(123, flipbook.width(), flipbook.height());

    if (flipbook.width() == 0 || flipbook.height() == 0) {
      setTimeout(this.loadApp, 10);
      return;
    }

    // Create the flipbook

    flipbook.turn({
      // Magazine width
      width: 450,
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
      pages: 12,
      display: 'single',
      // Events
      when: {
        turning: function(event: Event, page: number, view: number) {
          // TODO 添加缩略图时
        },
        turned: function(event: Event, page: number, view: number) {
          $(this).turn('center');
          if (page == 1) {
            $(this).turn('peel', 'br');
          }
        },

        missing: (event: Event, pages: number[]) => {
          console.log('missing', pages);
          // Add pages that aren't in the magazine

          for (let i = 0; i < pages.length; i++) addPage(pages[i], $(this));
        }
      }
    });

    // Zoom.js

    $('.magazine-viewport').zoom({
      flipbook: $('.magazine'),

      max: function() {
        return largeMagazineWidth() / $('.magazine').width();
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
          $('.magazine')
            .removeClass('animated')
            .addClass('zoom-in');
        },

        zoomOut: function() {
          setTimeout(function() {
            $('.magazine')
              .addClass('animated')
              .removeClass('zoom-in');
            resizeViewport();
          }, 0);
        }
      }
    });

    // Zoom event
    // if ($.isTouch)
    // 	$('.magazine-viewport').bind('zoom.doubleTap', zoomTo);
    // else
    // 	$('.magazine-viewport').bind('zoom.tap', zoomTo);

    // Using arrow keys to turn the page

    $(document).keydown(function(e) {
      const previous = 37,
        next = 39,
        esc = 27;

      switch (e.keyCode) {
        case previous:
          // left arrow
          $('.magazine').turn('previous');
          e.preventDefault();

          break;
        case next:
          //right arrow
          $('.magazine').turn('next');
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

    $('.magazine').addClass('animated');
  }
  @Prop(Boolean) readonly zoomflag!: boolean;

  @Watch('zoomflag')
  onZooms(n: boolean) {
    // Zoom
    n
      ? $('.magazine-viewport').zoom('zoomIn')
      : $('.magazine-viewport').zoom('zoomOut');
  }
  private init(url: string) {
    // Hide canvas
    $('#canvas').hide();
    this.loadApp(url);
  }

  mounted() {
    this.getPdfPages(); // 初始化pdf
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/magazine.css';
</style>
