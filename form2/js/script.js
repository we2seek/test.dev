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
    
	// current_fs.hide();
	next_fs.show();
    current_fs.animate({opacity: 0}, {
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
        duration: 800,
        complete: function(){
            current_fs.hide();
        },
        easing: 'easeInOutBack'
        
    });

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