let animationInDuration = 1000,
  animationOutDuration = 1600;

Transitioner.default({
  in: ['fadeIn', {duration: animationInDuration, display: 'flex'}],
  out: ['fadeOut', {duration: animationInDuration }]
});
