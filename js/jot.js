/*
Jot by Kevin Thornbloom is licensed under a Creative Commons Attribution-ShareAlike 4.0 International License.
*/

(function($) {
	$.fn.extend({
		joteditor: function(options) {
			// These are overridden by options declared in footer
			var defaults = {
				effectDuration: 5000
			}

			var options = $.extend(defaults, options),
				that = this,
				uniqueId = $(this).attr('id')
			
			$('.jot').each(function(){
				$(this).wrap('<div class="jot-wrap"></div>');
				$(this).parent().prepend('<div class="jot-menu">menu</div>');
			});
		}
	});
})(jQuery);