/*
 * for openBids.jsp
 * 공공데이터 포털
 * 작성자 : 박종일
 */

// orginal data
var itemList = new Array();
var tempItemList = new Array();

// selector 배열
var valid_dminsttNm = [];
// ata를 가져올 수요기관 배열 (selector 배열에 자신의 상위기관이 포함된경우 qry보내지 않음)
var qry_dminsttNms = [];

const NUM_OF_ROWS = 999;
var totDataCnt;
var len = 0;

$(document).ready(function(){							// 페이지 최초 로딩시 초기화
	// make org selector
	valid_dminsttNm = KeywordAjax.getAvailableSearchList('inst', 'string').sort();
	qry_dminsttNms = KeywordAjax.getAvailableSearchList('inst', 'string');
	let orgSelctor = $('#orgSelector');
	for (let org of valid_dminsttNm) {
		let html = '<option value="' + org +'">' + org + '</option>'
		orgSelctor.append(html);
	}
	
	// set default date
	let date = new Date();
	$("#endDate").val(date.toISOString().slice(0, 10));
	date.setDate(date.getDate() - 6);
	$('#startDate').val(date.toISOString().slice(0, 10));
	
});

$(document).on('click', '#search', function() {			// 조회 버튼 클릭시 테이블 변경 listener
	getData();
});

$(document).on('change', '.selector', function(e){		// selector 변경 listener
	makeSortedTable();
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
	tempItemList = tempItemList.sort(compareMethodObj.OPENBIDS[type2][type1]);
	
	makeTable(tempItemList);
}

/*
 * itemList와 table 초기화 한뒤 startDate, endDate를 설정하고 doAjaxRequest(startDate, endDate)하는 함수
 */ 
function getData() {
	// get search type and date
	let bidType = $('#bidSelector').val();
	let dateType = $('#dateTypeSelector').val();
	if (!dateType) {
		dateType = '';
	}
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
	
	//reset
	len = 0;
	itemList = [];
	$("#progressInfo").html('');
	$('#loadingBox').show();	
	$("#itemList").empty();
	
	doAjaxRequest(startDate, endDate, bidType, dateType);
}

/*
 * 여러 ajax들을 when, done으로 순서에 맞게 실행한뒤 itmeList table을 만드는 함수
 * @param {String} startDate 조회시작일
 * @param {String} endDate 조회종료일
 * @param {String} bidType 용역구분
 * @param {String} dateType 조회구분
 */ 
function doAjaxRequest(startDate, endDate, bidType, dateType) {
	
	// for timechk
	//var s;
	//var e;
	//s = new Date().getTime();
	
	// get json
	if (!dateType) {	
		$.when(ajaxGetTotDataCnt(startDate, endDate, bidType, dateType))
		.then(function(data){			// success function
			totDataCnt = data.response.body.totalCount;
		}).done(function(){				// complete function
			let ajaxArr = [];
			for (let i = 0; i < totDataCnt / NUM_OF_ROWS; i++) {
				ajaxArr.push(getAjaxReq(startDate, endDate, bidType, dateType, i + 1));
			}
			
			$.when.apply($, ajaxArr)
			.done(function(){		// complete function
				makeSortedTable();
				
				//e = new Date().getTime();
				//console.log("time : " + (e - s));
			});
		});
	} else {
		let ajaxArr = [];
		for (var dminstt of qry_dminsttNms) {
			ajaxArr.push(getAjaxReq_dminstt(startDate, endDate, bidType, dateType, dminstt));
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
			// fail function
			alert('api 서비스 내부오류.. 잠시후 다시 시도해 주시거나\n조회기준을 등록일로 검색하세요');
		})
		.done(function(){			// complete function
			makeSortedTable();
			
			//e = new Date().getTime();
			//console.log("time : " + (e - s));
		});
	}
}

/*
 * 데이터를 가져오는  $.ajax
 * @param {String} startDate 조회시작일
 * @param {String} endDate 조회종료일
 * @param {String} bidType 용역구분
 * @param {String} dateType 조회구분
 * @param {String} dminstt 수요기관
 * @return $.ajax (for promise)
 */ 
