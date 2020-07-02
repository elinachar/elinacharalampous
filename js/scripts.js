$(document).ready(function(){
  // NAVIGATION BAR

  // Remove transparent class in small screens and touch devices.
  if ( ($(window).width() <= 767) || is_touch_device() ) {
    $('.navigation-bar').removeClass("transparent");
  }

  // Smooth scrolling on single-page and
  var $root = $('html, body');
  $('.navigation-bar a').click(function(e) {
    // Smooth scrolling
    var hash = $.attr(this, 'href'), offset = 80;
    if ( hash != undefined && hash != '#') {
      isRunningAnimation = true;
      $root.animate({
        scrollTop: $(hash).offset().top - offset
      }, 500, function () {
        activateLinkupdateHash(hash, "navClick", e);
        isRunningAnimation = false;
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

  // INDEX SECTION

  // Typewriter effect
  // Function for tooggling only one event with vendor prefix when animation is
  // finished
  function whichAnimationEvent(){
    var t,
        el = document.createElement("fakeelement");

    var animations = {
      "animation"      : "animationend",
      "OAnimation"     : "oAnimationEnd",
      "MozAnimation"   : "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations){
      if (el.style[t] !== undefined){
        return animations[t];
      }
    }
  };

  // Infinte typeWriter function and looping in job descriptions
  function typeWriter() {
    if (k < typewriterText[j].length) {
      if (k == 0) {
        $("#typewriter").text(typewriterText[j].charAt(k));
      } else {
        $("#typewriter").append(typewriterText[j].charAt(k));
      }
      k++;
      setTimeout(typeWriter, 100, j);
    } else {
      j++;
      if (j == 3) {
        j = 0;
      }
      k = 0;

      setTimeout(typeWriter, 900);
    }
  }

  // Call infine typeWriter animation
  var typewriterText = ["Web Developer", "Software Developer", "Data Analyst"];
  var k = 0, j = 0;
  typeWriter(j);

  // SERVICES SECTION
  // Show sections in scrolling

  var scroll;
  var serviceItemTop = $("#services").offset().top;
  var windowHeight = $(window).height();
  var offset = -50;
  var servicesVisible = false;

  // Show service-item card in scrolling
  $(window).scroll(function() {
    scroll = $(window).scrollTop();
    showServiceItems(scroll, "scroll");
  });

  // Show services-items in case page is loaded in lower position
  showServiceItems($(window).scrollTop(), "load");

  function showServiceItems(scroll, source) {
    if ( ( (scroll == 0 && $(window).width() <= 575) ||
           (scroll >= (serviceItemTop - windowHeight - offset) && scroll < serviceItemTop + offset)
          ) && !(servicesVisible)
        ){
      var time = 0;
      $(".service-item").each(function( index, serviceItem ) {
        setTimeout(function() {
          $(serviceItem).addClass("appear-in");
        }, time)
        time += 1000;
      })
      servicesVisible = true;
    } else if ( (scroll > serviceItemTop + offset)
              && !(servicesVisible)
            ){
      $(".service-item").each(function( index, serviceItem ) {
        $(serviceItem).css("visibility", "visible");
      })
      servicesVisible = true;
    }
  };

  // PORFOLIO SECTION

  // Hover Portfolio cards in non touch screens
  $(".container-portfolio .flip").hover(function(){
    $(".project-text.on-hover", this).fadeIn(250);
  },
    function(){
      $(".project-text.on-hover", this).fadeOut(250);
  });

  // Flip Portfolio cards in touch screens
  $(".container-portfolio .flip").on("click", function() {
    if ( is_touch_device() ) {
      $(this).find(".front a").removeAttr('hash');
      $(this).find(".card").toggleClass("flipped");
    }
  });

  // Disable flipping when clicking on link to website on the back side of
  // flipped card
  $(".container-portfolio .flip .back a").click(function(e) {
    event.stopImmediatePropagation();
  })

  // ABOUT SECTION

  // Tooltips
  $(function () {
   $('[data-toggle="tooltip"]').tooltip();
  });

  //Function for blinking the skills
  function blinkSkills(){
    var skills = $(".skill-topic i");
    var previousSkillIcon = skills.last();
    var time = 0;

    $(".skill-topic i").each(function( index, skillIcon ) {
      setTimeout(function() {
        $(previousSkillIcon).removeClass("blink");
        $(skillIcon).toggleClass("blink");
        previousSkillIcon = skillIcon;
      }, time)
      time += 1000;
    });
    setTimeout(blinkSkills, 8000);
  }

  // Call the infinite blinkSkills function
  blinkSkills();

  // CV Button
  // Hover effect on non-touch screen devices
  $(".button-CV").hover(function() {
    if ( !(is_touch_device()) ) {
      $(this).toggleClass("rotated");
    }
  })

  // Tow taps in touch screen devices:
  // First tap rotation, second tap link
  $(".button-CV").click(function(){
    if ( is_touch_device() ) {
      if (!($(this).hasClass("rotated")) ) {
        $(this).toggleClass("rotated");
        return false;
      }
    }
  })

  // FAQ SECTION

  // Flip card
  $(".container-faq .flip").on("click", function(){
    $(this).find(".card").toggleClass("flipped");
    return false;
  })

  // Style each card with height of back side for col-12
  $(window).on("load resize", function(){
    if ($(window).width() <= 767) {
      var backHeight;
      $(".container-faq .flip").each(function( index ) {
        backHeight = ($(this).find(".back table")).outerHeight();
        $(this).height(backHeight);
      })
    }
  })

  // CONTACT SECTION
  // Change background color when focusing on form elements
  $(".container-contact input, .container-contact textarea").focus(function(){
    $(this).css("background-color", "#cccccc");
  });

  $(".container-contact input, .container-contact textarea").blur(function(){
    $(this).css("background-color", "#ffffff");
  });

  // Clicking submit button of contact form
  // check required fields: name, e-mail and text message and turn to red border if not filled
  // if all required fields are filled, hide all contact-form element after submiting and return thank you msg
  $("#form-submit-button").on("click", function(){
    var nameEntry, emailEntry, textMessageEntry;
    var bNameEntry = true, bPhoneEntry = true, bEmailEntry = true, bTextMessageEntry = true;
    // Check if name has a valid entry
    nameEntry = $("#form-name").val();
    if (nameEntry.length== 0) {
      $("#form-name").css("border", "2px solid #ffae19");
      $(".name-field").addClass("error");
      bNameEntry = false;
    } else {
      $("#form-name").css("border", "1px solid #ccc");
      $(".name-field").removeClass("error");
    };

    // Check if email has a valid entry
    emailEntry = $("#form-email").val();
    var emailPattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    if ( !(emailPattern.test(emailEntry)) ) {
      $("#form-email").css("border", "2px solid #ffae19");
      $(".email-field").addClass("error");
      bEmailEntry = false;
      if ( emailEntry.length == 0 ) {
        $(".email-field .error-field").html("This field is required");
      } else {
        $(".email-field .error-field").html("The email is invalid");
      }
    } else {
      $("#form-email").css("border", "1px solid #ccc");
      $(".email-field").removeClass("error");
    };

    // Check if number has proper format
    phoneEntry = $("#form-phone").val();
    if (!(/^[0-9\-\+\*\#\,\;\s\(\)]*$/.test(phoneEntry))) {
      $("#form-phone").css("border", "2px solid #ffae19");
      $(".phone-field").addClass("error");
      bEmailEntry = false;
    } else {
      $("#form-phone").css("border", "1px solid #ccc");
      $(".phone-field").removeClass("error");
    }

    // Check if text message has a valid entry
    textMessageEntry = $(".message-box").val();
    if (textMessageEntry.length == 0) {
      $(".message-box").css("border", "2px solid #ffae19");
      $(".message-field").addClass("error");
      bTextMessageEntry = false;
    } else {
      $(".message-box").css("border", "1px solid #ccc");
      $(".message-field").removeClass("error");
    };

    // If all required fields are filled then submit the form and show thanks message
    if (bNameEntry == true && bPhoneEntry == true && bEmailEntry == true && bTextMessageEntry == true) {
      $("form").removeClass("error-mode");
      $("#visible-comment").show();
      $(".hidden-after-submit").hide();
    } else {
      $("form").addClass("error-mode");
    };
    return false;
  });

  // Drop Marker
  var googleMap = $("#map");
  var googleMapTop = googleMap.offset().top;
  var windowHeight = $(window).height();
  var dropped = false;

  // Drop Google Map Marker when map comes to view
  $(window).on("scroll", function(){
    scroll = $(window).scrollTop();
    // Fire drop marker when Google Map is scrolled in plus 80px
    if (!(dropped) && (scroll >= ( googleMapTop - windowHeight + 80 ))) {
      toggleDrop();
      dropped = true;
    }
  });

  // Copyright current year
  $(".copyright span").append( (new Date).getFullYear() );
});

var hashList = ["#services", "#about", "#portfolio", "#faq", "#contact"]
var count = 0;
function activateLinkupdateHash(hash, source) {
  // Update hash in url
  // Use this for not jumb or need double click to scroll down to proper position
  if ( hash == "#page-top") {
    location.hash = ''; // for older browsers, leaves a # behind
    history.pushState('', document.title, window.location.pathname); // nice and clean
    // e.preventDefault(); // no page reload
  } else {
    if (history.pushState) {
      history.pushState(null, null, hash);
    } else {
      location.hash = hash;
    }
  }

  // Activate link in Navigation-bar in current hash
  // Deactivate other links
  $.each( hashList, function( index, value ){
    $("a[hash$='" + value  + "']").parent().removeClass("active");
  });
  $("a[hash$='" + hash  + "']").parent().addClass("active");
};

var isRunningAnimation = false;
var currentHash;
$(document).bind('scroll',function(e){
  var hash;
  currentHash = window.location.hash
  if (window.pageYOffset == 0) {
    hash = "#page-top";
  } else {
    $('.anchor').each(function(){
      if (
        $(this).offset().top < window.pageYOffset + 100
        //begins before top
        && $(this).offset().top + $(this).height() > window.pageYOffset + 10
        //but ends in visible area
        //+ 10 allows you to change hash before it hits the top border
      ) {
        hash = "#" + $(this).attr('id');
      }
    });
  }
  // Change hash only if hash changed or when nav link is clicked, not while scrolling
  // For smooth scrolling history.pushState is needed and should call it only when
  // hash is really changed because in Safari there is a limitation of
  // 100 history.pushState changes per 30sec.
  if ( (currentHash != hash) && !(isRunningAnimation) ) {
    activateLinkupdateHash(hash, "scroll", e);
  }
});

// API Google Map
var marker;

function initMap() {
  var pos = {lat: 35.331818, lng: 25.139076};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: pos
  });

  marker = new google.maps.Marker({
    position: pos,
    icon: "img/marker.png",
    map: map,
  });
  marker.addListener('click', toggleDrop);
};

function toggleDrop() {
  marker.setAnimation(google.maps.Animation.DROP);
};

// Check touch device
function is_touch_device() {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
}

// After document is loaded add alt for google maps
$(window).load(function(){
  // After Google maps have been loaded
  // Add alt tags to all of it images for SEO needs.
  altImgMap();
  function altImgMap() {
    if (typeof google === 'object' && typeof google.maps === 'object') {
      // Get all the images in the google map
      var googleMapImages = $("#map img");
      // Check which images do not have alt attribute and add an empty one
      googleMapImages.each(function( index, value ) {
        if (typeof $(value).attr("alt")== typeof undefined || $(value).attr("alt") == false) {
          $(value).attr("alt" , "Google Maps");
        }
      })
    }
  };
});
