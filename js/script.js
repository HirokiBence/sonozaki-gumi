$(function () {

  //変数の設定
  var $body = $('body');

  //スクロール量を保存
  var scrollTop;

  //スクロール固定
  function bodyFixedOn() {
    scrollTop = $(window).scrollTop();

    $body.css({
      position: 'fixed',
      top: -scrollTop,
      width: '100%',
    }).addClass('fix');

  }

  //スクロール解除
  function bodyFixedOff() {
    $body.css({
      position: '',
      top: '',
      width: ''
    }).removeClass('fix');

    $(window).scrollTop(scrollTop);
  }
  //スムーススクロール(if文はスクロール固定時の条件分岐)
  $('a[href*="#"]:not([href="#"])').click(function () {
    if ($('body').hasClass('fix')) {
      var target = $($(this).attr('href')).offset().top;
      var fixtarget = target + scrollTop - 90;
      var test = scrollTop;
      $('html,body').animate({ scrollTop: test }, 1);
      $('html,body').animate({ scrollTop: fixtarget }, 800);
    } else {
      var target = $($(this).attr('href')).offset().top;
      target -= 90;
      $('html, body').animate({ scrollTop: target }, 800);
    }
    return false;
  });

  // ヘッダー色の反転
  $(window).scroll(function () {
    if ($(window).scrollTop() > $('.first-view').height() - 300 || $('body').hasClass('fix')) {
      $('header').addClass('inversion');
      var hh = $('.header').css('height');
      $('body').css('margin-top', hh);
    } else {
      $('header').removeClass('inversion');
      $('body').css('margin-top', '0');
    }
  });

  // ハンバーガーメニュー開閉
  $('.hamburger').click(function () {
    if ($('header').hasClass('open')) {
      $('header').removeClass('open');
      $('.mobile-menu').stop().slideUp(400);
      bodyFixedOff();
    } else {
      $('header').addClass('open');
      $('.mobile-menu').stop().slideDown(400);
      bodyFixedOn();
    }
  });

  // ハンバーガーメニューを閉じる
  $('.mobile-menu a').click(function () {
    $('header').removeClass("open");
    $('.mobile-menu').stop().slideUp(400);
    bodyFixedOff();
  });

  //リサイズ時のハンバーガーメニュー非表示
  $(window).resize(function () {
    if ($(window).width() > 767.9) {
      $('.header').removeClass('open')
      $('.mobile-menu').hide();
      // bodyFixedOff();
    };
  });

  //ローディングアニメーション
  $('body').hide();
  $(document).ready(function () {
    $('body').fadeIn(1500);
  });
});
