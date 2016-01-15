// Fieldsets
var current_fs, next_fs, previous_fs;
// Fieldset properties
var left, opacity, scale;

$(".next").click(function(){
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	// Activate next step on progressbar using the index of next_fs
	$('#progressbar li').eq($('#msform fieldset').index(next_fs)).addClass('active');

	// Show the next fieldset
	next_fs.show();
	current_fs.hide();
	// Hide the current fieldset with style
	/*current_fs.animate({opacity: 0}, {
		step: function (now, mx) {
			// as the opacity of current_fs reduces to 0 - stored in "now"
			// 1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			// 2. bring next_fs from the right (50%)
			left = (now * 50) + '%';
			// 3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'transform': 'scale(' + scale + ')'});
			next_fs.css({'left': left, 'opacity': opacity});
		},
		duration: 400,
		complete: function(){
			current_fs.hide();
		}
	});*/
});

$('.previous').click(function(){
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	// de-activate current step on progressbar
	$('#progressbar li').eq($('#msform fieldset').index(current_fs)).removeClass('active');
	
	// Show the previous fs
	previous_fs.show();
	current_fs.hide();

});