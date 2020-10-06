/*
 * for sajhen.jsp
 * 작성자 : 박종일
 */

var itemList = new Array();
var tempItemList = new Array();

//selector 배열
var valid_rlDminsttNms = ['경기도 군포시', '경기도 안산시', '경기도 안양시', '경기도 의왕시', '경상남도 수산자원연구소', '국립공원공단', '국립농업과학원', '국립생태원', '국립수산과학원', '국립해양박물관', '국립해양조사원', '국립해양측위정보원', '국토교통부', '국토지리정보원', '농림수산식품교육문화정보원', '농림축산식품부', '농업기술실용화재단', '농촌진흥청', '산림청', '서울시', '수협중앙회', '식품의약품안전처', '인천광역시 옹진군', '전라남도', '전주정보문화산업진흥원', '충청남도 당진시', '충청남도 보령시', '한국농수산식품유통공사', '한국농어촌공사', '한국농촌경제연구원', '한국산업기술평가관리원', '한국생명공학연구원', '한국석유공사', '한국수산자원공단', '한국어촌어항공단', '한국에너지기술평가원', '한국임업진흥원', '한국저작권위원회', '한국정보화진흥원', '한국해양과학기술원', '한국해양수산개발원', '한국해양수산연수원', '한국환경공단', '한국환경정책평가연구원', '항로표지기술원', '해양수산부', '해양환경공단', '환경부'];
//data를 가져올 수요기관 배열 (selector 배열에 자신의 상위기관이 포함된경우 qry보내지 않음)
var qry_dminsttNms = ['경기도 군포시', '경기도 안산시', '경기도 안양시', '경기도 의왕시', '경상남도 수산자원연구소', '국립공원공단', '국립생태원', '국립해양박물관', '국토교통부', '농림수산식품교육문화정보원', '농림축산식품부', '농업기술실용화재단', '농촌진흥청', '산림청', '서울시', '수협중앙회', '식품의약품안전처', '인천광역시 옹진군', '전라남도', '전주정보문화산업진흥원', '충청남도 당진시', '충청남도 보령시', '한국농수산식품유통공사', '한국농어촌공사', '한국농촌경제연구원', '한국산업기술평가관리원', '한국생명공학연구원', '한국석유공사', '한국수산자원공단', '한국어촌어항공단', '한국에너지기술평가원', '한국임업진흥원', '한국저작권위원회', '한국정보화진흥원', '한국해양과학기술원', '한국해양수산개발원', '한국해양수산연수원', '한국환경공단', '한국환경정책평가연구원', '항로표지기술원', '해양수산부', '해양환경공단', '환경부'];

const NUM_OF_ROWS = 100;
var totDataCnt;
var len = 0;


