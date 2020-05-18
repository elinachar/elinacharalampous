$(document).ready(function(){
  // NAVIGATION BAR

  // Remove transparent class in small screens and touch devices.
  if ( ($(window).width() <= 767) || is_touch_device() ) {
    $('.navigation-bar').removeClass("transparent");
  }

  // Smooth scrolling on single-page and
  // Close collapsed navigation-bar when clicking link
  var $root = $('html, body');
  $('.navigation-bar a').click(function() {

    // Smooth scrolling
    var href = $.attr(this, 'href'), offset = 80;
    if ( href != undefined && href != '#') {
      $root.animate({
        scrollTop: $(href).offset().top - offset
      }, 500, function () {
        activateLinkupdateHash(href);
      });
    }

    // Close Collapsed navigation-bar when link clicked
    if ( ($(window).width() <= 767) ) {
      $(".navigation-bar .navigation-links").slideUp("fast");
    }

    return false;
  });

  // Tooggling background of navigation-bar: transparent - non-transparent
  // ONLY MD and up screens
  function toggleTransparentNavigationBar(){
    var startY = $('.navigation-bar').height() * 2; //The point where the navbar changes in px
    if ( ($(window).scrollTop() > startY) || ($(window).width() <= 767) || is_touch_device() ) {
      $('.navigation-bar').removeClass("transparent");
    } else {
      $('.navigation-bar').addClass("transparent");
    }
  }

  if( $('.navigation-bar').length > 0 ) {
    $(window).on("scroll load resize", function(){
      toggleTransparentNavigationBar();
    });
  }

  // Toggle Button slide/hide navigation-bar links
  $(".navigation-bar .header button").click(function() {
    $(".navigation-bar .navigation-links").slideToggle();
  })
});

var hrefList = ["#services", "#about", "#portfolio", "#faq", "#contact"]
function activateLinkupdateHash(href) {
  // Update hash in url
  // Use this for not jumb or need douple click to scrool down to proper position
  if ( href == "#page-top") {
    location.hash = ''; // for older browsers, leaves a # behind
    history.pushState('', document.title, window.location.pathname); // nice and clean
    // e.preventDefault(); // no page reload
  } else {
    if (history.pushState) {
      history.pushState(null, null, href);
    } else {
      location.hash = href;
    }
  }

  // Activate link in Navigation-bar in current hash
  // Deactivate other links
  $.each( hrefList, function( index, value ){
    $("a[href$='" + value  + "']").parent().removeClass("active");
  });
  $("a[href$='" + href  + "']").parent().addClass("active");
};


$(document).bind('scroll',function(e){
  var href;
  if (window.pageYOffset == 0) {
    href = "#page-top";
  } else {
    $('.anchor').each(function(){
      if (
        $(this).offset().top < window.pageYOffset + 100
        //begins before top
        && $(this).offset().top + $(this).height() > window.pageYOffset + 10
        //but ends in visible area
        //+ 10 allows you to change hash before it hits the top border
      ) {
        href = "#" + $(this).attr('id');
      }
    });
  }
  activateLinkupdateHash(href);
});
