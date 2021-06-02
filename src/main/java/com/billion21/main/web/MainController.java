package com.billion21.main.web;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {
	
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String viewDefault(HttpSession session) {
		return "main/sajhen";
	}
	 
	@RequestMapping(value = "/sajhen", method = RequestMethod.GET)
	public String viewSajhen(HttpSession session) {
		return "main/sajhen";
	}
	
	@RequestMapping(value = "/gonggo", method = RequestMethod.GET)
	public String viewGoonggo(HttpSession session) {
		return "main/gonggo";
	}
	
	@RequestMapping(value = "/contract", method = RequestMethod.GET)
	public String viewContract(HttpSession session) {
		return "main/contract";
	}
	
	@RequestMapping(value = "/openBids", method = RequestMethod.GET)
	public String viewOpenBids(HttpSession session) {
		return "main/openBids";
	}
	
	@RequestMapping(value = "/detail/opengDtl/{bidNtceNo}/{bidType}")
	public String viewOpengDtl(@PathVariable("bidNtceNo") String bidNtceNo, @PathVariable("bidType") String bidType, Model model) {
		model.addAttribute("bidNtceNo", bidNtceNo);
		model.addAttribute("bidType", bidType);
		return "main/detail/opengDtl";
	}
	
	@RequestMapping(value = "/searchManage", method = RequestMethod.GET)
	public ModelAndView viewSearchManage(@RequestParam Map<?, ?> requestMap) {
		ModelAndView mv = new ModelAndView("main/searchMng");
		return mv;
	}
	
	/**
	 * 공공데이터  포털 api CORS이슈 회피용 proxy
	 * 2020.08.26 by jongil
	 * request에 ajax보낼 url만 getUrl key의 value로 보내면
	 * 나머지 parameter는 자동적으로 request의 key, value쌍으로 생성하도록 구현함
	 * @param request
	 * @return jsonString
	 */
	@RequestMapping(value= "/getAjaxData", method = RequestMethod.GET, produces = "application/xml; charset=utf-8")
	public @ResponseBody String getAjaxData(HttpServletRequest request) throws Exception {

		// get Parameters
		HashMap<String, String> paramMap = new HashMap<String, String>();
		Enumeration<?> paramNames = request.getParameterNames();
		
		while (paramNames.hasMoreElements()) {
			String key = paramNames.nextElement().toString();
			String value = request.getParameter(key);
			
			paramMap.put(key, value);
		}
		
		// make url
		StringBuilder requestUrl = new StringBuilder();
		
		requestUrl.append(paramMap.get("getUrl") + "?");
		paramMap.remove("getUrl");
		boolean first = true;

		for (Map.Entry<String, String> entry : paramMap.entrySet()) {
			if (first) {
				first = false;
			} else {
				requestUrl.append("&");
			}
			
			String key = entry.getKey();
			String value = entry.getValue();
			
			requestUrl.append(key + "=");
			// 이름인 경우  인코딩
			if (key.contains("Nm")) {
				value = URLEncoder.encode(value, "UTF-8");
			}
			requestUrl.append(value);
		}
		
		// get json data
		URL url = new URL(requestUrl.toString());
		URLConnection connection = url.openConnection();
		
		// error
		HttpURLConnection conn = (HttpURLConnection) connection;
		int errorCode = conn.getResponseCode();
		if (errorCode != 200) {
			System.out.println(errorCode);
			BufferedReader br2 = new BufferedReader(new InputStreamReader(conn.getErrorStream(), "utf-8"));
			String err;
			while((err = br2.readLine()) != null) {
				System.out.println(err.trim());
			}
			return "";
		}
		// api 서버 요청이 많으면 500 error 이슈 회피용 sleep
		Thread.sleep(500);
		
		BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(), "utf-8"));
		String inputLine;
		String jsonStr = "";
		
		// time check
		//long start = System.currentTimeMillis();
		// set json data to String
		while((inputLine = br.readLine()) != null) {
			jsonStr += inputLine.trim();
			//System.out.println(inputLine.trim());
		}
		//long end = System.currentTimeMillis();
		//System.out.println("실행시간 : " + (end - start) / 1000.0);
		
		//System.out.println(jsonStr);
		
		br.close();
		return jsonStr;
	}
}
