
$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

$(document).ready(function() {

  // NAVIGATION BAR
  // Toggle Button slide/hide navigation-bar links
  $(".navigation-bar .header button").click(function() {
    $(".navigation-bar .navigation-links").slideToggle();
  })

  // Fade in sections in scrolling
  var experiencePart1Scrolled = false, experiencePart2Scrolled = false, experiencePart3Scrolled = false,
    educationPart1Scrolled = false, educationPart2Scrolled = false, educationPart3Scrolled = false,
    skillsScrolled = false, languagesScrolled = false, hobbiesScrolled = false;
  var windowHeight = $(window).height();
  var experiencePart1Top = $(".experience").offset().top
  var experiencePart2Top = $("#experience-card-3").offset().top-30
  var experiencePart3Top = $("#experience-card-5").offset().top-30
  var educationPart1Top = $(".education").offset().top
  var educationPart2Top = $("#education-card-3").offset().top
  var educationPart3Top = $("#education-card-5").offset().top
  var skillsTop = $(".skills").offset().top;
  var languagesTop = $(".languages").offset().top;
  var hobbiesTop = $(".hobbies").offset().top;
  var offset = 50;

  // In case the EXPERIENCE container if visible in loading the page then slide
  // the first two experience cards
  if ( $(".experience").isInViewport() ) {
    $("#experience-card-1").addClass("slide-up-right");
    $("#experience-card-2").addClass("slide-up-left");
    experiencePart1Scrolled = true;
  }
  $(window).scroll(function() {
    // Toggle Scroll-Top Button
    toggleScrollTopButton()

    // Slide-in elements as scrolling
    var scroll = $(window).scrollTop();
    if ( scroll >= ( experiencePart1Top - windowHeight - offset ) && !( experiencePart1Scrolled ) ) {
      $("#experience-card-1").addClass("slide-up-right");
      $("#experience-card-2").addClass("slide-up-left");
      experiencePart1Scrolled = true;
    } else if ( scroll >= ( experiencePart2Top - windowHeight + 4*offset) && !( experiencePart2Scrolled ) ) {
      $("#experience-card-3").addClass("slide-up-right");
      $("#experience-card-4").addClass("slide-up-left");
      experiencePart2Scrolled = true;
    } else if ( scroll >= ( experiencePart3Top - windowHeight + 4*offset) && !( experiencePart3Scrolled ) ) {
      $("#experience-card-5").addClass("slide-up-right");
      $("#experience-card-6").addClass("slide-up-left");
      experiencePart3Scrolled = true;
    } else if ( scroll >= ( educationPart1Top - windowHeight - offset ) && !( educationPart1Scrolled ) ) {
        $("#education-card-1").addClass("slide-up-right");
        $("#education-card-2").addClass("slide-up-left");
        educationPart1Scrolled = true;
    } else if ( scroll >= ( educationPart2Top - windowHeight + 3*offset) && !( educationPart2Scrolled ) ) {
      $("#education-card-3").addClass("slide-up-right");
      $("#education-card-4").addClass("slide-up-left");
      educationPart2Scrolled = true;
    } else if ( scroll >= ( educationPart3Top - windowHeight + 3*offset) && !( educationPart3Scrolled ) ) {
      $("#education-card-5").addClass("slide-up-right");
      educationPart3Scrolled = true;
    } else if ( scroll >= ( skillsTop - windowHeight - offset ) && !( skillsScrolled ) ) {
      $(".skills").addClass("slide-up");
      loadBarSkills();
      skillsScrolled = true;
    } else if ( scroll >= ( languagesTop - windowHeight - offset ) && !( languagesScrolled ) ) {
      $(".languages").addClass("slide-up");
      setTimeout(loadCircleLanguages, 1100);
      languagesScrolled = true;
    } else if ( scroll >= ( hobbiesTop - windowHeight - offset ) && !( hobbiesScrolled) ) {
      $(".hobbies").addClass("slide-up");
      setTimeout(fadeHobbies, 500);
      hobbiesScrolled = true;
    }
  });

  // SCROLL-TOP BUTTON
  //Get the button:
  scrollTopBtn = $("#scroll-top-btn");

  // Show scroll-top button when scrolled 20px from top of document
  function toggleScrollTopButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollTopBtn.css("display", "block");
    } else {
      scrollTopBtn.css("display", "none");
    }
  }

  // Smooth scrolling on top of page when scroll-top button clicked
  var $root = $('html, body');
  $('.scroll-top a').click(function() {

    // Smooth scrolling
    var href = $.attr(this, 'href'), offset = 80;
    if ( href != undefined && href != '#') {
      $root.animate({
        scrollTop: $(href).offset().top
      });
    }
  })

  // PERSONAL INFO
  // Set current age
  $("#age").append( (new Date).getFullYear() - 1988 );

  // EXPERIENCE
  // Maternity icon Copyright in right click
  $("#experience-card-2 img").bind('contextmenu', function(e){
    iconCopyright(this, e)
  });

  // EXPERIENCE AND EDUCATION
  // Define height of vertical line in XS screens
  $(window).on("load resize", function() {
    if ($(window).width() <= 575) {
      var experienceHeight = $(".experience").outerHeight();
      var experienceTitleHeight = $(".experience h1").outerHeight(true);
      $(".experience .vertical-line").css("height", experienceHeight - experienceTitleHeight);

      var educationHeight = $(".education").outerHeight();
      var educationTitleHeight = $(".education h1").outerHeight(true);
      $(".education .vertical-line").css("height", educationHeight - educationTitleHeight);
    }
  })

  // SKILLS
  // Fill in Loading Bar Percent
  function loadBarSkills() {
    var percent
    $(".loading-bar.percent").each(function( index ) {
      percent = $(this).data("percent");
      $(this).css("width", percent + "%");
    })
  }

  // LANGUAGES
  // Fill in the Circle Percent
  function loadCircleLanguages() {
    $(".active-border").each(function( index ) {
      var i = 0;
      var degs = $(this).find(".language-name").data("percent");
      var activeBorder = $(this);

      setTimeout(function(){
        loopit(degs, activeBorder, i, prec);
      },1);
    });
  }

  var prec
  function loopit(degs, activeBorder, i) {
    i++;
    if (i < 0) {
        i = 0;
    }
    if (i > degs) {
        i = degs;
    }
    prec = (100*i)/360;

    if ( i <= 180 ){
      activeBorder.css('background-image','linear-gradient(' + (90+i) + 'deg, transparent 50%, var(--color-light) 50%),linear-gradient(90deg, var(--color-light) 50%, transparent 50%)');
    }
    else{
      activeBorder.css('background-image','linear-gradient(' + (i-90) + 'deg, transparent 50%, var(--color) 50%),linear-gradient(90deg, var(--color-light) 50%, transparent 50%)');
    }

    setTimeout(function(){
      loopit(degs, activeBorder, i);
    },1);
  }

  //HOBBIES
  $(".hobby img").bind('contextmenu', function(e){
    iconCopyright(this, e)
  });

  function fadeHobbies() {
    var step;
    $(".hobby").each(function( index , hobby) {
      step = (index + 1)*500;
      setTimeout(function() {
          $(hobby).addClass("slide-left");
      }, step);
    })
  }
})

// Universal Functions

// Function for smooth scrolling on top of page
// !! WITHOUT APPENDING HASH !!
function goTopFunction() {
  $('html, body').animate({
    scrollTop: 0
  });
}

// Function for checking if element is in viewport
$.fn.isInViewport = function() {
  var elementTop = $(this).offset().top;
  var elementBottom = elementTop + $(this).outerHeight();
  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop < viewportBottom;
};


// Function for showing the copyright of icons on right click
function iconCopyright(icon, e)  {
  if(e.button == 2) { // right click (2) or long tap (0) on touchscreen (for touch devices see main.scss ->   body:-webkit-touch-callout: none; )
    var creator = $(icon).data("creator");
    var href = $(icon).data("href");
    alert("Lots of thanks to " + creator + " from "  + href + " for creating and sharing the icon.");
    return false;
  }
}
