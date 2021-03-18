/**
 * for searchMng.jsp
 * 작성자 : 박종일
 */

// ajax test

$(document).ready(function(){
	makeSearchList();
	
	console.log(getAllKeywordList());
});

$(document).on('click', '#listSave', function(){
	console.log('save');
	
	let dataList = [];
	let rows = $('#searchList tbody tr');
	
	for (let i = 0; i < rows.length; i++) {
		let dataObj = {};
		let row = rows.eq(i);
		dataObj.sn = row.find('td.sn').text();
		dataObj.instNm = row.find('td.instNm').text();
		dataObj.toplvInstNm = row.find('td.toplvInstNm').text();
		dataObj.useAt = row.find('td.useAtRow input[name^="useAt"]:checked').val();
		dataObj.type = row.find('td.type').text();
		dataList.push(dataObj);
	}
	
	console.log(dataList);
	
	$.ajax({
		url : '/ajax/updateSearchList'
		,type : 'POST'
		,data : {
			jsonString : JSON.stringify(dataList)
		}
		,dataType : 'json'
		,cache : false
		,success : function(data) {
			if (data.result == 'success') {
				alert('저장성공');
				makeSearchList();
			}
		}
	});

});

// 검색어 리스트 만들기
function makeSearchList() {
	
	let searchList = getAllKeywordObjList();
	
	let $table = $("#searchList tbody");
	let html = '';
	
	searchList.forEach(function(item){
		html += '<tr class="dataRow">';
		html += '<td class="instNm">' + item.instNm + '</td>';
		html += '<td class="toplvInstNm">' + item.toplvInstNm + '</td>';
		if (item.useAt == 'Y') {
			html += '<td class="useAtRow">';
			html += '<input type="radio" name="useAt' + item.sn + '" value="Y" checked/><label for="useAt">사용</label>';
			html += '<input type="radio" name="useAt' + item.sn + '" value="N"/><label for="useAt">사용안함</label>';
			html += '</td>';
		} else {
			html += '<td class="useAtRow">';
			html += '<input type="radio" name="useAt' + item.sn + '" value="Y"/><label for="useAt">사용</label>';
			html += '<input type="radio" name="useAt' + item.sn + '" value="N" checked/><label for="useAt">사용안함</label>';
			html += '</td>';
		}
		html += '<td class="deleteBtnAtRow"><button class="delete" type="button">삭제</button></td>';
		html += '<td class="sn" style="display:none;">' + item.sn + '</td>';
		html += '<td class="type" style="display:none;">update</td>';
		html += '</tr>';
	});
	
	$table.html(html);
}

$(document).on('click', 'button.delete', function(){
	let $row = $(this).parents('tr');
	$row.find('td.type').html('delete');
	$row.hide();
});

$(document).on('click', 'button#add', function(){
	$('div#addForm').show();
});

$(document).on('click', 'button#close', function(){
	$('div#addForm').hide();
	$('div#addForm').find('input').val('');
});

$(document).on('click', 'button#addKeyword', function(){
	let $updateModal = $('div#addForm');
	let instNm = $updateModal.find('input#instNm').val();
	let toplvInstNm = $updateModal.find('input#toplvInstNm').val();
	
	if (!validateKeyword(instNm)) {
		return false;
	} 
	
	let html = '';
	html += '<tr class="dataRow">';
	html += '<td class="instNm">' + instNm + '</td>';
	html += '<td class="toplvInstNm">' + toplvInstNm + '</td>';
	html += '<td class="useAtRow">';
	html += '<input type="radio" name="useAt' + instNm + '" value="Y" checked/><label for="useAt">사용</label>';
	html += '<input type="radio" name="useAt' + instNm + '" value="N"/><label for="useAt">사용안함</label>';
	html += '</td>';
	html += '<td class="deleteBtnAtRow"><button class="delete" type="button">삭제</button></td>';
	html += '<td class="sn" style="display:none;"></td>';
	html += '<td class="type" style="display:none;">insert</td>';
	html += '</tr>';

	$("#searchList tbody").append(html);
	
	$updateModal.find('input').val('');
	$updateModal.hide();
});

// keyword 검증
function validateKeyword(keyword){
	if (!keyword) {
		alert('기관명을 입력해 주세요');
		return false;
	}
	
	let rows = $('#searchList tbody tr');
	for (let i = 0; i < rows.length; i++) {
		
		let row = rows.eq(i);
		let instNm = row.find('td.instNm').text();
		let type = row.find('td.type').text();
		
		if (type == 'insert' || type == 'update') {
			
			if (!instNm) {
				instNm = row.find('td.instNm').find('input').val()
			}
			
			if (keyword == instNm) {
				alert('이미 사용중인 기관명입니다.');
				return false;
			}
		}
	}
	return true;
}

$(document).on('dblclick', 'td.instNm,td.toplvInstNm', function(){
	console.log('dblclick');
	let text = $(this).text();
	let inputHtml = '<input type="text" name="tempInput" value="' + text + '">';
	$(this).html(inputHtml);
	$(this).find('input').focus();
});

$(document).on('keydown', 'input[name="tempInput"]', function(e){
	console.log('kd');
	if (e.keyCode == 13) {
		let text = $(this).val();
		$(this).parent('td').html(text);
	}
});



