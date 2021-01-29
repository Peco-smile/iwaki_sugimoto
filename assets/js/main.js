/**
 * Template Name: Amoeba - v2.2.0
 * Template URL: https://bootstrapmade.com/free-one-page-bootstrap-template-amoeba/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
!(function ($) {
  'use strict'

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 21
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash)
      if (target.length) {
        e.preventDefault()

        var scrollto = target.offset().top - scrolltoOffset

        if ($(this).attr('href') == '#header') {
          scrollto = 0
        }

        $('html, body').animate(
          {
            scrollTop: scrollto,
          },
          1500,
          'easeInOutExpo'
        )

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active')
          $(this).closest('li').addClass('active')
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active')
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close')
          $('.mobile-nav-overly').fadeOut()
        }
        return false
      }
    }
  })

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset
        $('html, body').animate(
          {
            scrollTop: scrollto,
          },
          1500,
          'easeInOutExpo'
        )
      }
    }
  })

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow')
    } else {
      $('.back-to-top').fadeOut('slow')
    }
  })

  $('.back-to-top').click(function () {
    $('html, body').animate(
      {
        scrollTop: 0,
      },
      1500,
      'easeInOutExpo'
    )
    return false
  })

  // Portfolio details carousel
  $('.carousel').owlCarousel({
    autoplay: true,
    autoplayTimeout: 6000,
    dots: true,
    loop: true,
    items: 1,
    animateOut: 'fadeOut',
  })

  // info button rollover
  $('.rollover').easyRollover({
    transition: 'fade',
    duration: 200,
    easing: 'swing',
  })

  // FAB
  var scrollStart = $('.worry').offset().top //ページ上部からの距離を取得
  var scrollEnd = $('.contact').offset().top //ページ上部からの距離を取得
  var distance = 0

  $(document).scroll(function () {
    distance = $(this).scrollTop() //スクロールした距離を取得

    if (scrollStart <= distance) {
      //スクロール距離が『.top』の位置を超えたら
      $('.fab').addClass('fixed') //class『fixed』を追加
    } else if (scrollStart >= distance) {
      //スクロールがページ上部まで戻ったら
      $('.fab').removeClass('fixed') //class『fixed』を削除
    }

    if (scrollEnd <= distance) {
      //スクロール距離が『.overview』の位置を超えたら
      $('.fab').addClass('none') //class『none』を追加
    } else {
      $('.fab').removeClass('none') //『.overview』より上部に戻ったらclass『none』を削除
    }
  })
})(jQuery)