function getAjaxReq_dminstt(startDate, endDate, bidType, dateType, dminstt) {
	
	var ajax = $.ajax({
		url : '/getAjaxData',
		data : {
			//getUrl : 'http://apis.data.go.kr/1230000/ScsbidInfoService/getOpengResultListInfo' + bidType,
			getUrl : 'http://apis.data.go.kr/1230000/ScsbidInfoService/getOpengResultListInfo'+ bidType + dateType,
			ServiceKey : 'lZs7i%2FF0hS7LFlHBQCTvUiV%2FF2lzjO%2BwlftX3tOfEp7RHQVbqxSUOEYBvlZHPo2RUt6U5GRIuUTGpqqpIU3pjA%3D%3D',
			pageNo : '1',
			inqryDiv : '2',
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
 * 데이터를 가져오는  $.ajax
 * @param {String} startDate 조회시작일
 * @param {String} endDate 조회종료일
 * @param {String} bidType 용역구분
 * @param {String} dateType 조회구분
 * @param {int} i 페이지넘버
 * @return $.ajax (for promise)
 */
function getAjaxReq(startDate, endDate, bidType, dateType, i) {
	
	var ajax = $.ajax({
		url : '/getAjaxData',
		data : {
			getUrl : 'http://apis.data.go.kr/1230000/ScsbidInfoService/getOpengResultListInfo'+ bidType + dateType,
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
			if (data.response.header.resultCode == '00') {
				itemList = itemList.concat(data.response.body.items.filter(filterBy_dminsttNm));
				
				len += data.response.body.items.length;
				$("#progressInfo").html('(' + len + ' / ' + totDataCnt + ')');
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
 * @param {String} dateType 조회구분
 * @return $.ajax (for promise)
 */
function ajaxGetTotDataCnt(startDate, endDate, bidType, dateType) {
	var totCnt;
	var ajax = $.ajax({
		url : '/getAjaxData',
		data : {
			getUrl : 'http://apis.data.go.kr/1230000/ScsbidInfoService/getOpengResultListInfo'+ bidType + dateType,
			ServiceKey : 'WuNaQTtVX5qa0mJTnEds7zu3pTB1IcHNLMW5iT2Fba3PetWOggKLDHXsq3bgCCaPPytIm%2B36areboI0JTnqvxg%3D%3D',
			pageNo : '1',
			inqryDiv : '2',
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
	
	let table = $("#itemList"); 
	table.empty();
	let html = '';
	var key = $('#storageKey').val();
	
	if (itemList.length != 0) {

		for(let item of itemList){
			let openCorpInfo = [];
			
			if (item.opengCorpInfo) {
				openCorpInfo = item.opengCorpInfo.split('^');
			}
			
			html += '<li>';
			html += '<div class="titleArea">';
			html += '<label>입찰공고번호</label><span class="no">' + item.bidNtceNo + '-' + item.bidNtceOrd + '</span>';
			html += '<label>재입찰번호</label><span class="no">' + item.rbidNo + '</span>';
			if (LocalStorageUtil.isIncluded(key, (item.bidNtceNo + '-' + item.bidNtceOrd).concat(item.rbidNo))) {
				html += '<h3 class="title clicked">' + item.bidNtceNm + '</h3>';
			} else {
				html += '<h3 class="title">' + item.bidNtceNm + '</h3>';
			}
			html += '</div>';
			html += '<div class="infoArea">';
			html += '<ul>';
			html += '<li class="dminsttNm"><label>수요기관</label>' + item.dminsttNm + '</li>';
			html += '<li class="opengDt"><label>개찰일시</label>' + item.opengDt.slice(0, -3) + '</li>';
			html += '<li class="opengDt"><label>참가수</label>' + item.prtcptCnum + '</li>';
			
			if (openCorpInfo[0]) {
				html += '<li class="openCorpInfo"><label>낙찰 예정자</label>' + openCorpInfo[0] + '</li>';
			}
			html += '</ul>';
			html += '</div>';
			html += '<div class="stateArea">';
			switch(item.progrsDivCdNm) {
				case '개찰완료':
					html += '<span class="progrsDivCdNm cmplt">'+ item.progrsDivCdNm +'</span><a class="detailUrl btnType" href="/detail/opengDtl/' + item.bidNtceNo + '/' + $('#bidSelector').val() + '" target="_blank">내용보기</a>';
					break;
				case '유찰':
					html += '<span class="progrsDivCdNm fail">' + item.progrsDivCdNm + '</span><a class="detailUrl btnType" data-toggle="modal" href="#resultBid" onclick="javascript:openResultBid(' + item.bidNtceNo + ", 'Failing'" + ')">내용보기</a>';
					break;
				case '재입찰':
					html += '<span class="progrsDivCdNm rebid">' + item.progrsDivCdNm + '</span><a class="detailUrl btnType" data-toggle="modal" href="#resultBid" onclick="javascript:openResultBid(' + item.bidNtceNo + ", 'Rebid'" + ')">내용보기</a>';
					break;
				default:
					html += '';
					break;
			}
			html += '</div>';
			html += '</li>';	
		}
	} else {
		html += '<li class="message"> 데이터가 존재하지 않습니다. </li>';
	}
	table.html(html);
	// close loadingBox
	$('#loadingBox').hide();
}

/*
 * progrsDivCdNm(개찰결과)별 링크 클릭시 데이터 가져오는 함수
 * @param {String} bidNtceNo
 * 
 * @param {String} type ...('Failing', 'Rebid')
 * 유찰사유 modal box open
 */
function openResultBid(bidNtceNo, type) {
	$.ajax({
		url : '/getAjaxData',
		data : {
			getUrl : 'http://apis.data.go.kr/1230000/ScsbidInfoService/getOpengResultListInfo' + type,
			ServiceKey : 'WuNaQTtVX5qa0mJTnEds7zu3pTB1IcHNLMW5iT2Fba3PetWOggKLDHXsq3bgCCaPPytIm%2B36areboI0JTnqvxg%3D%3D',
			pageNo : '1',
			numOfRows : '10',
			bidNtceNo : bidNtceNo,
			type : 'json'
		},
		type : 'GET',
		dataType : 'json',
		success : function(data) {
			if (data.response.header.resultCode == '00' && data.response.body.totalCount > 0) {
				var resultBidBox = $('#resultBid');
				switch(type) {
					case 'Failing':
						$('#resultBidTitle').html('유찰사유');
						$('#reason').html(data.response.body.items[0].nobidRsn);
						break;
					case 'Rebid':
						$('#resultBidTitle').html('재입찰사유');
						$('#reason').html(data.response.body.items[0].rbidRsn);
						break;
				}
			}
		}			
	});
}

/*
 * 상세정보 페이지로 연결할 url 생성
 * @param {Array} itemList data array
 * @param {String} bfSpecRgstNo 
 * @param {String} 연결 url
 */
function getDetailUrl(bfSpecRgstNo) {
	var detail_URL = "http://www.g2b.go.kr:8081/ep/preparation/prestd/preStdDtl.do?preStdRegNo=";
	return detail_URL + bfSpecRgstNo;
}

/*
 * itmeList의 데이터 정제를 위한 filter
 * object의 dminsttNm에 valid_dminsttNm의 문자열이 포함되어있지 않으면 삭제
 * @param {Object} item elements of itmeList 
 * @return {boolean} true면 남김, false면 삭제 
 */
function filterBy_dminsttNm(item) {
	var target = item.dminsttNm;
	var result;
	for (var val of valid_dminsttNm) {
		if (target.trim().indexOf(val) > -1) {
			return true; 
		}
	}
	return false;
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


function compareDESC(a, b) {	// sort function
	let bDate = new Date(b['opengDt']).getTime();
	let aDate = new Date(a['opengDt']).getTime();
	return bDate > aDate ? 1 : -1;
}
function compareASC(a, b) {		// sort function
	let bDate = new Date(b['opengDt']).getTime();
	let aDate = new Date(a['opengDt']).getTime();
	return aDate > bDate ? 1 : -1;
}

var compareFunctionObj = {
	NONE : {
		DESC : compareDESC
		,ASC : compareASC
	}
	,DESC : {
		DESC : function (a, b) {
			if (a['dminsttNm'] < b['dminsttNm']) {
				return 1;
			} else if (a['dminsttNm'] > b['dminsttNm']) {
				return -1;
			} else {
				return compareDESC(a, b);
			}
		},
		ASC : function (a, b) {
			if (a['dminsttNm'] < b['dminsttNm']) {
				return 1;
			} else if (a['dminsttNm'] > b['dminsttNm']) {
				return -1;
			} else {
				return compareASC(a, b);
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
				return compareDESC(a, b);
			}
		},
		ASC : function (a, b) {
			if (a['dminsttNm'] > b['dminsttNm']) {
				return 1;
			} else if (a['dminsttNm'] < b['dminsttNm']) {
				return -1;
			} else {
				return compareASC(a, b);
			}
		}
	}
}


