/**
 * for searchMng.jsp
 * 작성자 : 박종일
 */


// general variable
var queryType = null

$(document).ready(function(){
	queryType = $('#queryType').val();
	makeSearchList();
	//console.log(getAllKeywordList());
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
		dataObj.companyNm = row.find('td.companyNm').text();
		dataObj.useAt = row.find('td.useAtRow input[name^="useAt"]:checked').val();
		dataObj.type = row.find('td.type').text();
		dataList.push(dataObj);
	}
	
	console.log(dataList);
	
	KeywordAjax.updateSearchList(queryType, dataList);
});

// 검색어 리스트 만들기
function makeSearchList() {
	
	let searchList = KeywordAjax.getAllSearchList(queryType);
	
	let $table = $("#searchList tbody");
	let html = '';
	
	searchList.forEach(function(item){
		html += '<tr class="dataRow">';
		switch (queryType) {
		case 'inst':
			html += '<td class="toggleInput instNm">' + item.instNm + '</td>';
			html += '<td class="toggleInput toplvInstNm">' + item.toplvInstNm + '</td>';
			break;
		case 'company':
			html += '<td class="toggleInput companyNm">' + item.companyNm + '</td>';
			break;
		default:
			break;
		}
		if (item.useAt == 'Y') {
			html += '<td class="useAtRow">';
			html += '<div><input type="radio" name="useAt' + item.sn + '" value="Y" checked/><label for="useAt">사용</label></div>';
			html += '<div><input type="radio" name="useAt' + item.sn + '" value="N"/><label for="useAt">사용안함</label></div>';
			html += '</td>';
		} else {
			html += '<td class="useAtRow">';
			html += '<div><input type="radio" name="useAt' + item.sn + '" value="Y"/><label for="useAt">사용</label></div>';
			html += '<div><input type="radio" name="useAt' + item.sn + '" value="N" checked/><label for="useAt">사용안함</label></div>';
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
	let companyNm = $updateModal.find('input#companyNm').val();
	
	let keyword = (queryType == 'inst') ? instNm : companyNm;
	if (!validateKeyword(keyword)) {
		return false;
	} 
	
	let html = '';
	html += '<tr class="dataRow">';
	switch (queryType) {
	case 'inst':
		html += '<td class="toggleInput instNm">' + instNm + '</td>';
		html += '<td class="toggleInput toplvInstNm">' + toplvInstNm + '</td>';
		html += '<td class="useAtRow">';
		html += '<div><input type="radio" name="useAt' + instNm + '" value="Y" checked/><label for="useAt">사용</label></div>';
		html += '<div><input type="radio" name="useAt' + instNm + '" value="N"/><label for="useAt">사용안함</label></div>';
		html += '</td>';
		break;
	case 'company':
		html += '<td class="toggleInput companyNm">' + companyNm + '</td>';
		html += '<td class="useAtRow">';
		html += '<div><input type="radio" name="useAt' + companyNm + '" value="Y" checked/><label for="useAt">사용</label></div>';
		html += '<div><input type="radio" name="useAt' + companyNm + '" value="N"/><label for="useAt">사용안함</label></div>';
		html += '</td>';
		break;
	default:
		break;
	}
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
		let companyNm = row.find('td.companyNm').text();
		let type = row.find('td.type').text();
		
		if (type == 'insert' || type == 'update') {
			
			if (!instNm) {
				instNm = row.find('td.instNm').find('input').val()
			}
			
			if (keyword == instNm || keyword == companyNm) {
				alert('이미 사용중인 기관명입니다.');
				return false;
			}
		}
	}
	return true;
}

$(document).on('dblclick', 'td.toggleInput', function(){
	//console.log('dblclick');
	let text = $(this).text();
	let inputHtml = '<input type="text" name="tempInput" value="' + text + '">';
	$(this).html(inputHtml);
	$(this).find('input').focus();
});

$(document).on('keydown', 'input[name="tempInput"]', function(e){
	//console.log('kd');
	if (e.keyCode == 13) {
		let text = $(this).val();
		$(this).parent('td').html(text);
	}
});



