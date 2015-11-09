Meteor.startup(function () {
  let allowedTemplates = [
    'contactsSlide',
    'evolutionSlide',
    'houseSlidesItem',
    'indexSlide',
    'botanikaPage',
  ];

  Meteor.BackgroundVideoPlayers = {};

  allowedTemplates.forEach((templateName) => {
    if (Blaze.isTemplate(Template[templateName])) {
      var template=Template[templateName];
      // assign the template an onRendered callback who simply prints the view name
      template.onRendered(function() {
        let templateInstance = this;

        templateInstance.$('.swiper-slide.botanika-house-slides-slider-wrapper, .botanika-page.image-slider').each((index, item) => {
          let $item = $(item),
            itemData = $item.data() || {};

          if (itemData.url) {
            let $videoElem = $(`<div id=${itemData.url}></div>`).prependTo($item);

            $videoElem.YTPlayer({
                fitToBackground: true,
                videoId: itemData.url,
                pauseOnScroll: true,
                playerVars: {
                  modestbranding: 1,

                },
                callback: function() {
                  console.log('playerFinshed');
                  let player = $videoElem.data('ytPlayer').player;
                  player.pauseVideo();
                  Meteor.BackgroundVideoPlayers[itemData.url] = player;
                }
            });
          }
        });
      });
    }
  });

  function stopAllVideoPlayers() {
    let players = Meteor.BackgroundVideoPlayers;

    Object.keys(players).forEach((playerId) => {
      players[playerId].pauseVideo();
    });
  }

  Meteor.SwiperCallbackFunction = function (swiper) {
    let $element = $(swiper.slides[swiper.activeIndex]),
      $videoContainer = $element.find('[data-url]'),
      videoUrl = $videoContainer.data('url');

    if ($videoContainer.length > 0) {
      stopAllVideoPlayers();

      // dirty hack! should be using some smarter solution
      let playerSeekingInterval = setInterval(function() {
        let player = Meteor.BackgroundVideoPlayers[videoUrl];
        if (player) {
          clearInterval(playerSeekingInterval);
          player.playVideo();
        }
      }, 100);
    }
    
  }

});