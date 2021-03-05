/**
 * for searchMng.jsp
 * 작성자 : 박종일
 */

// ajax test

$(document).ready(function(){
	$.ajax({
		url : '/ajax/selectAllSearchList',
		type : 'GET',
		dataType : 'json',
		success : function(data) {
			if (data.result == 'success') {
				console.log(data.searchList);
			}
		}
	});
});