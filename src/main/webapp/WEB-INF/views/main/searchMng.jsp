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
<div class="container contentContainer">
	<form class="search">
		<div class="form-group period">
			<label for="startDate">사전규격 공개일시</label>
			<div class="row" style="position:relative;">
				<div class="col-6">
					<input type="date" class="form-control" id="startDate" name="startDate">
				</div>
				<div class="tilde">~</div>
				<div class="col-6">
					<input type="date" class="form-control" id="endDate" name="endDate">
				</div>
			</div>
		</div>
		<div class="form-group radio">
			<label for="bidSelector">용역구분</label>
			<select class="form-control" id="bidSelector">
				<option value="Servc" selected="selected">용역</option>
				<option value="Thng">물품</option>
			</select>
			<ul>
				<li>용역</li>
				<li>물품</li>
			</ul>
		</div>
		<button type="button" class="btn btn-primary" id="search">조회하기</button>
	</form>
	
	<div class="content">
		<div class="filterAndSort">
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
		</div>
		<ul class="resultList sajhen" id="itemList">
			<li>
				<div class="titleArea">
					<label>기관명</label>
					<h3 class="title">해양수산청</h3>
				</div>
				<div class="infoArea">
					<ul>
						<li>사용</li>
						<li>미사용</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</div>
</body>




</html>