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
<div class="container">
	<%@ include file="/WEB-INF/views/include/navbar.jsp" %>
	<div class="form-row">
		<div class="form-group col-3">
			<label for="startDate">시작일</label>
			<input type="date" class="form-control" id="startDate" name="startDate">
		</div>
		<div class="form-group col-3">
			<label for="endDate">종료일</label>
			<input type="date" class="form-control" id="endDate" name="endDate">
		</div>
		<div class="form-group col-2">
			<label for="bidSelector">용역구분</label>
			<select class="form-control" id="bidSelector">
				<option value="Servc" selected="selected">용역</option>
				<option value="Thng">물품</option>
			</select>
		</div>
		<div class="form-group col-2">
			<label for="dateTypeSelector">조회기준</label>
			<select class="form-control" id="dateTypeSelector">
				<option value="PPSSrch" selected="selected">계약일</option>
				<option value="">등록일</option>
			</select>
		</div>
		<div class="form-group col-1">
			<label for="search">조회</label>
			<button type="button" class="btn btn-primary" id="search">조회</button>
		</div>
	</div>
	<table class="table table-striped resultTable">
		<thead>
			<tr>
				<th class="w12p">입찰공고번호</th>
				<th class="w5p">재입찰<br>번호</th>
				<th class="w25p">공고명</th>
				<th class="w17p">
					<select class="selector form-control" id="orgSelector">
						<option value="전체선택" selected="selected">수요기관(전체)</option>
					</select>
				</th>
				<th class="w13p">
					<select class="selector form-control" id="orderSelector">
						<option value="DESC" selected="selected">개찰일시▼</option>
						<option value="ASC">개찰일시▲</option>
					</select>
				</th>
				<th class="w5p">참가수</th>
				<th class="w15p">낙찰 예정자</th>
				<!-- 
				<th class="col">투찰금액<br>/투찰금리</th>
				<th class="col">투찰률<br>(%)</th>
				 -->
				<th class="w8p"></th>
			</tr>
		</thead>
		<tbody id="itemList">
			<tr>
				<th id="nodata" colspan="8"> 데이터가 존재하지 않습니다. </th>
			<tr>
		<!-- sajhen.js 에서 생성 -->	 	
		</tbody>
	</table>
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

	<%@ include file="/WEB-INF/views/include/loadingBox.jsp" %>
	
	<button class="btn btn-primary" id="MOVE_TOP_BTN"><i class="fas fa-2x fa-angle-double-up"></i></button>
</div>
</body>

</html>