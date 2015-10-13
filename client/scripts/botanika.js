Template.botanikaBody.onRendered(function () {
  var slideout = new Slideout({
    'panel': document.getElementById('main'),
    'menu': document.getElementById('menu'),
    'padding': -300,
    'tolerance': 70
  });

  document.querySelector('.js-slideout-toggle').addEventListener('click', function() {
    slideout.toggle();
  });

  $('.menu-item-link, .menu-to-home, #main').click(function() {
    slideout.close();
  });

});
