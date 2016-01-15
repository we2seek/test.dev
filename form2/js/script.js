var current_fs, next_fs, prev_fs;
$('.next').click(function(){
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	$('#progressbar li').eq($('#multiform fieldset').index(next_fs)).addClass('active');
	current_fs.hide();
	next_fs.show();
});

$('.prev').click(function(){
	current_fs = $(this).parent();
	prev_fs = $(this).parent().prev();
	current_fs.hide();
	prev_fs.show();
});