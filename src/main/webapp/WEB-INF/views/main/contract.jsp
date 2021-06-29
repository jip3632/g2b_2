<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="kr">

<head>
	<meta charset="utf-8">
	
	<title>조달청 계약 정보</title>
	<%@ include file="/WEB-INF/views/include/script.jsp" %>
	
	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/content/contract.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/util/tablePageUtil.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/util/localStorage.js"></script>
</head>

<body>
<header>
	<%@ include file="/WEB-INF/views/include/navbar.jsp" %>
</header>
<input id="storageKey" type="hidden" value="${storageKey }">
<div class="container contentContainer">
	<form class="search">
		<div class="form-group period">
			<label for="startDate">계약일자</label>
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
		<div class="form-group radio">
			<label for="dateTypeSelector">조회기준</label>
			<select class="form-control" id="dateTypeSelector">
				<option value="PPSSrch" selected="selected">계약일</option>
				<option value="">등록일</option>
			</select>
			<ul>
				<li>계약일</li>
				<li>등록일</li>
			</ul>
		</div>
		<div class="form-group radio">
			<label for="searchTypeSelector">검색기준</label>
			<select class="form-control" id="searchTypeSelector">
				<option value="org" selected="selected">수요기관</option>
				<option value="company">계약업체</option>
			</select>
			<ul>
				<li data-value="org">수요기관</li>
				<li data-value="company">계약업체</li>
			</ul>
		</div>
		<button type="button" class="btn btn-primary" id="search">조회하기</button>
	</form>
	
	<div class="content">
		<div class="filterAndSort">
			<select class="selector form-control" id="orgSelector">
				<option value="ALL" selected="selected">수요기관(전체)</option>
			</select>
			<select class="selector form-control" id="companySelector">
				<option value="ALL" selected="selected">계약업체(전체)</option>
			</select>
			<ul class="orderSelector" id="dateOrder">
				<li class="selected" data-value="DESC" role="button">계약일자 <span>최신순</span></li>
				<li data-value="ASC" role="button">계약일자 <span style="letter-spacing: -1px;">오래된순</span></li>
			</ul>
			<ul class="orderSelector" id="insttOrder">
				<li class="selected" data-value="NONE" role="button">기관명 <span>사용안함</span></li>
				<li data-value="DESC" role="button">기관명 <span>내림차순</span></li>
				<li data-value="ASC" role="button">기관명 <span style="letter-spacing: -1px;">오름차순</span></li>
			</ul>
		</div>
		<ul class="resultList contract" id="itemList">
			<li class="message">자료를 조회해주세요.</li>
		</ul>
	</div>
</div>

<%@ include file="/WEB-INF/views/include/loadingBox.jsp" %>
<button class="btn btn-primary" id="MOVE_TOP_BTN"><i class="fas fa-2x fa-angle-double-up"></i></button>

</body>
</html>