<template>
  <div id="canvas">
    <div id="book-zoom">
      <div class="my-book">
        <div depth="5" class="hard">
          <div class="side"></div>
        </div>
        <div depth="5" class="hard front-side">
          <div class="depth"></div>
        </div>
        <div class="own-size"></div>
        <div class="own-size even"></div>
        <div class="hard fixed back-side p111">
          <div class="depth"></div>
        </div>
        <div class="hard p112"></div>
      </div>
    </div>
    <div id="slider-bar" class="turnjs-slider">
      <div id="slider"></div>
    </div>
  </div>
</template>
<script>
import { Vue, Component } from 'vue-property-decorator';
import '@assets/js/turn.min';
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
  loadApp() {
    const flipbook = $('.my-book');
    // Check if the CSS was already loaded
    if (flipbook.width() == 0 || flipbook.height() == 0) {
      setTimeout(this.loadApp, 3000);
      return;
    }
    console.log(1, flipbook.width(), flipbook.height());
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

    $(document).keydown(function(e) {
      const previous = 37,
        next = 39;

      switch (e.keyCode) {
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
      pages: 112,
      when: {
        turning: function(e, page) {
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
        turned: function(e, page) {
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
        missing: function(e, pages) {
          for (let i = 0; i < pages.length; i++) {
            addPage(pages[i], $(this));
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
  }
  init() {
    // Hide canvas
    $('#canvas').css({
      visibility: 'hidden'
    });
    this.loadApp();
  }

  mounted() {
    this.init();
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/my-jobs.css';
</style>
