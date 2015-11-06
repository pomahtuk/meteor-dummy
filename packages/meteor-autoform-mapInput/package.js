Package.describe({
  name: 'botanika:autoform-map-input',
  summary: 'Custom mapInput input type for AutoForm',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.use('templating@1.0.0');
  api.use('blaze@2.0.0');
  api.use('aldeed:template-extension@3.4.3');
  api.use('aldeed:autoform@4.0.0 || 5.0.0');
  api.addFiles([
    'autoform-mapInput.html',
    'autoform-mapInput.js'
  ], 'client');
});
