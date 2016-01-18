var current_fs, next_fs, prev_fs;
var progressbar = $('#progressbar li');
var submit = $('#mform input[type=submit]');
var dl = $('#mform .right > dl');
var contentDiv = $('#mform div.content');
var step = 0;
var max_step = 4;
var left, opacity, scale;
var animDuration = 'slow';
jQuery.easing.def = 'easeInOutBack';



$(document).ready(function () {
    $('.prev').prop('disabled', true);
    
    $('input[type="submit"]').onclick();
});

function showNext() {
    current_fs = $('#mform fieldset').eq(step);
    if (step < max_step) {
        step++;
    }
    next_fs = $('#mform fieldset').eq(step);
    
    // Progressbar
    progressbar.eq(step - 1).addClass('pass');
    progressbar.eq(step).addClass('active');
    
    // Right panel with <dl>
    dl.eq(step).show();
    
/*
    contentDiv.css('overflow', 'hidden');
    current_fs.animate({'left': '350'}, {
        duration:'slow',
        // easing: 'easeOutElastic',
        complete: function () {
            contentDiv.css('overflow', 'auto');
            current_fs.css('left', '0');
            current_fs.hide();
            next_fs.show();
        }
    });
    */
    
    next_fs.show();
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            scale = 1 - (1 - now) * 0.2;
            left = (now * 50) + '%';
            opacity = 1 - now;
            current_fs.css({'transform': 'scale(' + scale + ')'});
            next_fs.css({'left': left, 'opacity': opacity});
        },
        duration: animDuration,
        complete: function() {
            current_fs.css('left', '0');
            current_fs.hide();
        }        
    });
    
    
}

function showPrevious () {
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
    
    /*
    current_fs.hide({
        duration: 800,
        easing: 'easeInCirc',
        complete: function () {
            current_fs.hide();
            prev_fs.show();
        }
    });
    */
    
    /*
    contentDiv.css('overflow', 'hidden');
    current_fs.animate({right: 350}, {
        duration:'fast',
        // easing: 'easeOutBack',
        complete: function () {
            contentDiv.css('overflow', 'auto');
            current_fs.css('right', '0');
            current_fs.hide();
            prev_fs.show();
        }
    });
	*/
    
    prev_fs.show();
    current_fs.animate({opacity: 0}, {
        step: function(now, mx) {
            scale = 0.8 + (1 - now) * 0.2;
            left = ((1 - now) * 50) + '%';
            opacity = 1 - now;
            current_fs.css({'left': left});
            prev_fs.css({'transform': 'scale(' + scale + ')', 'opacity': opacity});
        },
        duration: animDuration,
        complete: function() {
            current_fs.css('left', '0');
            current_fs.hide();
        }        
    });
}

$('.next').click(function () {
    /* jQuery Validation */
    var form = $('#mform');
    form.validate({
        submitHandler: function (e) {
            alert('Submit was ingored!');
            e.preventDefault();
        },
        rules: {
            inputStep1: {required: true, minlength: 6},
        },
    });
    
    if (form.valid() == true) {
        showNext();
    }
    
    if (step > 0) {
        $('.prev').prop('disabled', false);
        console.log('step: ' + step);
    }
    
    if (step === max_step) {
        $(this).hide();
        submit.show();
    }
});

$('.prev').click(function () {
    showPrevious();
    
    if (step === 0) {
        $(this).prop('disabled', true);
    }
});