/**
 * Bootstrap modal view
 * 
 */
define([
  '../base',
  'template',
  'bootstrap'
], function(BaseView, template) {
  return BaseView.extend({
    
    events: {
      'click .save':    'save',
      'click .cancel':  'cancel'
    },
    
    initialize: function() {
      this.setElement(template.render('cms/modal'));
      this.$el.on('shown.bs.modal', _.bind(this.trigger, this, 'open'));
      this.$el.on('hidden.bs.modal', _.bind(this.trigger, this, 'close'));
    },
    
    modal: function(opts) {
      this.$el.find('.modal-body').html(opts.body);
      if (opts.save_label) {
        this.$el.find('button.save').text(opts.save_label);
      }
      this.$el.modal({ backdrop: 'static', keyboard: true });
      if (opts.hide_cancel_button) {
        this.$el.find('button.cancel').hide();
      }
    },
    
    save: function() {
      this.trigger('save');
      return false;
    },
    
    hide: function() {
      this.$el.modal('hide');
    },

    cancel: function(ev) {
      this.$el.modal('hide');
      this.trigger('cancel');
      return false;
    }
  });
});
