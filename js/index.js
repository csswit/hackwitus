var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
// var anchor_offset = $('a[href="#about"]').offset().top;

if ($(window).width() > 768) {
  console.log('a')
  new WOW().init()
}
// new WOW().init()
//MODIFIES IMAGE SLIDE SHOW
$("#my-slider").sliderPro({
  width: "100%",
  height: $(".header").height(),
  arrows: false,
  buttons: false,
  waitForLayers: true,
  fade: true,
  autoplay: true,
  autoScaleLayers: false,
  autoplayDelay: 10000
});


// WHEN READY CUE SLIDESHOW AND PARRALAX
jQuery(document).ready(function($) {
  $("#my-slider").sliderPro();

  $(window).stellar();
});

//OPENS THE MODAL TO DISPLAY SNAPCODE
snapchat.onclick = function() {
  modal.style.display = "block";
};

//CLOSES THE MODAL TO HIDE SNAPCODE
span.onclick = function() {
  modal.style.display = "none";
};

//IF MODAL OPEN && USER CLICKS OUT OF MODAL AREA. CLOSE MODAL
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// AUTO HIDES/SHOWS NAVBAR
$(window).on('scroll', function() {
 if ($(window).scrollTop() > $(".header").height() - 150 ) {
   $('#navbar').show(400);
 } else {
   $('#navbar').hide(400);
 }
});

//Smooth scrolling
// Select all links with hashes
$('a[href*=#]:not([href=#]):not([href=#collapse1]):not([href=#collapse2]):not([href=#collapse3]):not([href=#collapse4]):not([href=#collapse5]):not([href=#collapse6]):not([href=#collapse7]):not([href=#collapse8])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
        || location.hostname == this.hostname) {

        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top - 80
            }, 500);
            return false;
        }
    }
});

//AUTO CLOSES NAVBAR ON ITEM CLICK
$('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
});
