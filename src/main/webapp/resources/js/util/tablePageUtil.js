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
	
	let clickedNo = row.find('.no').text().trim();
	let key = $('#storageKey').val();
	LocalStorageUtil.pushValue(key, clickedNo);
	
	let target = null;
	if ($(this).hasClass('btnType') == true) {
		target = row.find('h3.title');
	} else {
		target = row.find('a.detailUrl')
	}
	if (target.hasClass('clicked') == false) {
		target.addClass('clicked');
	}
});

//orderSelector 클릭 listener
$(document).on('click', '.orderSelector li', function(e){	
	
	let parent = $(this).parent();
	let length = parent.find('li').length;
	let index = $(this).index();
	//console.log(length + ' || ' + index);
	
	if (index != length - 1) {
		index++;
	} else {
		index = 0;
	}
	
	$(this).removeClass('selected');
	parent.find('li').eq(index).addClass('selected');
	
	makeSortedTable();
});

// comparing method Object
var compareMethodObj = {
	SAJHEN : {
		NONE : {
			DESC : function (a, b) {return b['bfSpecRgstNo'] - a['bfSpecRgstNo'];}
			,ASC : function (a, b) {return a['bfSpecRgstNo'] - b['bfSpecRgstNo'];}
		}
		,DESC : {
			DESC : function (a, b) {
				if (a['rlDminsttNm'] < b['rlDminsttNm']) {
					return 1;
				} else if (a['rlDminsttNm'] > b['rlDminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.SAJHEN.NONE.DESC(a, b);
				}
			},
			ASC : function (a, b) {
				if (a['rlDminsttNm'] < b['rlDminsttNm']) {
					return 1;
				} else if (a['rlDminsttNm'] > b['rlDminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.SAJHEN.NONE.ASC(a, b);
				}
			}
		}
		,ASC : {
			DESC : function (a, b) {
				if (a['rlDminsttNm'] > b['rlDminsttNm']) {
					return 1;
				} else if (a['rlDminsttNm'] < b['rlDminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.SAJHEN.NONE.DESC(a, b);
				}
			},
			ASC : function (a, b) {
				if (a['rlDminsttNm'] > b['rlDminsttNm']) {
					return 1;
				} else if (a['rlDminsttNm'] < b['rlDminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.SAJHEN.NONE.ASC(a, b);
				}
			}
		}
	}
	,GONGGO : {
		NONE : {
			DESC : function (a, b) {
				let bDate = new Date(b['bidNtceDt']).getTime();
				let aDate = new Date(a['bidNtceDt']).getTime();
				return bDate > aDate ? 1 : -1;
			}
			,ASC : function (a, b) {	
				let bDate = new Date(b['bidNtceDt']).getTime();
				let aDate = new Date(a['bidNtceDt']).getTime();
				return aDate > bDate ? 1 : -1;
			}
		}
		,DESC : {
			DESC : function (a, b) {
				if (a['dminsttNm'] < b['dminsttNm']) {
					return 1;
				} else if (a['dminsttNm'] > b['dminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.GONGGO.NONE.DESC(a, b);
				}
			},
			ASC : function (a, b) {
				if (a['dminsttNm'] < b['dminsttNm']) {
					return 1;
				} else if (a['dminsttNm'] > b['dminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.GONGGO.NONE.ASC(a, b);
				}
			}
		}
		,ASC : {
			DESC : function (a, b) {
				if (a['dminsttNm'] > b['dminsttNm']) {
					return 1;
				} else if (a['dminsttNm'] < b['dminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.GONGGO.NONE.DESC(a, b);
				}
			},
			ASC : function (a, b) {
				if (a['dminsttNm'] > b['dminsttNm']) {
					return 1;
				} else if (a['dminsttNm'] < b['dminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.GONGGO.NONE.ASC(a, b);
				}
			}
		}
	}
	,CONTRACT : {
		NONE : {
			DESC : function (a, b) {
				let bDate = new Date(b['cntrctCnclsDate']).getTime();
				let aDate = new Date(a['cntrctCnclsDate']).getTime();
				return bDate > aDate ? 1 : -1;
			}
			,ASC : function (a, b) {
				let bDate = new Date(b['cntrctCnclsDate']).getTime();
				let aDate = new Date(a['cntrctCnclsDate']).getTime();
				return aDate > bDate ? 1 : -1;
			}
		}
		,DESC : {
			DESC : function (a, b) {
				if (a['cntrctInsttNm'] < b['cntrctInsttNm']) {
					return 1;
				} else if (a['cntrctInsttNm'] > b['cntrctInsttNm']) {
					return -1;
				} else {
					return compareMethodObj.CONTRACT.NONE.DESC(a, b);
				}
			},
			ASC : function (a, b) {
				if (a['cntrctInsttNm'] < b['cntrctInsttNm']) {
					return 1;
				} else if (a['cntrctInsttNm'] > b['cntrctInsttNm']) {
					return -1;
				} else {
					return compareMethodObj.CONTRACT.NONE.ASC(a, b);
				}
			}
		}
		,ASC : {
			DESC : function (a, b) {
				if (a['cntrctInsttNm'] > b['cntrctInsttNm']) {
					return 1;
				} else if (a['cntrctInsttNm'] < b['cntrctInsttNm']) {
					return -1;
				} else {
					return compareMethodObj.CONTRACT.NONE.DESC(a, b);
				}
			},
			ASC : function (a, b) {
				if (a['cntrctInsttNm'] > b['cntrctInsttNm']) {
					return 1;
				} else if (a['cntrctInsttNm'] < b['cntrctInsttNm']) {
					return -1;
				} else {
					return compareMethodObj.CONTRACT.NONE.ASC(a, b);
				}
			}
		}
	}
	,OPENBIDS : {
		NONE : {
			DESC : function (a, b) {
				let bDate = new Date(b['opengDt']).getTime();
				let aDate = new Date(a['opengDt']).getTime();
				return bDate > aDate ? 1 : -1;
			}
			,ASC : function (a, b) {		// sort function
				let bDate = new Date(b['opengDt']).getTime();
				let aDate = new Date(a['opengDt']).getTime();
				return aDate > bDate ? 1 : -1;
			}
		}
		,DESC : {
			DESC : function (a, b) {
				if (a['dminsttNm'] < b['dminsttNm']) {
					return 1;
				} else if (a['dminsttNm'] > b['dminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.OPENBIDS.NONE.DESC(a, b);
				}
			},
			ASC : function (a, b) {
				if (a['dminsttNm'] < b['dminsttNm']) {
					return 1;
				} else if (a['dminsttNm'] > b['dminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.OPENBIDS.NONE.ASC(a, b);
				}
			}
		}
		,ASC : {
			DESC : function (a, b) {
				if (a['dminsttNm'] > b['dminsttNm']) {
					return 1;
				} else if (a['dminsttNm'] < b['dminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.OPENBIDS.NONE.DESC(a, b);
				}
			},
			ASC : function (a, b) {
				if (a['dminsttNm'] > b['dminsttNm']) {
					return 1;
				} else if (a['dminsttNm'] < b['dminsttNm']) {
					return -1;
				} else {
					return compareMethodObj.OPENBIDS.NONE.ASC(a, b);
				}
			}
		}
	}
}
