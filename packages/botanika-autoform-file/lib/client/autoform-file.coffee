AutoForm.addInputType 'fileUpload',
  template: 'afFileUpload'
  valueOut: ->
    @val()

getCollection = (context) ->
  if typeof context.atts.collection == 'string'
    FS._collections[context.atts.collection] or window[context.atts.collection]

getDocument = (context) ->
  collection = getCollection context
  id = Template.instance()?.value?.get?()
  collection?.findOne(id)

Template.afFileUpload.onCreated ->
  self = @
  @value = new ReactiveVar @data.value

  @_stopInterceptValue = false
  @_interceptValue = (ctx) =>
    unless @_stopInterceptValue
      t = Template.instance()
      if t.value.get() isnt false and t.value.get() isnt ctx.value and ctx.value?.length > 0
        t.value.set ctx.value
        @_stopInterceptValue = true

  @_insert = (file) ->
    collection = getCollection self.data

    if Meteor.userId
      file.owner = Meteor.userId()

    if typeof self.data.atts?.onBeforeInsert is 'function'
      file = (self.data.atts.onBeforeInsert file) or file

    collection.insert file, (err, fileObj) ->
      if typeof self.data.atts?.onAfterInsert is 'function'
        self.data.atts.onAfterInsert err, fileObj

      if err then return console.log err
      self.value.set fileObj._id

  @autorun ->
    _id = self.value.get()
    _id and Meteor.subscribe 'autoformFileDoc', self.data.atts.collection, _id


Template.afFileUpload.onRendered ->
  self = @
  $(self.firstNode).closest('form').on 'reset', ->
    self.value.set null

Template.afFileUpload.helpers
  className: ->
    @atts.class or ''
  label: ->
    @atts.label or 'Выбрать файл...'
  removeLabel: ->
    @atts.removeLabel or 'Удалить'
  value: ->
    doc = getDocument @
    doc?.isUploaded() and doc._id
  schemaKey: ->
    @atts['data-schema-key']
  previewTemplate: ->
    # debugger
    doc = getDocument @
    if doc?.isImage()
      'afFileUploadThumbImg'
    else
      'afFileUploadThumbIcon'
  previewTemplateData: ->
    file: getDocument @
    atts: @atts
  file: ->
    getDocument @
  removeFileBtnTemplate: ->
    @atts?.removeFileBtnTemplate or 'afFileRemoveFileBtnTemplate'
  selectFileBtnTemplate: ->
    @atts?.selectFileBtnTemplate or 'afFileSelectFileBtnTemplate'
  uploadProgressTemplate: ->
    @atts?.uploadProgressTemplate or 'afFileUploadProgress'

Template.afFileUpload.events
  'click .js-af-select-file': (e, t) ->
    t.$('.js-file').click()

  'change .js-file': (e, t) ->
    collection = getCollection t.data

    file = new FS.File e.target.files[0]
    if Meteor.userId
      file.owner = Meteor.userId()

    collection.insert file, (err, fileObj) ->
      if err then return console.log err
      t.value.set fileObj._id

  "dragover .js-af-select-file": (e) ->
    e.stopPropagation()
    e.preventDefault()

  "dragenter .js-af-select-file": (e) ->
    e.stopPropagation()
    e.preventDefault()

  "drop .js-af-select-file": (e, t) ->
    e.stopPropagation();
    e.preventDefault();
    collection = getCollection t.data

    file = new FS.File e.originalEvent.dataTransfer.files[0]
    if Meteor.userId
      file.owner = Meteor.userId()

    collection.insert file, (err, fileObj) ->
      if err then return console.log err
      t.value.set fileObj._id

  'click .js-af-remove-file': (e, t) ->
    e.preventDefault()
    t.value.set null

Template.afFileUploadThumbImg.helpers
  url: ->
    @file.url store: @atts.store

Template.afFileUploadThumbIcon.helpers
  url: ->
    @file.url store: @atts.store
  icon: ->
    switch @file.extension()
      when 'pdf'
        'file-pdf-o'
      when 'doc', 'docx'
        'file-word-o'
      when 'ppt', 'avi', 'mov', 'mp4'
        'file-powerpoint-o'
      else
        'file-o'
