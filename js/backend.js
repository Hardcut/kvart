$(document).ready(function(){
	$('.callback__popup .btn__submit').click(function(event){
		event.preventDefault();
		$(this).parents('.popup').hide();
		$('.popup__reminder').fadeIn();
	});

	$('.feedback__form .btn__submit').click(function(event){
		event.preventDefault();
		$('.feedback__form .form__content').hide();
		$('.feedback__form .form__reminder').fadeIn();
	});
		
});