/**
 * 검색어 리스트 ajax
 * 작성자 : 박종일
 */

/**
 * 모든 keyword obj list
 * @returns {Array} list
 */
function getAllKeywordObjList(){
	
	let list = [];
	
	$.ajax({
		url : '/ajax/selectAllSearchList',
		type : 'GET',
		dataType : 'json',
		async : false,
		cache : false,
		success : function(data) {
			if (data.result == 'success') {
				list = data.searchList;
			}
		}
	});
	
	return list;
}

/**
 * 모든 keyword string list
 * @returns {Array} list
 */
function getAllKeywordList(){
	
	let list = [];
	
	$.ajax({
		url : '/ajax/selectSearchTargetList',
		type : 'GET',
		dataType : 'json',
		async : false,
		cache : false,
		success : function(data) {
			if (data.result == 'success') {
				data.searchList.forEach(function(item){
					list.push(item.instNm);
				});
			}
		}
	});

	return list;
}

/**
 * 검색요청 보낼 keyword obj list (상급기관)
 * @returns {Array} list
 */
function getKeywordObjForSearchList() {
	let list = null;
	
	$.ajax({
		url : '/ajax/selectSearchTargetList',
		type : 'GET',
		dataType : 'json',
		async : false,
		cache : false,
		success : function(data) {
			if (data.result == 'success') {
				list = data.searchList;
			}
		}
	});
	
	return list;
	
}
