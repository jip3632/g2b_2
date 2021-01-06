var xhr_last_num = 0;
var itemList = new Array();
var xhr = {};

function init(){
	
	
	makeInitXhr(xhr_last_num);
	
	xhr[0].onreadystatechange = function(){
		
		if(this.readyState == 4 && this.status == 200){
		
			xmlFunction(this);
			
			
			var sortingField = "bfSpecRgstNo";
			
			var sortedItemList = itemList.sort(function(a, b) { // 내림차순
			    return b[sortingField] - a[sortingField];
			    
			});
			
			for(var i = 0; i < sortedItemList.length-1; i++ ){
				var html = "<tr>"
						 + "<td>"+sortedItemList[i].bfSpecRgstNo+"</td>"
						 + "<td><a href="+sortedItemList[i].detail_URL+" target=\"_blank\">"+sortedItemList[i].prdctClsfcNoNm+"</a></td>"
						 + "<td>"+sortedItemList[i].rlDminsttNm+"</td>"
						 + "<td>"+sortedItemList[i].rgstDt+"</td>"
						 + "</tr>";
				
				$("#itemList").append(html);
				
			}
			console.log(sortedItemList);
			
		}
		
	}

	$("#itemList").append(itemList);
	xhr_last_num = 6;	
	setEvent();
	

}





function makeInitXhr(xhr_last_num){
	
	
	var url = {};
	
	for(var i = xhr_last_num; i< xhr_last_num + 6 ; i++){
	
	xhr[i] = new XMLHttpRequest();
	
	var _today = new Date(); 
	
	
		
		
		function getDateStr(myDate){
			return (myDate.getFullYear() + '' + (myDate.getMonth() + 1).zf(2) + '' + myDate.getDate().zf(2)) +''+"0000"
		}
	
			  var d = new Date();
			  var n = new Date();
			  var dayOfMonth = d.getDate();
			  d.setDate(dayOfMonth - 7);
		var new_S_Date = getDateStr(d)
		
		var new_E_Date = _today.format('yyyyMMddHHmm');	
		
		console.log(new_S_Date);
		console.log(new_E_Date);
		
	
		url[i] ="http://apis.data.go.kr/1230000/HrcspSsstndrdInfoService/getPublicPrcureThngInfoServc?ServiceKey=lZs7i%2FF0hS7LFlHBQCTvUiV%2FF2lzjO%2BwlftX3tOfEp7RHQVbqxSUOEYBvlZHPo2RUt6U5GRIuUTGpqqpIU3pjA%3D%3D&pageNo="+(i+1)+"&inqryDiv=1&numOfRows=999" 
		url[i] = url[i] + "&inqryBgnDt="+ new_S_Date+ "&inqryEndDt=" + new_E_Date;
		
	console.log(url[i]);
		
	xhr[i].open("GET",url[i],true);	
	xhr[i].send();
		
		}
	
	}


