<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<!DOCTYPE html>
<html lang="kr">

<head>
	<meta charset="utf-8">
	
	<title>조달청 개찰 상세</title>
	<%@ include file="/WEB-INF/views/include/script.jsp" %>

	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/content/detail/opengDtl.js"></script>
</head>

<body>
<div id="hiddenInfo">
	<input type="hidden" id="bidNtceNo" value="${bidNtceNo }"/>
	<input type="hidden" id="bidType" value="${bidType }"/>
</div>
<div class="container opengInfo">
	<h1>입찰결과</h1>
	<div class="content">
		<div class="header">
			<label>입찰공고번호</label>
			<span id="nbidNtceNo"></span>
			<label>공고명</label>
			<h2 id="bidNtceNm"></h2>
		</div>
	
		
		<div class="section">
			<label>공고기관</label>
			<span id="ntceInsttNm"></span>
			<label>수요기관</label>
			<span id="dminsttNm"></span>
			<label>실제개찰일시</label>
			<span id="opengDt"></span>
			
			<div class="viewOptions">
				<span>
					복수예비가 및 예정가격
					<a class="btn_mdl" href=""><button type="button" class="btn btn-light">보기</button></a>
				</span>
				<span>
					적격심사결과
					<a class="btn_mdl" href=""><button type="button" class="btn btn-light">조회</button></a>
				</span>
			</div>
		</div>
	
		<h3>개찰순위</h3>
		<div class="results">
			<table class="resultTable first-row-danger" id="rankTable">
				<caption>
					<span>개찰순위검색결과리스트</span>
				</caption>
				<thead>
					<tr>
						<th>순위</th>
						<th>사업자등록번호</th>
						<th>업체명</th>
						<th>대표자</th>
						<th>투찰금액(원)</th>
						<th>투찰률(%)</th>
						<th>추첨번호</th>
						<th>투찰일시</th>
						<th>비고</th>
					</tr>
				</thead>
				<tbody>
					<!-- opengDtl.js -->
				</tbody>
			</table>
		</div>
	
	
	
	</div>
</div>
</body>
</html>