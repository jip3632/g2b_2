<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>검색어 관리</title>
	<%@ include file="/WEB-INF/views/include/script.jsp" %>
	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/content/searchMng.js"></script>
</head>
<body>
<header>
	<%@ include file="/WEB-INF/views/include/navbar.jsp" %>
</header>
<div class="container contentContainer searchMng">
	<!-- <div class="filterAndSort">
		<select class="selector form-control" id="orgSelector">
			<option value="전체선택" selected="selected">수요기관(전체)</option>
		</select>
		<select class="selector form-control" id="orderSelector">
			<option value="DESC" selected="selected">사전규격공개일시▼</option>
			<option value="ASC">사전규격공개일시▲</option>
		</select>
		<ul class="orderSelector">
			<li class="selected" data-value="DESC" role="button">사전규격 공개일시 <span>최신순</span></li>
			<li data-value="ASC" role="button">사전규격 공개일시 <span style="letter-spacing: -1px;">오래된순</span></li>
		</ul>
	</div> -->
	<table id="searchList">
		<colgroup>
			<col width="*">
			<col width="*">
			<col width="*">
			<col width="120px">
		</colgroup>
		<thead>
			<tr>
				<th>기관명</th>
				<th>상위기관</th>
				<th>사용여부</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
		</tbody>
	</table>
	
	<div class="floatedBtns">
		<button type="button" id="add">검색어추가</button>
		<button type="button" id="listSave">저장</button>
	</div>
</div>

<!-- modalBox -->
<div class="modal" id="addForm" tabindex="-1" role="dialog" aria-labelledby="resultBid" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered modal-sm" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">검색어 추가</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="modal-body">
				<div>
					<label for="instNm">기관명</label>
					<input type="text" id="instNm"/>
				</div>
				<div>
					<label for="toplvInstNm">상위기관명</label>
					<input type="text" id="toplvInstNm"/>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-primary" data-dismiss="modal" id="addKeyword">추가</button>
				<button type="button" class="btn btn-secondary" data-dismiss="modal" id="close">닫기</button>
			</div>
		</div>
	</div>
</div>


</body>
</html>