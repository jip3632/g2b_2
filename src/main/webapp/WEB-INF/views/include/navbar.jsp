<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="container">
<nav class="navbar navbar-expand-md">
	<!-- 로고 -->
	<a class="navbar-brand logo" href="#">조달청 정보조회</a>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	</button>
	<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
		<div class="navbar-nav">
			<%-- <a class="nav-item nav-link main" href="${pageContext.request.contextPath }/sajhen"><i class="fas fa-home"></i> 메인</a> --%>
	    	<a class="nav-item nav-link sajhen" href="${pageContext.request.contextPath }/sajhen">사전 규격</a>
	    	<a class="nav-item nav-link gonggo" href="${pageContext.request.contextPath }/gonggo">입찰 공고</a>
	    	<a class="nav-item nav-link contract" href="${pageContext.request.contextPath }/contract">계약 정보</a>
	    	<a class="nav-item nav-link openBids" href="${pageContext.request.contextPath }/openBids">개찰 정보</a>
	    	<a class="nav-item nav-link searchManage" href="${pageContext.request.contextPath }/searchManage">검색 관리</a>
		</div>
	</div>
</nav>
</div>
<script language="javascript">
window.addEventListener('DOMContentLoaded', function(){
	var thisfilefullname = document.URL.substring(document.URL.lastIndexOf('/') + 1, document.URL.length);
	var thisfilename = thisfilefullname.substring(thisfilefullname.lastIndexOf('.'), 0);
	
	if(thisfilename){
		var currentMenu = document.querySelector('.nav-item.'+thisfilename);
	} else {
		var currentMenu = document.querySelector('.nav-item.'+thisfilefullname);
	}
	$(currentMenu).addClass('active');
});
</script>