function xmlFunction(xml){
	var xmlDoc = xml.responseXML;
	
	
	
	var itemSize = xmlDoc.getElementsByTagName("item").length;
	console.log("size:"+itemSize);
	
	for(var i = 0 ; i < itemSize; i++){
	
	var item = xmlDoc.getElementsByTagName("item")[i];
	var items = xmlDoc.getElementsByTagName("item")[i].childElementCount;
	
		for(var j = 0; j < items; j++){
			
		var tagName = item.childNodes[j].tagName;
	
			if(tagName == "bfSpecRgstNo" ){ //등록 번호
				if(item.childNodes[j].hasChildNodes() == true){
					var bfSpecRgstNo = item.childNodes[j].childNodes[0].nodeValue;
				}else{
					var bfSpecRgstNo = "";
				}
			}
		
			if(tagName == "rgstDt"){ //등록 일시
				if(item.childNodes[j].hasChildNodes() == true){
					var rgstDt = item.childNodes[j].childNodes[0].nodeValue;
				}else{
					var rgstDt = "";
				}
			}
			
			if(tagName == "prdctClsfcNoNm"){ //품명
				if(item.childNodes[j].hasChildNodes() == true){
					var prdctClsfcNoNm = item.childNodes[j].childNodes[0].nodeValue;
				}else{
					var prdctClsfcNoNm = "";
				}
			}
			
			if(tagName == "rlDminsttNm"){ //수요 기관
				if(item.childNodes[j].hasChildNodes() == true){
					var rlDminsttNm = item.childNodes[j].childNodes[0].nodeValue;
				}else{
					var rlDminsttNm = "";
				}
			}
			
		}
		
		
		if(rlDminsttNm.indexOf("해양수산부") > -1

				|| rlDminsttNm.indexOf("국립수산과학원") > -1

				|| rlDminsttNm.indexOf("한국정보화진흥원") > -1

				|| rlDminsttNm.indexOf("농림수산식품교육문화정보원") > -1

				|| rlDminsttNm.indexOf("한국수산자원관리공단") > -1

				|| rlDminsttNm.indexOf("해양환경공단") > -1

				|| rlDminsttNm.indexOf("해양환경관리공단") > -1

				|| rlDminsttNm.indexOf("국립공원관리공단") > -1

				|| rlDminsttNm.indexOf("한국환경공단") > -1

				|| rlDminsttNm.indexOf("한국환경정책평가연구원") > -1

				|| rlDminsttNm.indexOf("국립생태원") > -1

				|| rlDminsttNm.indexOf("한국어촌어항협회") > -1

				|| rlDminsttNm.indexOf("국토교통부") > -1

				|| rlDminsttNm.indexOf("환경부") > -1

				|| rlDminsttNm.indexOf("충청남도 당진시") > -1

				|| rlDminsttNm.indexOf("농림축산식품부") > -1

				|| rlDminsttNm.indexOf("한국농수산식품유통공사") > -1

				|| rlDminsttNm.indexOf("한국농어촌공사") > -1

				|| rlDminsttNm.indexOf("농촌진흥청") > -1

				|| rlDminsttNm.indexOf("한국해양과학기술원") > -1

				|| rlDminsttNm.indexOf("한국해양수산개발원") > -1

				|| rlDminsttNm.indexOf("항로표지기술협회") > -1

				|| rlDminsttNm.indexOf("인천광역시 옹진군") > -1

				|| rlDminsttNm.indexOf("식품의약품안전처") > -1

				|| rlDminsttNm.indexOf("한국저작권위원회") > -1

				|| rlDminsttNm.indexOf("한국임업진흥원") > -1

				|| rlDminsttNm.indexOf("한국석유공사") > -1

				|| rlDminsttNm.indexOf("수협중앙회") > -1

				|| rlDminsttNm.indexOf("충청남도 보령시") > -1

				|| rlDminsttNm.indexOf("경기도 안산시") > -1

				|| rlDminsttNm.indexOf("경기도 군포시") > -1

				|| rlDminsttNm.indexOf("경기도 안양시") > -1

				|| rlDminsttNm.indexOf("경기도 의왕시") > -1

				|| rlDminsttNm.indexOf("국립해양조사원") > -1

				|| rlDminsttNm.indexOf("한국농촌경제연구원") > -1

				|| rlDminsttNm.indexOf("국립농업과학원") > -1

				|| rlDminsttNm.indexOf("서울시") > -1

				|| rlDminsttNm.indexOf("산림청") > -1

				|| rlDminsttNm.indexOf("농업기술실용화재단") > -1

				|| rlDminsttNm.indexOf("한국에너지기술평가원") > -1

				|| rlDminsttNm.indexOf("한국산업기술평가관리원") > -1

				|| rlDminsttNm.indexOf("국립해양박물관") > -1

				|| rlDminsttNm.indexOf("국토지리정보원") > -1

				|| rlDminsttNm.indexOf("국립해양측위정보") > -1

				|| rlDminsttNm.indexOf("한국해양수산연수원") > -1

				|| rlDminsttNm.indexOf("전라남도") > -1

				|| rlDminsttNm.indexOf("한국생명공학연구원") > -1
				
				|| rlDminsttNm.indexOf("경상남도 수산자원연구소") > -1

		){
			var detail_URL = "http://www.g2b.go.kr:8081/ep/preparation/prestd/preStdDtl.do?preStdRegNo=";
				detail_URL = detail_URL + bfSpecRgstNo;
				
			
				
				  
				    
				
				
				
			var itemSource	 =  { "bfSpecRgstNo" : bfSpecRgstNo, "detail_URL" : detail_URL, "prdctClsfcNoNm" : prdctClsfcNoNm, "rlDminsttNm": rlDminsttNm, "rgstDt": rgstDt };
							
			
			itemList.push(itemSource);
		
		}
	}
	
	
} 





function setEvent(){
	
	$("#xhr_btn").off("click");
	$("#xhr_btn").on("click",function(){
		
		
		
	});
	
	
	
	xhr_last_num = xhr_last_num + 6;
	
}