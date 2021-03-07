<template>
  <div id="canvas">
    <div id="book-zoom">
      <div class="my-book">
        <!-- <pdf :src="pdfUrl" :page="1"></pdf> -->
        <div depth="1" class="">
          <div class="side"></div>
        </div>
        <!-- <div depth="5" class="hard front-side">
          <div class="depth"></div>
        </div> -->
        <div class="own-size">
          <!-- :page="currentPage" -->
          <!-- <pdf
            :src="pdfUrl"
            :page="currentPage * 2"
            @num-pages="pages = $event"
          ></pdf> -->
        </div>
        <div class="own-size even">
          <!-- <pdf
            :src="pdfUrl"
            :page="currentPage * 2 + 1"
            @num-pages="pages = $event"
          ></pdf> -->
        </div>
        <!-- <div class=" fixed back-side p111">
          <div class="depth"></div>
        </div> -->
        <!-- <div class=" p112"></div> -->
      </div>
    </div>
    <div id="slider-bar" class="turnjs-slider">
      <div id="slider"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import '@assets/js/turn.min';
import store from '@/store/index';
import {
  zoomHandle,
  updateDepth,
  isChrome,
  // numberOfViews,
  // getViewNumber,
  // setPreview,
  addPage,
  moveBar
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
    const loadingTask = Vue.prototype.$pdf.createLoadingTask(this.pdfUrl);
    const data = await loadingTask.promise;
    // 设置总页数
    this.pages = data.numPages;

    this.init(this.pdfUrl); // 初始化容器
  }

  private loadApp(url: string) {
    const flipbook = $('.my-book');
    // Check if the CSS was already loaded
    if (flipbook.width() == 0 || flipbook.height() == 0) {
      setTimeout(this.loadApp, 3000);
      return;
    }
    // Slider
    // $('#slider').slider({
    //   min: 1,
    //   max: 100,
    //   start: function(event, ui) {
    //     if (!window._thumbPreview) {
    //       _thumbPreview = $('<div />', {
    //         class: 'thumbnail'
    //       }).html('<div></div>');
    //       setPreview(ui.value);
    //       _thumbPreview.appendTo($(ui.handle));
    //     } else setPreview(ui.value);
    //     moveBar(false);
    //   },

    //   slide: function(event, ui) {
    //     setPreview(ui.value);
    //   },

    //   stop: function() {
    //     if (window._thumbPreview) _thumbPreview.removeClass('show');

    //     $('.my-book').turn(
    //       'page',
    //       Math.max(1, $(this).slider('value') * 2 - 2)
    //     );
    //   }
    // });

    // URIs

    // Arrows

    $(document).keydown(function(e: Event) {
      const previous = 37,
        next = 39;

      switch (e['keyCode']) {
        case previous:
          $('.my-book').turn('previous');

          break;
        case next:
          $('.my-book').turn('next');

          break;
      }
    });

    // Flipbook

    flipbook.bind($.isTouch ? 'touchend' : 'click', zoomHandle);

    flipbook.turn({
      elevation: 50,
      acceleration: !isChrome(),
      autoCenter: true,
      gradients: true,
      display: 'double',
      duration: 1000,
      pages: this.pages,
      when: {
        turning: function(e: Event, page: number) {
          const book = $(this),
            currentPage = book.turn('page'),
            pages = book.turn('pages');

          if (currentPage > 3 && currentPage < pages - 3) {
            if (page == 1) {
              book
                .turn('page', 2)
                .turn('stop')
                .turn('page', page);
              e.preventDefault();
              return;
            } else if (page == pages) {
              book
                .turn('page', pages - 1)
                .turn('stop')
                .turn('page', page);
              e.preventDefault();
              return;
            }
          } else if (page > 3 && page < pages - 3) {
            if (currentPage == 1) {
              book
                .turn('page', 2)
                .turn('stop')
                .turn('page', page);
              e.preventDefault();
              return;
            } else if (currentPage == pages) {
              book
                .turn('page', pages - 1)
                .turn('stop')
                .turn('page', page);
              e.preventDefault();
              return;
            }
          }
          updateDepth(book, page);
          if (page >= 2) $('.my-book .p2').addClass('fixed');
          else $('.my-book .p2').removeClass('fixed');
          if (page < book.turn('pages')) $('.my-book .p111').addClass('fixed');
          else $('.my-book .p111').removeClass('fixed');
        },
        turned: function(e: Event, page: number) {
          const book = $(this);
          if (page == 2 || page == 3) {
            book.turn('peel', 'br');
          }
          updateDepth(book);
          // $('#slider').slider('value', getViewNumber(book, page));
          book.turn('center');
        },
        start: function() {
          moveBar(true);
        },
        end: function() {
          const book = $(this);
          updateDepth(book);
          setTimeout(function() {
            // $('#slider').slider('value', getViewNumber(book));
          }, 1);
          moveBar(false);
        },
        missing: function(e: Event, pages: number) {
          for (let i = 0; i < pages.length; i++) {
            addPage(pages[i], $(this), pages, url);
          }
        }
      }
    });

    // $('#slider').slider('option', 'max', numberOfViews(flipbook));

    flipbook.addClass('animated');

    // Show canvas

    $('#canvas').css({
      visibility: ''
    });

    store.commit('book/setPage', this.currentPage);
    store.commit('book/setPages', this.pages);
  }
  init(url: string) {
    // Hide canvas
    $('#canvas').css({
      visibility: 'hidden'
    });
    this.loadApp(url);
  }

  mounted() {
    this.getPdfPages(); // 初始化pdf
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/my-jobs.css';
</style>
