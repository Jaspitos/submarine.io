$(document).ready(function(){



// main login form //

	$('#login').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			
			// append 'remember-me' option to formData to write local cookie //
			//formData.push({name:'remember-me', value:$('.button-rememember-me-glyph').hasClass('glyphicon-ok')});
				return true;
			
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/index';
		},
		error : function(e){
			console.log(e.responseText);
		}
	}); 

	
});