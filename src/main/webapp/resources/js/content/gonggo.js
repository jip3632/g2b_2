/*
 * for gonggo.jsp
 * 작성자 : 박종일
 */

var itemList = new Array();
var tempItemList = new Array();

//selector 배열
var valid_dminsttNms = ['경기도 군포시', '경기도 안산시', '경기도 안양시', '경기도 의왕시', '경상남도 수산자원연구소', '국립공원공단', '국립농업과학원', '국립생태원', '국립수산과학원', '국립해양박물관', '국립해양조사원', '국립해양측위정보원', '국토교통부', '국토지리정보원', '농림수산식품교육문화정보원', '농림축산식품부', '농업기술실용화재단', '농촌진흥청', '산림청', '서울시', '수협중앙회', '식품의약품안전처', '인천광역시 옹진군', '전라남도', '전주정보문화산업진흥원', '충청남도 당진시', '충청남도 보령시', '한국농수산식품유통공사', '한국농어촌공사', '한국농촌경제연구원', '한국산업기술평가관리원', '한국생명공학연구원', '한국석유공사', '한국수산자원공단', '한국어촌어항공단', '한국에너지기술평가원', '한국임업진흥원', '한국저작권위원회', '한국정보화진흥원', '한국해양과학기술원', '한국해양수산개발원', '한국해양수산연수원', '한국환경공단', '한국환경정책평가연구원', '항로표지기술원', '해양수산부', '해양환경공단', '환경부'];
// data를 가져올 수요기관 배열 (selector 배열에 자신의 상위기관이 포함된경우 qry보내지 않음)
var qry_dminsttNms = ['경기도 군포시', '경기도 안산시', '경기도 안양시', '경기도 의왕시', '경상남도 수산자원연구소', '국립공원공단', '국립생태원', '국립해양박물관', '국토교통부', '농림수산식품교육문화정보원', '농림축산식품부', '농업기술실용화재단', '농촌진흥청', '산림청', '서울시', '수협중앙회', '식품의약품안전처', '인천광역시 옹진군', '전라남도', '전주정보문화산업진흥원', '충청남도 당진시', '충청남도 보령시', '한국농수산식품유통공사', '한국농어촌공사', '한국농촌경제연구원', '한국산업기술평가관리원', '한국생명공학연구원', '한국석유공사', '한국수산자원공단', '한국어촌어항공단', '한국에너지기술평가원', '한국임업진흥원', '한국저작권위원회', '한국정보화진흥원', '한국해양과학기술원', '한국해양수산개발원', '한국해양수산연수원', '한국환경공단', '한국환경정책평가연구원', '항로표지기술원', '해양수산부', '해양환경공단', '환경부'];

const NUM_OF_ROWS = 999;
var totDataCnt;
var len = 0;


$(document).ready(function(){							// 페이지 최초 로딩시 초기화
	// make org selector
	valid_dminsttNms = valid_dminsttNms.sort();
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
	
});

$(document).on('change', '.selector', function(e){		// selector 변경 listener
	let type = $('#orderSelector').val();
	let org = $('#orgSelector').val();
	
	makeTableByOptions(itemList, type, org);
});

$(document).on('click', '.orderSelector li', function(e){	// orderSelector 클릭 listener
	$('.orderSelector li').toggleClass('selected');
	$('#orderSelector').val($('.orderSelector .selected').attr('data-value')).trigger('change');
});

$(document).on('click', '#search', function() {			// 조회 버튼 클릭 listener
	getData();
});

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
	
	var s;
	var e;
	
	s = new Date().getTime();
	
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
		let type = $('#orderSelector').val();
		let org = $('#orgSelector').val();
		makeTableByOptions(itemList, type, org);
		
		e = new Date().getTime();
		console.log("time : " + (e - s));
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
			getUrl : 'http://apis.data.go.kr/1230000/BidPublicInfoService/getBidPblancListInfo' + bidType + 'PPSSrch',
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
	if (itemList.length != 0)  {
		for(let item of itemList){
			html += '<li>';
			html += '<div class="titleArea">';
			html += '<label>입찰공고번호</label><span class="no">' + item.bidNtceNo + '</span>';
			html += '<label>차수</label><span class="no">' + item.bidNtceOrd + '</span>';
			html += '<h3 class="title"><a class="detailUrl" href=' + item.bidNtceDtlUrl + ' target=\'_blank\'>' + item.bidNtceNm + '</a></h3>';
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
 * search option에 따른 view의 tbody(id='itemList') 생성
 * @param {Array} itemList ... data array
 * @param {String} type ... ASC or DESC
 * @param {String} org ... 기관명
 */
function makeTableByOptions(itemList, type, org){
	if (org != '전체선택') {
		tempItemList = filterSuchdminsttNm(org);
	} else {
		tempItemList = itemList;
	}
	
	if (type == 'DESC') {
		tempItemList = tempItemList.sort(compareDESC);
		makeTable(tempItemList);
	} else {
		tempItemList = tempItemList.sort(compareASC);
		makeTable(tempItemList);
	}
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

// 오름차순 내림차순 함수
function compareDESC(a, b) {
	let bDate = new Date(b['bidNtceDt']).getTime();
	let aDate = new Date(a['bidNtceDt']).getTime();
	return bDate > aDate ? 1 : -1;
}
function compareASC(a, b) {	
	let bDate = new Date(b['bidNtceDt']).getTime();
	let aDate = new Date(a['bidNtceDt']).getTime();
	return aDate > bDate ? 1 : -1;
}

