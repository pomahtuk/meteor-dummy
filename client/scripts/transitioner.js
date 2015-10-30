let animationInDuration = 1000;
let animationOutDuration = 1600;

$.Velocity.RegisterEffect('transition.slideDown', {
  defaultDuration: animationInDuration,
  calls: [[ {translateY: ['0%', '-100%'], translateZ: 0, easing: 'easeOutCubic', opacity: [1, 1]} ]]
});

$.Velocity.RegisterEffect('transition.slideDownOut', {
  defaultDuration: animationOutDuration,
  calls: [[ {translateY: ['100%', '0%'], translateZ: 0, easing: 'linear', opacity: [1, 1]} ]]
});

$.Velocity.RegisterEffect('transition.slideUpOut', {
  defaultDuration: animationOutDuration,
  calls: [[ {translateY: ['-100%', '0%'], translateZ: 0, easing: 'linear', opacity: [1, 1]} ]]
});

$.Velocity.RegisterEffect('transition.slideUp', {
  defaultDuration: animationInDuration,
  calls: [[ {translateY: ['0%', '100%'], translateZ: 0, easing: 'easeOutCubic', opacity: [1, 1]} ]]
});

Transitioner.default({
  in: ['fadeIn', {duration: animationInDuration, display: 'flex'}],
  out: ['fadeOut', {duration: animationInDuration }]
});
// 
// function registerDownTransition(params) {
//   Transitioner.transition({
//     fromRoute: params.fromRoute,
//     toRoute: params.toRoute,
//     velocityAnimation: {in: 'transition.slideDown', out: 'transition.slideDownOut'}
//   });
// }
//
// function registerUpTransition(params) {
//   Transitioner.transition({
//     fromRoute: params.fromRoute,
//     toRoute: params.toRoute,
//     velocityAnimation: {in: 'transition.slideUp', out: 'transition.slideUpOut'}
//   });
// }
//
// // rougth representation of menu structure
// var routesArray = ['main', 'houses', 'infrastructure', 'evolution', 'lab', 'contacts']
//
// routesArray.forEach((route, index) => {
//   // starting from next one
//   let routesLeftover = routesArray.slice(index);
//   if (routesLeftover.length > 0) {
//     // we are not at the last route
//     routesLeftover.forEach((nextRoute) => {
//       registerUpTransition({fromRoute: route, toRoute: nextRoute});
//       registerDownTransition({fromRoute: nextRoute, toRoute: route})
//     });
//   }
// });
