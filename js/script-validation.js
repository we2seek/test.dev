$(document).ready(function(){
	$("#myForm").validate({
		rules: {
			email: {
				required: true,
			},

			password: {
				required: true,
			}
		},

		highlight: function(element) {
	        var id_attr = "#" + $( element ).attr("id") + "-icon";
	        $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
	        $(id_attr).removeClass('glyphicon-ok').addClass('glyphicon-remove');         
    	},

    	unhighlight: function(element) {
    		var id_attr = "#" + $( element ).attr("id") + "-icon";
    		$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
    		$(id_attr).removeClass('glyphicon-remove').addClass('glyphicon-ok');
    	},

    	errorElement: 'span',
    	errorClass: 'help-block',
    	errorPlacement: function(error, element) {
    		if(element.length) {
    			error.insertAfter(element);
    		} else {
    			error.insertAfter(element);
    		}
    	},

  //   	showErrors: function(errorMap, errorList) {
		//     $.each(this.successList, function(index, value) {
		//       return $(value).popover("hide");
		//     });
		//     return $.each(errorList, function(index, value) {
		//       var _popover;
		//       _popover = $(value.element).popover({
		//         trigger: "manual",
		//         placement: "right",
		//         content: value.message,
		//         template: "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\"><p></p></div></div></div>"
		//       });
		//       // Bootstrap 3.x :      
		//       _popover.data("bs.popover").options.content = value.message;
		//       // Bootstrap 2.x :
		//       // _popover.data("popover").options.content = value.message;
		//       return $(value.element).popover("show");
		//     });
		// }

    });
});