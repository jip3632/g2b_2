<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="kr">

<head>
	<meta charset="utf-8">
	
	<title>조달청 입찰 공고</title>
	<%@ include file="/WEB-INF/views/include/script.jsp" %>
	
	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/content/gonggo.js"></script>
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
		<div class="form-group col-3">
			<label for="bidSelector">용역구분</label>
			<select class="form-control" id="bidSelector">
				<option value="Servc" selected="selected">용역</option>
				<option value="Thng">물품</option>
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
				<th class="w10p">입찰공고번호</th>
				<th class="w6p">차수</th>
				<th class="w42p">입찰공고명</th>
				<th class="w25p">
					<select class="selector form-control" id="orgSelector">
						<option value="전체선택" selected="selected">수요기관(전체)</option>
					</select>
				</th>
				<th class="w17p">
					<select class="selector form-control" id="orderSelector">
						<option value="DESC" selected="selected">입찰공고일시▼</option>
						<option value="ASC">입찰공고일시▲</option>
					</select>
				</th>
			</tr>
		</thead>
		<tbody id="itemList">
			<tr>
				<th id="nodata" colspan="5"> 데이터가 존재하지 않습니다. </th>
			<tr>
		<!-- sajhen.js 에서 생성 -->	 	
		</tbody>
	</table>
	<%@ include file="/WEB-INF/views/include/loadingBox.jsp" %>
	
	<button class="btn btn-primary" id="MOVE_TOP_BTN"><i class="fas fa-2x fa-angle-double-up"></i></button>
</div>
</body>

</html>