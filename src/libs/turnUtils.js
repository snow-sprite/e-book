/* Steve jobs' book */
export const moveBar = function(yes) {
  if (Modernizr && Modernizr.csstransforms) {
    $('#slider .ui-slider-handle').css({ zIndex: yes ? -1 : 10000 });
  }
};
function zoomOut() {
  const transitionEnd = $.cssTransitionEnd(),
    completeTransition = function() {
      $('#book-zoom').unbind(transitionEnd);
      $('.my-book').turn('disable', false);
      $('body').css({ overflow: 'auto' });
      moveBar(false);
    };
  $('.my-book').data().zoomIn = false;
  $(window).unbind('resize', zoomOut);
  moveBar(true);
  $('.zoom-pic').remove();
  $('#book-zoom').transform('scale(1, 1)');
  $('.samples .bar').css({ visibility: 'visible' });
  $('#slider-bar').show();

  if (transitionEnd) $('#book-zoom').bind(transitionEnd, completeTransition);
  else setTimeout(completeTransition, 1000);
}

function loadPage(page, pages, url) {
  $.get({ url }).done(function(pageHtml) {
    // $('.my-book .p' + page).append(`<pdf :src="${url}" :page="${page}" @num-pages="${pages}"></pdf>`);
    $('.my-book .p' + page).html(`url: ${url}, page: ${page}, pages: ${pages}`);
  });
}

function zoomThis(pic) {
  const tmpContainer = $('<div />', { class: 'zoom-pic' }),
    tmpPic = $('<img />'),
    zCenterX = $('#book-zoom').width() / 2,
    zCenterY = $('#book-zoom').height() / 2,
    bookPos = $('#book-zoom').offset(),
    transitionEnd = $.cssTransitionEnd(),
    picPos = {
      left: pic.offset().left - bookPos.left,
      top: pic.offset().top - bookPos.top
    };
  let position, translate;
  const completeTransition = function() {
    $('#book-zoom').unbind(transitionEnd);
    if ($('.my-book').data().zoomIn) {
      tmpContainer.appendTo($('body'));
      $('body').css({ overflow: 'hidden' });
      tmpPic
        .css({
          margin: position.top + 'px ' + position.left + 'px'
        })
        .appendTo(tmpContainer)
        .fadeOut(0)
        .fadeIn(500);
    }
  };
  $('.my-book').data().zoomIn = true;
  $('.my-book').turn('disable', true);
  $(window).resize(zoomOut);
  tmpContainer.click(zoomOut);
  tmpPic.load(function() {
    const realWidth = $(this)[0].width,
      realHeight = $(this)[0].height,
      zoomFactor = realWidth / pic.width(),
      picPosition = {
        top: (picPos.top - zCenterY) * zoomFactor + zCenterY + bookPos.top,
        left: (picPos.left - zCenterX) * zoomFactor + zCenterX + bookPos.left
      };
    position = {
      top: ($(window).height() - realHeight) / 2,
      left: ($(window).width() - realWidth) / 2
    };
    translate = {
      top: position.top - picPosition.top,
      left: position.left - picPosition.left
    };
    $('.samples .bar').css({ visibility: 'hidden' });
    $('#slider-bar').hide();
    $('#book-zoom').transform(
      'translate(' +
        translate.left +
        'px, ' +
        translate.top +
        'px)' +
        'scale(' +
        zoomFactor +
        ', ' +
        zoomFactor +
        ')'
    );
    if (transitionEnd) $('#book-zoom').bind(transitionEnd, completeTransition);
    else setTimeout(completeTransition, 1000);
  });
  tmpPic.attr('src', pic.attr('src'));
}

export const updateDepth = function(book, newPage) {
  const page = book.turn('page'),
    pages = book.turn('pages');
  let depthWidth = 16 * Math.min(1, (page * 2) / pages);
  newPage = newPage || page;
  if (newPage > 3)
    $('.my-book .p2 .depth').css({
      width: depthWidth,
      left: 20 - depthWidth
    });
  else $('.my-book .p2 .depth').css({ width: 0 });
  depthWidth = 16 * Math.min(1, ((pages - page) * 2) / pages);
  if (newPage < pages - 3)
    $('.my-book .p111 .depth').css({
      width: depthWidth,
      right: 20 - depthWidth
    });
  else $('.my-book .p111 .depth').css({ width: 0 });
};

export const addPage = function(page, book, pages, url) {
  // let id,
  //   pages = book.turn('pages');
  if (!book.turn('hasPage', page)) {
    const element = $('<div />', {
      class: 'own-size',
      // css: { width: 460, height: 582 }
      css: { width: 480, height: 600 }
    }).html('<div class="loader"></div>');
    if (book.turn('addPage', element, page)) {
      loadPage(page, pages, url);
    }
  }
};

export const numberOfViews = function(book) {
  return book.turn('pages') / 2 + 1;
};

export const getViewNumber = function(book, page) {
  return parseInt((page || book.turn('page')) / 2 + 1, 10);
};

export const zoomHandle = function(e) {
  if ($('.my-book').data().zoomIn) zoomOut();
  else if (e.target && $(e.target).hasClass('zoom-this')) {
    zoomThis($(e.target));
  }
};

// export const setPreview = function(view) {
//   const previewWidth = 115,
//     previewHeight = 73,
//     previewSrc = 'pages/preview.jpg',
//     preview = $(_thumbPreview.children(':first')),
//     numPages =
//       view == 1 || view == $('#slider').slider('option', 'max') ? 1 : 2,
//     width = numPages == 1 ? previewWidth / 2 : previewWidth;

//   _thumbPreview.addClass('no-transition').css({
//     width: width + 15,
//     height: previewHeight + 15,
//     top: -previewHeight - 30,
//     left: ($($('#slider').children(':first')).width() - width - 15) / 2
//   });

//   preview.css({
//     width: width,
//     height: previewHeight
//   });

//   if (
//     preview.css('background-image') === '' ||
//     preview.css('background-image') == 'none'
//   ) {
//     preview.css({ backgroundImage: 'url(' + previewSrc + ')' });

//     setTimeout(function() {
//       _thumbPreview.removeClass('no-transition');
//     }, 0);
//   }

//   preview.css({
//     backgroundPosition: '0px -' + (view - 1) * previewHeight + 'px'
//   });
// };

export const isChrome = function() {
  // Chrome's unsolved bug
  // http://code.google.com/p/chromium/issues/detail?id=128488
  return navigator.userAgent.indexOf('Chrome') != -1;
};
