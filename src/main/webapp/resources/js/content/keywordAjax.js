/**
 * 검색어 리스트 ajax
 * 작성자 : 박종일
 */


var KeywordAjax = {
	/**
	 * all search keyword obj list
	 * @parameter {String} queryTarget
	 * @returns {Array} list
	 */
	getAllSearchList : function(queryTarget) {
		let list = [];
		$.ajax({
			url : '/ajax/selectAllSearchList/' + queryTarget,
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
	 * available search keyword list
	 * @parameter {String} queryTarget
	 * @parameter {String} dataType
	 * @returns {Array} list
	 */
	,getAvailableSearchList : function (queryTarget, dataType) {
		let list = [];
		
		$.ajax({
			url : '/ajax/selectAvailableSearchList/' + queryTarget,
			type : 'GET',
			dataType : 'json',
			async : false,
			cache : false,
			success : function(data) {
				if (data.result == 'success') {
					switch (dataType) {
					case 'string':
						data.searchList.forEach(function(item){
							list.push(item[queryTarget + 'Nm']);
						});
						break;
					case 'object':
						list = data.searchList;
						break;
					default:
						break;
					}

				}
			}
		});
		return list;
	}
	,updateSearchList : function (queryTarget, dataList) {
		$.ajax({
			url : '/ajax/updateSearchList/' + queryTarget
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
	}
}
