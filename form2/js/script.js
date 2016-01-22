/* TODO: try use http://www.codeproject.com/Tips/855277/JQuery-Image-Slider-Tutorial-for-Beginners */
var current_fs, next_fs, prev_fs;
var form = $('#mform');
var fieldsets = $('#mform fieldset');
var progressbar = $('#progressbar li');
var btnSubmit = $('#mform input[type=submit]');
var btnPrev = $('#mform .prev');
var btnNext = $('#mform .next');
var dl = $('#mform .right > dl');
var contentDiv = $('#mform div.content');
var step = 0; //current step
var max_step = fieldsets.length - 1;
var left, opacity, scale;
var animDuration = 'fast';

//jQuery.easing.def = 'easeInOutBack';
jQuery.easing.def = 'easeOutSine';

$(document).ready(function () {
    btnPrev.prop('disabled', true);

    btnNext.click(function () {
        showStep(step + 1);
    });

    btnPrev.click(function () {
        showStep(step - 1);
    });

    form.validate({
        submitHandler: function (e) {
            alert('Submit was ingored!');
            e.preventDefault();
        },
        rules: {
            inputStep3: {
                required: true,
                minlength: 6
            },
        },
    });

});



function showStep(nextStep) {

    // Prevent form validation on PREV button pressed
    if (form.valid() == false && (nextStep > step)) {
        return false;
    }

    /* 
    // Circle loop thought steps
    if (nextStep < 0) {
        nextStep = max_step;
    }

    // Circle loop thought steps
    if (nextStep > max_step) {
        nextStep = 0;
    }
    */

    current_fs = fieldsets.eq(step);
    next_fs = fieldsets.eq(nextStep);

    current_fs.hide();
    next_fs.show();
        
    // Show/hide buttons
    if (nextStep == 0) {
        btnPrev.prop('disabled', true);
    } else {
        btnPrev.prop('disabled', false);
    }
    
    if (nextStep == max_step) {
        btnNext.hide();
        btnSubmit.show();
    } else if (btnNext.is(':visible') === false) {
        btnNext.show();
        btnSubmit.hide();
    }
    
    step = nextStep;
}

function nextStep() {
    var form = $('#mform');
    form.validate({
        submitHandler: function (e) {
            alert('Submit was ingored!');
            e.preventDefault();
        },
        rules: {
            inputStep3: {
                required: true,
                minlength: 6
            },
        },
    });

    if (form.valid() == true) {
        showNext();
    }

    if (step > 0) {
        $('.prev').prop('disabled', false);
    }

    if (step === max_step) {
        $(this).hide();
        submit.show();
    }
}

function previousStep() {
    showPrevious();

    if (step === 0) {
        $(this).prop('disabled', true);
    }
}

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

    contentDiv.css('overflow', 'hidden');
    current_fs.animate({
        'right': '350'
    }, {
        duration: animDuration,
        // easing: 'easeOutElastic',
        complete: function () {
            contentDiv.css('overflow', 'auto');
            current_fs.css('right', '0');
            current_fs.hide();
            next_fs.show();
        }
    });

    /*
    next_fs.show();
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            scale = 1 - (1 - now) * 0.2;
            left = (now * 50) + '%';
            opacity = 1 - now;
            current_fs.css({
                'transform': 'scale(' + scale + ')'
            });
            next_fs.css({
                'left': left,
                'opacity': opacity
            });
        },
        duration: animDuration,
        complete: function () {
            current_fs.css('left', '0');
            current_fs.hide();
        }
    });
    */
}

function showPrevious() {
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

    contentDiv.css('overflow', 'hidden');
    current_fs.animate({
        'left': '350px'
    }, {
        duration: animDuration,
        // easing: 'easeOutBack',
        complete: function () {
            contentDiv.css('overflow', 'auto');
            current_fs.css('left', '0');
            current_fs.hide();
            prev_fs.show();
        }
    });

    /*
    prev_fs.show();
    current_fs.animate({
        opacity: 0
    }, {
        step: function (now, mx) {
            scale = 0.8 + (1 - now) * 0.2;
            left = ((1 - now) * 50) + '%';
            opacity = 1 - now;
            current_fs.css({
                'left': left
            });
            prev_fs.css({
                'transform': 'scale(' + scale + ')',
                'opacity': opacity
            });
        },
        duration: animDuration,
        complete: function () {
            current_fs.css('left', '0');
            current_fs.hide();
        }
    });
    */
}