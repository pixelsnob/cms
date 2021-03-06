/**
 * Sound view
 * 
 */
define([
  './base',
  'lib/format',
  'template'
], function(FileView, format, template) {
  return FileView.extend({
    
    render: function() {
      var opts = _.extend(format, { sound: this.model.toJSON() });
      var $tpl = $(template.render('cms/sound', opts));
      this.$el.html($tpl);
      this.$el.attr('id', this.model.id);
      return this.$el;
    }
  });
});
