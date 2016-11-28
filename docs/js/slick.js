$(document).ready(function(){
  $('.slider').slick({
    infinite: true,
    initialSlide: 2,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 7500,
    dots: true,
    arrows: false,
    speed: 1500
  });
});