$(document).ready(function(){							// 페이지 최초 로딩시 초기화
	
	// make org selector
	valid_rlDminsttNms = valid_rlDminsttNms.sort();
	let orgSelctor = $('#orgSelector');
	for (let org of valid_rlDminsttNms) {
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
	
	if(Number(startDate) >= Number(endDate)){
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
	
	$.when(ajaxGetTotDataCnt(startDate, endDate, bidType))
	.then(function(data){				// success function
		totDataCnt = data.response.body.totalCount;
	}).done(function(){					// complete function

		let ajaxArr = [];
		for (let i = 0; i < totDataCnt / NUM_OF_ROWS; i++) {
			ajaxArr.push(getAjaxReq(startDate, endDate, bidType, i + 1));
		}
		
		$.when.apply($, ajaxArr)
		.done(function(){				// complete function
			let type = $('#orderSelector').val();
			let org = $('#orgSelector').val();
			makeTableByOptions(itemList, type, org);
			
			//e = new Date().getTime();
			//console.log("time : " + (e - s));			
		});
	});
}

/*
 * 데이터를 가져오는  $.ajax
 * @param {String} startDate 조회시작일
 * @param {String} endDate 조회종료일
 * @param {String} bidType 용역구분
 * @param {int} i 페이지넘버
 * @return $.ajax (for promise)
 */ 
function getAjaxReq(startDate, endDate, bidType, i) {
	var ajax = $.ajax({
		url : '/getAjaxData',
		data : {
			getUrl : 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getPublicPrcureThngInfo' + bidType + 'PPSSrch',
			ServiceKey : 'lZs7i%2FF0hS7LFlHBQCTvUiV%2FF2lzjO%2BwlftX3tOfEp7RHQVbqxSUOEYBvlZHPo2RUt6U5GRIuUTGpqqpIU3pjA%3D%3D',
			pageNo : i,
			inqryDiv : '1',
			numOfRows : NUM_OF_ROWS,
			inqryBgnDt : startDate,
			inqryEndDt : endDate,
			type : 'json'
		},
		type : 'GET',
		dataType : 'json',
		success : function(data) {
			if (data.response.header.resultCode == '00' && data.response.body.totalCount != 0) {
				itemList = itemList.concat(data.response.body.items.filter(filterBy_rlDminsttNm));
				
				len += data.response.body.items.length;
				$("#progressInfo").html('(' + Math.round(len / totDataCnt) * 100 + '%)');
			}
		}
	});
	return ajax;
}

/*
 * totDataCnt를 가져오는 $.ajax
 * @param {String} startDate 조회시작일
 * @param {String} endDate 조회종료일
 * @param {String} bidType 용역구분
 * @return $.ajax
 */
function ajaxGetTotDataCnt(startDate, endDate, bidType) {
	var totCnt;
	var ajax = $.ajax({
		url : '/getAjaxData',
		data : {
			getUrl : 'http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getPublicPrcureThngInfo' + bidType + 'PPSSrch',
			ServiceKey : 'WuNaQTtVX5qa0mJTnEds7zu3pTB1IcHNLMW5iT2Fba3PetWOggKLDHXsq3bgCCaPPytIm%2B36areboI0JTnqvxg%3D%3D',
			pageNo : '1',
			inqryDiv : '1',
			numOfRows : '1',
			inqryBgnDt : startDate,
			inqryEndDt : endDate,
			type : 'json'
		},
		type : 'GET',
		dataType : 'json'
	});
	return ajax;
}

/*
 * view의 tbody(id='itemList') 생성
 * @param {Array} itemList data array
 */
function makeTable(itemList) {

	$("#itemList").empty();
	
	var html = '';
	if (itemList.length != 0) {
		for(var item of itemList){	
			html += '<tr>';
			html += '<td class="w10p">' + item.bfSpecRgstNo + '</td>';
			html += '<td class="w50p"><a class="detailUrl" href=' + getDetailUrl(item.bfSpecRgstNo) + ' target=\'_blank\'>' + item.prdctClsfcNoNm + '</td>';
			html += '<td class="w20p">' + item.rlDminsttNm + '</td>';
			html += '<td class="w20p">' + item.rgstDt + '</td>';
			html += '</tr>';	
		}
	} else {
		html += '<tr><th colspan="4"> 데이터가 존재하지 않습니다. </th></tr>';
	}
	$("#itemList").append(html);

	$('#loadingBox').hide();
}

/*
 * search option에 따른 view의 tbody(id='itemList') 생성
 * @param {Array} itemList data array
 * @param {String} type 오름차순 내림차순
 * @param {String} org 기관명
 */
function makeTableByOptions(itemList, type, org){
	if (org != '전체선택') {
		tempItemList = filterSuchrlDminsttNm(org);
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
 * 상세정보 페이지로 연결할 url 생성
 * @param {String} bfSpecRgstNo 
 * @param {String} 연결 url
 */
function getDetailUrl(bfSpecRgstNo) {
	var detail_URL = "http://www.g2b.go.kr:8081/ep/preparation/prestd/preStdDtl.do?preStdRegNo=";
	return detail_URL + bfSpecRgstNo;
}

/*
 * itmeList의 데이터 정제를 위한 filter
 * object의 rlDminsttNm에 valid_rlDminsttNms의 문자열이 포함되어있지 않으면 삭제
 * @param {Object} item elements of itmeList 
 * @return {boolean} true면 남김, false면 삭제 
 */
function filterBy_rlDminsttNm(item) {
	var target = item.rlDminsttNm;
	var result;
	for (var val of valid_rlDminsttNms) {
		if (target.trim().indexOf(val) > -1) {
			return true; 
		}
	}
	return false;
}

/*
 * itmeList의 데이터 정제를 위한 filter
 * object의 rlDminsttNm에 특정 기관명(query)이 포함되어있지 않으면 삭제
 * @param {String} query 찾으려는 기관명 
 * @return {int} 0보다 작으면 삭제
 */
function filterSuchrlDminsttNm(query) {
	return itemList.filter(function(item){
		return item.rlDminsttNm.trim().indexOf(query) > -1;
	});
}

// 오름차순 내림차순 함수
function compareDESC(a, b) {return b['bfSpecRgstNo'] - a['bfSpecRgstNo'];}
function compareASC(a, b) {return a['bfSpecRgstNo'] - b['bfSpecRgstNo'];}