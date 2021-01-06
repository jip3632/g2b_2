// 2020.09.02
/*
 * for opengDtl.jsp
 * 작성자 : 박종일
 */

$(document).ready(function(){
	// get bidNtceNo
	let bidNtceNo = $('#bidNtceNo').val();
	// get bidType
	let bidType = $('#bidType').val();
	
	// get ajax data
	doAjaxRequest(bidNtceNo, bidType);
});

/*
 * 데이터를 가져오는 ajax function
 * @param {String} bidNtceNo 공고번호
 * @param {String} bidType 공고타입 (용역 : Servc, 물품 : Thng)
 * @return Object (reseult data)
 */ 
function doAjaxRequest(bidNtceNo, bidType) {
	$.ajax({
		url : '/getAjaxData',
		data : {
			getUrl : 'http://apis.data.go.kr/1230000/ScsbidInfoService/getOpengResultListInfo' + bidType,
			ServiceKey : 'WuNaQTtVX5qa0mJTnEds7zu3pTB1IcHNLMW5iT2Fba3PetWOggKLDHXsq3bgCCaPPytIm%2B36areboI0JTnqvxg%3D%3D',
			pageNo : '1',
			inqryDiv : '4',
			bidNtceNo : bidNtceNo,
			type : 'json'
		},
		type : 'GET',
		dataType : 'json',
		success : function(data) {
			if (data.response.header.resultCode == '00' && data.response.body.totalCount > 0) {
				console.log('success');
				let resultObj = data.response.body.items[0];
				makeTable(resultObj);
			} else {
				alert('데이터가 존재하지  않습니다.');
			}
		}
	});
	
	$.ajax({
		url : '/getAjaxData',
		data : {
			getUrl : 'http://apis.data.go.kr/1230000/ScsbidInfoService/getOpengResultListInfoOpengCompt',
			ServiceKey : 'WuNaQTtVX5qa0mJTnEds7zu3pTB1IcHNLMW5iT2Fba3PetWOggKLDHXsq3bgCCaPPytIm%2B36areboI0JTnqvxg%3D%3D',
			pageNo : '1',
			numOfRows : '100',
			bidNtceNo : bidNtceNo,
			type : 'json'
		},
		type : 'GET',
		dataType : 'json',
		success : function(data) {
			if (data.response.header.resultCode == '00' && data.response.body.totalCount > 0) {
				console.log('success');
				makeRankTable(data.response.body);
			} else {
				alert('데이터가 존재하지  않습니다.');
			}
		}
	});
}

function makeTable(resultObj) {
	// set 입찰공고 번호
	$('#nbidNtceNo').html(resultObj.bidNtceNo + '-' + resultObj.bidNtceOrd);
	// set 공고명
	$('#bidNtceNm').html(resultObj.bidNtceNm);
	// set 공고기관
	$('#ntceInsttNm').html(resultObj.ntceInsttNm);
	// set 수요기관
	$('#dminsttNm').html(resultObj.dminsttNm);
	// set 실제개찰일시
	$('#opengDt').html(resultObj.opengDt);
}

function makeRankTable(resultObj) {
	let items = resultObj.items;
	let totCnt = resultObj.totalCount;
	
	for (var i = 0; i < totCnt; i++) {
		let html = ''; 
		
		html += '<tr>';
		html += '<td><span>' + items[i].opengRank + '</span></td>';
		html += '<td><span>' + items[i].prcbdrBizno + '</span></td>';
		html += '<td><div><span>' + items[i].prcbdrNm + '</span></div></td>';
		html += '<td><span>' + items[i].prcbdrCeoNm + '</span></td>';
		html += '<td><span>' + numberWithCommas(items[i].bidprcAmt) + '</span></td>';
		html += '<td><span>' + items[i].bidprcrt + '</span></td>';
		if (items[i].drwtNo1 && items[i].drwtNo2) {
			html += '<td><span>' + items[i].drwtNo1 + ' ' + items[i].drwtNo2 + '</span></td>';
		} else {
			html += '<td><span>' + ' ' + '</span></td>';
		}
		html += '<td><span>' + items[i].bidprcDt + '</span></td>';
		html += '<td><span>' + items[i].rmrk + '</span></td>';
		html += '</tr>';
		
		$('#rankTable tbody').append(html);
	}
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}