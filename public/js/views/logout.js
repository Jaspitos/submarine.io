$(document).ready(function(){

	
	var that = this;

// handle user logout //
	$('#btn-logout').click(function(){ that.attemptLogout(); });


	this.attemptLogout = function()
	{
		var that = this;
		$.ajax({
			url: "/logout",
			type: "POST",
			data: {logout : true},
			success: function(data){
	 			if (data == 'ok') window.location.href = '/';
			},
			error: function(jqXHR){
				console.log(jqXHR.responseText+' :: '+jqXHR.statusText);
			}
		});
	}


});