Template.botanikaBody.onRendered(() => {
  let slideout = new Slideout({
    'panel': document.getElementById('main'),
    'menu': document.getElementById('menu'),
    'padding': -300,
    'tolerance': 70
  });

  $('.js-slideout-toggle').click(() => slideout.toggle());
  $('.menu-item-link, .menu-to-home, #main').click(() => slideout.close());

});
