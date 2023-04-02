$(document).ready(function(){

  //слайдер
  const slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    nav: false,
  });

  document.querySelector('.slick-prev').onclick = function () {
    slider.goTo('prev');
  };

  document.querySelector('.slick-next').onclick = function () {
    slider.goTo('next');
  };


  //табы
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });


  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog__item__content').eq(i).toggleClass('catalog__item__content_active');
        $('.catalog__item__list').eq(i).toggleClass('catalog__item__list_active');
      })
    })
  }
  toggleSlide('.catalog__link');
  toggleSlide('.catalog__item__back');


  //модальные окна
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn();
  })

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  })

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn();
    })
  })

  
//Валидация форм

  function validateForms(form){
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: "Пожалуйста, введите свое имя",
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свой email",
          email: "Неправильно введен email"
        }
      }
    });
  }

  validateForms('#consultation form');
  validateForms('#order form');
  validateForms('#consultation-form');

//маска номера ввода

  $('input[name=phone]').mask("+375(99) 999-99-99");

//отправка писем

  $('form').submit(function(e) {
    e.preventDefault();
    if(!$(this).valid()) {
      return;
    }
    s.ajax( {
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return false;
  });

  //кнопка вверх

  $(window).scroll(function() {
    if($(this).scrollTop() > 1000) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

//плаваная прокрутка

  $("a[href^='#']").click(function() {
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  //анимация

  new WOW().init();

});