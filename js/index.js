var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
// var anchor_offset = $('a[href="#about"]').offset().top;

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
 if ($(window).scrollTop() > $(".header").height()) {
   $('#navbar').show(400);
 } else {
   $('#navbar').hide(400);
 }
});

//AUTO CLOSES NAVBAR ON ITEM CLICK
$('.navbar-collapse a').click(function(){
    $(".navbar-collapse").collapse('hide');
});
