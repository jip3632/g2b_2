// 2020.08.28
/*
 * for MOVE_TOP_BTN
 * 작성자 : 박종일
 */

// scroll 감지
var didScroll;

// start pos
const delta = 500;

/*
 * scroll을 감지하여 discroll = true 
 */
$(window).scroll(function() {
	didScroll = true;
});


/*
 * 250ms 마다 disScroll 체크후 onMoveTopBtn 실행
 * 실행후 disScroll = false
 */ 
setInterval(function(){
	if (didScroll) {
		onMoveTopBtn();
		didScroll = false;
	}
}, 250);

/*
 * 현재 스크롤의 위치(pos)에 따라 MOVE_TOP_BUTTON toggle
 * pos > 500 이면 MOVE_TOP_BTN fadeIn
 */ 
function onMoveTopBtn(){
	var pos = $(this).scrollTop();
	//console.log(pos);
	if (pos > 500) {
		$('#MOVE_TOP_BTN').fadeIn();
	} else {
		$('#MOVE_TOP_BTN').fadeOut();
	}
}
/*
 * MOVE_TOP_BUTTON click event listener
 * callback : 스크롤 맨위로
 */ 
$(document).on('click', '#MOVE_TOP_BTN', function() {
	$('html, body').animate({
		scrollTop : 0
	}, 400);
});



//2020.08.31
/*
 * for table row selected
 * 작성자 : 박종일
 */
$(document).on('click', '.detailUrl', function(e){
	let row = $(e.target).parents('li');

	if (row.hasClass('selected') == false) {
		row.addClass('selected');
		if ($(this).hasClass('btnType') == true) {
			row.find('h3.title').css({
				"color" : "#FF0000"
			});
		} else {
			row.find('a.detailUrl').css({
				"color" : "#FF0000"
			});
		}
	}
});
