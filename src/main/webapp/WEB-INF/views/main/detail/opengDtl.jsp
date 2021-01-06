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
<div class="opengInfo">
	<div id="hiddenInfo">
		<input type="hidden" id="bidNtceNo" value="${bidNtceNo }"/>
		<input type="hidden" id="bidType" value="${bidType }"/>
	</div>
	<div class='infoleft'>
		<h4>
			<span class='black'>[입찰결과]</span>
		</h4>
	</div>
	<div class="section">
		<table class="table">
			<caption>
				<span>입찰결과 내용표시 테이블</span>
			</caption>
			<colgroup>
				<col class="w20p"/>
				<col class="w30p"/>
				<col class="w20p"/>
				<col class="w30p"/>
			</colgroup>
			<tr>
				<th><div>입찰공고번호</div></th>
				<td><div class="tb_inner" id="nbidNtceNo"></div></td>
				<th><div>참조번호</div></th>
				<td><div class="tb_inner"></div></td>
			</tr>
			<tr>
				<th><div>공고명</div></th>
				<td colspan='3'>
					<div class="tb_inner" id="bidNtceNm">
						안성~구리 건설공사 10공구재생아스콘 구매
					</div>
				</td>
			</tr>
			<tr>
				<th><div>공고기관</div></th>
				<td><div class="tb_inner" id="ntceInsttNm"></div></td>
				<th><div>수요기관</div></th>
				<td><div class="tb_inner" id="dminsttNm"></div></td>
			</tr>
			<tr>
				<th><div>실제개찰일시</div></th>
				<td><div class="tb_inner" id="opengDt"></div></td>
				<th>
					<div>
						복수예비가 및 예정가격
					</div>
				</th>
				<td>
					<div class="tb_inner">
						<a class="btn_mdl" href="">
							<span>보기</span>
						</a>
					</div>
				</td>
			</tr>
			<tr>
				<th><div>적격심사결과</div></th>
				<td colspan='3'>
					<div class="tb_inner">
						<a class="btn_mdl" href="">
							<span>조회</span>
						</a>
					</div>
				</td>
			</tr>

		</table>
	</div>

	<div class="infoleft">
		<h4>
			<span class='black'>[개찰순위]</span> &nbsp;&nbsp;
		</h4>
	</div>
	<div class="results">
		<table class="table-bordered resultTable first-row-danger" id="rankTable">
			<caption>
				<span>개찰순위검색결과리스트</span>
			</caption>
			<thead>
				<tr>
					<th class='w6p'>순위</th>
					<th class='w14p'>사업자등록번호</th>
					<th class='w18p'>업체명</th>
					<th class='w9p'>대표자</th>
					<th class='w13p'>투찰금액(원)</th>
					<th class='w10p'>투찰률(%)</th>
					<th class='w7p'>추첨<br />번호</th>
					<th class='w10p'>투찰일시</th>
					<th class='w15p'>비고</th>
				</tr>
			</thead>
			<tbody>
				<!-- opengDtl.js -->
			</tbody>
		</table>
	</div>
</div>
</body>
</html>