/*
 * Magazine sample
 */

export const loadPage = function(page, pageElement) {
  console.log('page', page);
  console.log('pageElement', pageElement);
  // Create an image element

  // var img = $('<img />');

  // img.mousedown(function(e) {
  // 	e.preventDefault();
  // });

  // img.load(function() {

  // 	// Set the size
  // 	$(this).css({width: '100%', height: '100%'});

  // 	// Add the image to the page after loaded

  // 	$(this).appendTo(pageElement);

  // 	// Remove the loader indicator

  // 	pageElement.find('.loader').remove();
  // });

  // Load the page

  // img.attr('src', 'pages/' +  page + '.jpg');
};

export const addPage = function(page, book) {
  const pages = book.turn('pages');

  // Create a new element for this page
  const element = $('<div />', {});
  // Add the page to the flipbook
  if (book.turn('addPage', element, page)) {
    // Add the initial HTML
    // It will contain a loader indicator and a gradient
    element.html('<div class="gradient"></div><div class="loader"></div>');

    // Load the page
    loadPage(page, element, pages);
  }
};

// Zoom in / Zoom out

export const zoomTo = function(event) {
  setTimeout(function() {
    if ($('.magazine-viewport').data().regionClicked) {
      $('.magazine-viewport').data().regionClicked = false;
    } else {
      if ($('.magazine-viewport').zoom('value') == 1) {
        $('.magazine-viewport').zoom('zoomIn', event);
      } else {
        $('.magazine-viewport').zoom('zoomOut');
      }
    }
  }, 1);
};

// Load large page

export const loadLargePage = function(page, pageElement) {
  const img = $('<img />');

  img.load(function() {
    const prevImg = pageElement.find('img');
    $(this).css({ width: '100%', height: '100%' });
    $(this).appendTo(pageElement);
    prevImg.remove();
  });

  // Loadnew page

  img.attr('src', 'pages/' + page + '-large.jpg');
};

// Load small page

export const loadSmallPage = function(page, pageElement) {
  const img = pageElement.find('img');

  img.css({ width: '100%', height: '100%' });

  img.unbind('load');
  // Loadnew page

  img.attr('src', 'pages/' + page + '.jpg');
};

// http://code.google.com/p/chromium/issues/detail?id=128488

export const isChrome = function() {
  return navigator.userAgent.indexOf('Chrome') != -1;
};
// Calculate the width and height of a square within another square

export const calculateBound = function(d) {
  const bound = { width: d.width, height: d.height };

  if (bound.width > d.boundWidth || bound.height > d.boundHeight) {
    const rel = bound.width / bound.height;

    if (
      d.boundWidth / rel > d.boundHeight &&
      d.boundHeight * rel <= d.boundWidth
    ) {
      bound.width = Math.round(d.boundHeight * rel);
      bound.height = d.boundHeight;
    } else {
      bound.width = d.boundWidth;
      bound.height = Math.round(d.boundWidth / rel);
    }
  }

  return bound;
};

// Set the width and height for the viewport

export const resizeViewport = function() {
  const width = $(window).width(),
    height = $(window).height(),
    options = $('.magazine').turn('options');

  $('.magazine').removeClass('animated');

  $('.magazine-viewport')
    .css({
      width: width,
      height: height
    })
    .zoom('resize');

  if ($('.magazine').turn('zoom') == 1) {
    const bound = calculateBound({
      width: options.width,
      height: options.height,
      boundWidth: Math.min(options.width, width),
      boundHeight: Math.min(options.height, height)
    });

    if (bound.width % 2 !== 0) bound.width -= 1;

    if (
      bound.width != $('.magazine').width() ||
      bound.height != $('.magazine').height()
    ) {
      $('.magazine').turn('size', bound.width, bound.height);

      if ($('.magazine').turn('page') == 1) $('.magazine').turn('peel', 'br');

      $('.next-button').css({
        height: bound.height,
        backgroundPosition: '-38px ' + (bound.height / 2 - 32 / 2) + 'px'
      });
      $('.previous-button').css({
        height: bound.height,
        backgroundPosition: '-4px ' + (bound.height / 2 - 32 / 2) + 'px'
      });
    }

    $('.magazine').css({ top: -bound.height / 2, left: -bound.width / 2 });
  }

  $('.magazine').addClass('animated');
};

// Number of views in a flipbook

export const numberOfViews = function(book) {
  return book.turn('pages') / 2 + 1;
};

// Current view in a flipbook

export const getViewNumber = function(book, page) {
  return parseInt((page || book.turn('page')) / 2 + 1, 10);
};

export const moveBar = function(yes) {
  if (Modernizr && Modernizr.csstransforms) {
    $('#slider .ui-slider-handle').css({ zIndex: yes ? -1 : 10000 });
  }
};

// Width of the flipbook when zoomed in

export const largeMagazineWidth = function() {
  // return 2214;
  return (document.body || document.documentElement).clientWidth;
};
