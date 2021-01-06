$(document).ready(function() {
    if($('.radio').length > 0){
    	initRadio();
    	changeRadio();
    }
});

function initRadio(){
	$('.radio').each(function() {
		var selected = $(this).find('option[selected=selected]').index();
		$(this).find('li').eq(selected).addClass('selected');
	});
}
function changeRadio(){
	$('.radio li').on('click', function(){
		$(this).siblings().removeClass('selected');
		$(this).addClass('selected');
		$(this).parent().parent().find('option').removeAttr('selected');
		$(this).parent().parent().find('option').eq($(this).index()).attr('selected', 'selected');
	});
}