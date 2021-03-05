package com.billion21.search.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.billion21.search.service.SearchService;

@Controller
public class SearchController {

	@Resource(name="SearchService")
	private SearchService searchService;
	
	@RequestMapping(value="/ajax/selectSearchTargetList")
	public ModelAndView selectSearchTargetList(@RequestParam Map<?, ?> requestMap) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		List<?> item = searchService.selectSearchTargetList();
		
		mv.addObject("searchList", item);
		
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
	
}
