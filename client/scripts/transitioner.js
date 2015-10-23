var animationDuration = 1000;

$.Velocity.RegisterEffect('transition.slideDown', {
  defaultDuration: animationDuration,
  calls: [
    [
      {
        translateY: ['0%', '-100%'],
        translateZ: 0,
        easing: "ease-in-out",
        opacity: [1, 1]
      }
    ]
  ]
});

$.Velocity.RegisterEffect('transition.slideDownOut', {
  defaultDuration: animationDuration,
  calls: [
    [
      {
        translateY: ['100%', '0%'],
        translateZ: 0,
        easing: "ease-in-out",
        opacity: [1, 1]
      }
    ]
  ]
});

$.Velocity.RegisterEffect('transition.slideUpOut', {
  defaultDuration: animationDuration,
  calls: [
    [
      {
        translateY: ['-100%', '0%'],
        translateZ: 0,
        easing: "ease-in-out",
        opacity: [1, 1]
      }
    ]
  ]
});

$.Velocity.RegisterEffect('transition.slideUp', {
  defaultDuration: animationDuration,
  calls: [
    [
      {
        translateY: ['0%', '100%'],
        translateZ: 0,
        easing: "ease-in-out",
        opacity: [1, 1]
      }
    ]
  ]
});

Transitioner.default({
  in: 'transition.slideUp',
  out: 'transition.slideUpOut'
});

Transitioner.transition({
    fromRoute: 'contacts',
    toRoute: 'main',
    velocityAnimation: {
        in: 'transition.slideDown',
        out: 'transition.slideDownOut',
    }
});
