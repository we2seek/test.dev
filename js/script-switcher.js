$("document").ready(function(){
	$("input[type=checkbox]").on("click", function(){
		
		var input = $("#passwordInput");
		
		if ( input.is('[type="password"]') ) {
			input.attr('type', 'text');
			// $(this).next().text("Hide password");
		} else if ( input.is('[type="text"]') ) {
			input.attr('type', 'password');
			// $(this).next().text("Show password");
		}

	});
});