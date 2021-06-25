/*
 * for gonggo.jsp
 * 작성자 : 박종일
 */

var itemList = new Array();
var tempItemList = new Array();

//selector 배열
var valid_dminsttNms = [];
// data를 가져올 수요기관 배열 (selector 배열에 자신의 상위기관이 포함된경우 qry보내지 않음)
var qry_dminsttNms = [];

const NUM_OF_ROWS = 999;
var totDataCnt;
var len = 0;


$(document).ready(function(){							// 페이지 최초 로딩시 초기화
	// make org selector
	valid_dminsttNms = KeywordAjax.getAvailableSearchList('inst', 'string').sort();
	qry_dminsttNms = KeywordAjax.getAvailableSearchList('inst', 'string');
	let orgSelctor = $('#orgSelector');
	for (let org of valid_dminsttNms) {
		let html = '<option value="' + org +'">' + org + '</option>'
		orgSelctor.append(html);
	}
	
	// set default date
	let date = new Date();
	$("#endDate").val(date.toISOString().slice(0, 10));
	date.setDate(date.getDate() - 6);
	$('#startDate').val(date.toISOString().slice(0, 10));
	
	console.log(window.localStorage.getItem('exist'));
});

$(document).on('change', '.selector', function(e){		// selector 변경 listener
	makeSortedTable();
});

$(document).on('click', '#search', function() {			// 조회 버튼 클릭 listener
	getData();
});

/*
 * sort data list
 */ 
function makeSortedTable() {
	let type1 = $('#dateOrder .selected').data('value');
	let type2 = $('#insttOrder .selected').data('value');
	let org = $('#orgSelector').val();

	if (org != '전체선택') {
		tempItemList = filterSuchdminsttNm(org);
	} else {
		tempItemList = itemList;
	}
	
	//console.log(type2 + ' || ' + type1);
	tempItemList = tempItemList.sort(compareMethodObj.GONGGO[type2][type1]);
	
	makeTable(tempItemList);
}

/*
 * itemList와 table 초기화 한뒤 startDate, endDate를 설정하고 doAjaxRequest(startDate, endDate)하는 함수
 */ 
function getData() {
	
	let bidType = $('#bidSelector').val();
	let startDate = $("#startDate").val(); 
	let endDate = $("#endDate").val();
	
	startDate = startDate.replace(/\-/g, "")+"0000";
	
	let date = new Date(endDate);
	date.setDate(date.getDate() + 1);
	endDate = date.toISOString().slice(0, 10);
	endDate = endDate.replace(/\-/g, "")+"0000";
	
	if(Number() >= Number(endDate)){
		alert("종료일일 시작일보다 앞섭니다.");
		return 0;
	}
	
	// reset
	len = 0;
	itemList = [];
	$("#progressInfo").html('');
	$('#loadingBox').show();	
	$("#itemList").empty();
	
	doAjaxRequest(startDate, endDate, bidType);
}

/*
 * 여러 ajax들을 when, done으로 순서에 맞게 실행한뒤 itmeList table을 만드는 함수
 * @param {String} startDate 조회시작일
 * @param {String} endDate 조회종료일
 * @param {String} bidType 용역구분
 */ 
function doAjaxRequest(startDate, endDate, bidType) {
	
	//var s;
	//var e;
	//s = new Date().getTime();
	
	let ajaxArr = [];
	for (var dminstt of qry_dminsttNms) {
		ajaxArr.push(getAjaxReq(startDate, endDate, bidType, dminstt));
	}
	$.when.apply($, ajaxArr)
	.then(function(){			// success function
		let objects = arguments;
		let i = 0;
		for (let request of objects){
			let data = request[0];
			if (data.response.header.resultCode == '00' && data.response.body.totalCount != 0) {
				itemList = itemList.concat(data.response.body.items);
			}
		}
	}, function(){				// fail function
		alert('api 서비스 내부오류.. 잠시후 다시 시도해 주시거나\n조회기준을 등록일로 검색하세요');
	})
	.done(function(){			// complete function
		makeSortedTable();
		
		//e = new Date().getTime();
		//console.log("time : " + (e - s));
	});
}

/*
 * 데이터를 가져오는  $.ajax
 * @param {String} startDate 조회시작일
 * @param {String} endDate 조회종료일
 * @param {String} bidType 용역구분
 * @param {String} dminstt 수요기관
 * @return $.ajax (for promise)
 */ 
function getAjaxReq(startDate, endDate, bidType, dminstt) {
	var ajax = $.ajax({
		url : '/getAjaxData',
		data : {
			getUrl : 'http://apis.data.go.kr/1230000/BidPublicInfoService02/getBidPblancListInfo' + bidType + 'PPSSrch',
			ServiceKey : 'WuNaQTtVX5qa0mJTnEds7zu3pTB1IcHNLMW5iT2Fba3PetWOggKLDHXsq3bgCCaPPytIm%2B36areboI0JTnqvxg%3D%3D',
			pageNo : '1',
			inqryDiv : '1',
			dminsttNm : dminstt,
			numOfRows : NUM_OF_ROWS,
			inqryBgnDt : startDate,
			inqryEndDt : endDate,
			type : 'json'
		},
		type : 'GET',
		dataType : 'json',
		success : function(data) {
			if (data.response.header.resultCode == '00' && data.response.body.totalCount != 0) {
				len += data.response.body.totalCount;
				$("#progressInfo").html('(' + dminstt + '...' + len + ')');
			}
		}
	});
	return ajax;
}

/*
 * view의 tbody(id='itemList') 생성
 * @param {Array} itemList ... data array
 */
function makeTable(itemList) {

	let table = $("#itemList");
	
	table.empty();
	
	let html = '';
	var key = $('#storageKey').val();
	if (itemList.length != 0)  {
		for(let item of itemList){
			html += '<li>';
			html += '<div class="titleArea">';
			html += '<label>입찰공고번호</label><span class="no">' + item.bidNtceNo + '</span>';
			html += '<label>차수</label><span class="no">' + item.bidNtceOrd + '</span>';
			if (LocalStorageUtil.isIncluded(key, item.bidNtceNo.concat(item.bidNtceOrd))) {
				html += '<h3 class="title"><a class="detailUrl clicked" href=' + item.bidNtceDtlUrl + ' target=\'_blank\'>' + item.bidNtceNm + '</a></h3>';
			} else {
				html += '<h3 class="title"><a class="detailUrl" href=' + item.bidNtceDtlUrl + ' target=\'_blank\'>' + item.bidNtceNm + '</a></h3>';
			}
			html += '</div>';
			html += '<div class="infoArea">';
			html += '<ul>';
			html += '<li class="dminsttNm"><label>수요기관</label>' + item.dminsttNm + '</li>';
			html += '<li class="bidNtceDt"><label>입찰공고일시</label>' + item.bidNtceDt + '</li>';
			html += '</ul>';
			html += '</div>';
			html += '</li>';	
		}
	} else {
		html += '<li class="message">데이터가 존재하지 않습니다. </li>';
	}
	table.html(html);

	$('#loadingBox').hide();
}

/*
 * itmeList의 데이터 정제를 위한 filter
 * object의 dminsttNm에 특정 기관명(query)이 포함되어있지 않으면 삭제
 * @param {String} query 찾으려는 기관명 
 * @return {int} 0보다 작으면 삭제
 */
function filterSuchdminsttNm(query) {
	return itemList.filter(function(item){
		return item.dminsttNm.trim().indexOf(query) > -1;
	});
}

