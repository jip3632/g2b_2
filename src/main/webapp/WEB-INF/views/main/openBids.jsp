<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="kr">

<head>
	<meta charset="utf-8">
	
	<title>조달청 개찰 정보</title>
	<%@ include file="/WEB-INF/views/include/script.jsp" %>
	
	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/content/openbids.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/util/tablePageUtil.js"></script>
</head>

<body>
<header>
	<%@ include file="/WEB-INF/views/include/navbar.jsp" %>
</header>
<div class="container contentContainer">
	<form class="search">
		<div class="form-group period">
			<label for="startDate">개찰일시</label>
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
		<button type="button" class="btn btn-primary" id="search">조회하기</button>
	</form>
	
	<div class="content">
		<div class="filterAndSort">
			<select class="selector form-control" id="orgSelector">
				<option value="전체선택" selected="selected">수요기관(전체)</option>
			</select>
			<select class="selector form-control" id="orderSelector">
				<option value="DESC" selected="selected">개찰일시▼</option>
				<option value="ASC">개찰일시▲</option>
			</select>
			<ul class="orderSelector">
				<li class="selected" data-value="DESC" role="button">개찰일시 <span>최신순</span></li>
				<li data-value="ASC" role="button">개찰일시 <span style="letter-spacing: -1px;">오래된순</span></li>
			</ul>
		</div>
		<ul class="resultList openBids" id="itemList">
			<li class="message">자료를 조회해주세요.</li>
		</ul>
		
		<div class="modal" id="resultBid" tabindex="-1" role="dialog" aria-labelledby="resultBid" aria-hidden="true">
			<div class="modal-dialog modal-dialog-centered modal-sm">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="resultBidTitle">유찰사유</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div class="modal-body" id="reason"></div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<%@ include file="/WEB-INF/views/include/loadingBox.jsp" %>
<button class="btn btn-primary" id="MOVE_TOP_BTN"><i class="fas fa-2x fa-angle-double-up"></i></button>
	
</body>
</html>