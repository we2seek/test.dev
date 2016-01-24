/* TODO: try use http://www.codeproject.com/Tips/855277/JQuery-Image-Slider-Tutorial-for-Beginners */
var current_fs, next_fs, prev_fs;
var form = $('#mform');
var fieldsets = $('#mform fieldset');
var progressbar = $('#progressbar li');
var btnSubmit = $('#mform input[type=submit]');
var btnPrev = $('#mform .prev');
var btnNext = $('#mform .next');
var dl = $('#mform .right > dl');
var radioProd = $('input[name="product"]');
var radioProdType = $('input[name="productType"]');

var step = 0; //current step
var stepStack = [];
var max_step = fieldsets.length - 1;

$(document).ready(function () {
    btnPrev.prop('disabled', true);

    btnNext.click(function () {
        showStep(step + 1);
    });

    btnPrev.click(function () {
        showStep(stepStack.pop());
    });

    form.validate({
        rules: {
            inputStep3: {
                required: true,
                minlength: 6
            },
            productType: {
                required: function() {
                    return $('input[name="productType"]:checked').val() == 'true';
                },
            },
        },
        errorPlacement: function(error, element) {
            if ( element.is(":radio") ) {
                error.appendTo( element.parents('.container') );
            } else { // This is the default behavior 
                error.insertAfter( element );
            }
        },
        messages: {
            productType: {
                required: "Make the choice, mother fucker!",
            }
        },
    });
    
    radioProd.click(function(){
        showStep(step + 1);
        // Deselect productType checked if there
        radioProdType.filter(':checked').prop('checked', false);
    });
    
    radioProdType.click(function(){
        // Escape step with prodType selection
        if (step == 0){
            showStep(step + 2);
            // Deselect product checked if there
            radioProd.filter(':checked').prop('checked', false);
        } else {
            showStep(step + 1);
        }
    });

});



function showStep(nextStep) {

    // Prevent form validation on PREV button pressed
    if (form.valid() === false && (nextStep > step)) {
        console.log('not valid form');
        return false;
    }

    current_fs = fieldsets.eq(step);
    next_fs = fieldsets.eq(nextStep);

    current_fs.hide();
    next_fs.show();
        
    // Show/hide buttons
    if (nextStep === 0) {
        btnPrev.prop('disabled', true);
    } else {
        btnPrev.prop('disabled', false);
    }
    
    if (nextStep === max_step) {
        btnNext.hide();
        btnSubmit.show();
    } else if (btnNext.is(':visible') === false) {
        btnNext.show();
        btnSubmit.hide();
    }
    
    // Progressbar
    var i = 0;
    
    for (i = 0; i < nextStep; i++) {
        progressbar.eq(i).addClass('pass');
    }
    
    for (i = nextStep; i < max_step; i++) {
        progressbar.eq(i).removeClass('pass');
    }
    
    progressbar.eq(step).removeClass('active');
    progressbar.eq(nextStep).addClass('active');
    
    // Right panel with <dl>
    if (nextStep > step) {
        dl.eq(step + 1).show();
    } else {
        dl.eq(step).hide();
    }
    
    // Do not remeber last step if we go back to prevent loop
    // between steps
    if (nextStep > step ) {
        stepStack.push(step);
    }
    step = nextStep;
}