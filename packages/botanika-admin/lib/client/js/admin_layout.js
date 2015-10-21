Template.AdminLayout.created = function () {
  var self = this;

  self.minHeight = new ReactiveVar(
    $(window).height() - $('.main-header').height()
  );

  $(window).resize(function () {
    self.minHeight.set($(window).height() - $('.main-header').height());
  });

  $('body').addClass('fixed');
};

Template.AdminLayout.destroyed = function () {
  $('body').removeClass('fixed');
};

var backGroudTypeChecker = function () {
  var $typeSelect = $('.cover-type-select'),
    $photoInput = $('.cover-type-photo').parents('.form-group'),
    $videoUrlInput = $('.cover-type-video').parents('.form-group');

  $typeSelect.change(function () {
    var selectVal = $typeSelect.val();

    if (selectVal === 'true') {
      $photoInput.hide();
      $videoUrlInput.show();
    } else if (selectVal === 'false') {
      $photoInput.show();
      $videoUrlInput.hide();
    } else {
      $photoInput.hide();
      $videoUrlInput.hide();
    }
  }).change();
};

Template.AdminDashboardEdit.onRendered(backGroudTypeChecker);
Template.AdminDashboardNew.onRendered(backGroudTypeChecker);

Template.AdminLayout.helpers({
  minHeight: function () {
    return Template.instance().minHeight.get() + 'px'
  }
});

dataTableOptions = {
    "aaSorting": [],
    "bPaginate": true,
    "bLengthChange": false,
    "bFilter": true,
    "bSort": true,
    "bInfo": true,
    "bAutoWidth": false
};
