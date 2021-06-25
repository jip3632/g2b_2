<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>검색어 관리</title>
	<%@ include file="/WEB-INF/views/include/script.jsp" %>
	<script type="text/javascript" src="${pageContext.request.contextPath }/resources/js/content/searchManage.js"></script>
</head>
<body>
<header>
	<%@ include file="/WEB-INF/views/include/navbar.jsp" %>
</header>
<input id="queryType" type="hidden" value="${queryType}"/> 
<div class="container contentContainer searchMng">
	<table id="searchList">
		<colgroup>
			<c:choose>
				<c:when test="${queryType eq 'inst'}">
					<col width="*">
					<col width="*">
					<col width="*">
				</c:when>
				<c:when test="${queryType eq 'company'}">
					<col width="*">
					<col width="*">
				</c:when>
			</c:choose>
			<col width="120px">
		</colgroup>
		<thead>
			<tr>
				<c:choose>
					<c:when test="${queryType eq 'inst'}">
						<th>기관명</th>
						<th>상위기관</th>
					</c:when>
					<c:when test="${queryType eq 'company'}">
						<th>업체명</th>
					</c:when>
				</c:choose>
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
				<c:choose>
					<c:when test="${queryType eq 'inst'}">
						<div>
							<label for="instNm">기관명</label>
							<input type="text" id="instNm"/>
						</div>
						<div>
							<label for="toplvInstNm">상위기관명</label>
							<input type="text" id="toplvInstNm"/>
						</div>
					</c:when>
					<c:when test="${queryType eq 'company'}">
						<div>
							<label for="companyNm">업체명</label>
							<input type="text" id="companyNm"/>
						</div>
					</c:when>
				</c:choose>
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