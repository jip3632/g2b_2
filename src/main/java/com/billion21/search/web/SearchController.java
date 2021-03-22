package com.billion21.search.web;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.billion21.search.service.SearchService;
import com.billion21.search.service.SearchVO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class SearchController {

	@Resource(name="SearchService")
	private SearchService searchService;
	
	@RequestMapping(value="/ajax/selectSearchTargetList")
	public ModelAndView selectSearchTargetList(@RequestParam Map<?, ?> requestMap) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		List<?> item = searchService.selectSearchTargetList();
		
		if (item != null && item.size() > 0) {
			mv.addObject("result", "success");
			mv.addObject("searchList", item);
		} else {
			mv.addObject("result", "fail");
		}
		
		return mv;
	}
	
	@RequestMapping(value="/ajax/selectAllSearchList")
	public ModelAndView selectAllSearchList(@RequestParam Map<?, ?> requestMap) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		List<?> item = searchService.selectAllSearchList();
		
		if (item != null && item.size() > 0) {
			mv.addObject("result", "success");
			mv.addObject("searchList", item);
		} else {
			mv.addObject("result", "fail");
		}

		return mv;
	}
	
	@RequestMapping(value="/ajax/updateSearchList", method=RequestMethod.POST)
	public ModelAndView updateSerachList(@RequestParam Map<?, ?> requestMap) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		String jsonString = (String) requestMap.get("jsonString");
		ObjectMapper mapper = new ObjectMapper();
		List<SearchVO> dataList = mapper.readValue(jsonString, new TypeReference<List<SearchVO>>(){});
		
		/*
		for (SearchVO item : dataList) {
			System.out.println(item.getSn() + " : " + item.getUseAt());
		}*/
		
		int cnt = 0;
		for (SearchVO searchVO : dataList) {
			switch (searchVO.getType()) {
			case "insert":
				cnt += searchService.insertSearchKeyword(searchVO);
				break;
			case "update":
				cnt += searchService.updateSearchKeyword(searchVO);
				break;
			case "delete":
				cnt += searchService.deleteSearchKeyword(searchVO);
				break;
			default:
				break;
			}
		}
		
		if (cnt == dataList.size()) {
			mv.addObject("result", "success");
		} else {
			mv.addObject("result", "fail");
		}
		
		return mv;
	}
}
