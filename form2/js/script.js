var current_fs, next_fs, prev_fs;
var progressbar = $('#progressbar li');
var submit = $('#mform input[type=submit]');
var dl = $('#mform .right > dl');
var step = 0;
var max_step = 4;

$('.next').click(function () {
    current_fs = $('#mform fieldset').eq(step);
    if (step < max_step) {
        step++;
    }
    next_fs = $('#mform fieldset').eq(step);
    
    if (step === max_step) {
        $(this).hide();
        submit.show();
    }
    
    // Progressbar
    progressbar.eq(step - 1).addClass('pass');
    progressbar.eq(step).addClass('active');
    
    // Right panel with <dl>
    dl.eq(step).show();
    
	current_fs.hide();
	next_fs.show();
});

$('.prev').click(function () {
    
	current_fs = $('#mform fieldset').eq(step);
	if (step > 0) {
        dl.eq(step).hide();
        
        progressbar.eq(step).removeClass('active');
        progressbar.eq(step).removeClass('pass');
        step--;
        progressbar.eq(step).removeClass('pass');
        progressbar.eq(step).addClass('active');
    }
    prev_fs = $('#mform fieldset').eq(step);
    
    if (step < max_step) {
        $('.next').show();
        submit.hide();
    }
    
    
    
    current_fs.hide();
	prev_fs.show();
});