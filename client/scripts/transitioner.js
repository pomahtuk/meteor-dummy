var animationInDuration = 1000;
var animationOutDuration = 1600;

$.Velocity.RegisterEffect('transition.slideDown', {
  defaultDuration: animationInDuration,
  calls: [
    [
      {
        translateY: ['0%', '-100%'],
        translateZ: 0,
        easing: "easeOutCubic",
        opacity: [1, 1]
      }
    ]
  ]
});

$.Velocity.RegisterEffect('transition.slideDownOut', {
  defaultDuration: animationOutDuration,
  calls: [
    [
      {
        translateY: ['100%', '0%'],
        translateZ: 0,
        easing: "linear",
        opacity: [1, 1]
      }
    ]
  ]
});

$.Velocity.RegisterEffect('transition.slideUpOut', {
  defaultDuration: animationOutDuration,
  calls: [
    [
      {
        translateY: ['-100%', '0%'],
        translateZ: 0,
        easing: "linear",
        opacity: [1, 1]
      }
    ]
  ]
});

$.Velocity.RegisterEffect('transition.slideUp', {
  defaultDuration: animationInDuration,
  calls: [
    [
      {
        translateY: ['0%', '100%'],
        translateZ: 0,
        easing: "easeOutCubic",
        opacity: [1, 1]
      }
    ]
  ]
});

Transitioner.default({
  in: 'transition.slideUp',
  out: 'transition.slideUpOut'
});

// TODO: find a way to specify default transition not touching initial state

Transitioner.transition({
    fromRoute: 'main',
    toRoute: 'contacts',
    velocityAnimation: {
        in: 'transition.slideUp',
        out: 'transition.slideUpOut',
    }
});

Transitioner.transition({
    fromRoute: 'contacts',
    toRoute: 'main',
    velocityAnimation: {
        in: 'transition.slideDown',
        out: 'transition.slideDownOut',
    }
});
