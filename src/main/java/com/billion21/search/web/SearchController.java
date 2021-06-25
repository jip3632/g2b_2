package com.billion21.search.web;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	// 검색 기관 리스트 ajax
	@RequestMapping(value="/ajax/selectAvailableSearchList/{queryTarget}")
	public ModelAndView selectSearchTargetList(@PathVariable("queryTarget") String queryTarget, @RequestParam Map<?, ?> requestMap) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		List<?> item = null;
		switch (queryTarget) {
		case "inst":
			item = searchService.selectAvailableSearchInsttList();
			break;
		case "company":
			item = searchService.selectAvailableSearchCompanyList();
			break;
		default :
			break;
		}
		
		if (item != null && item.size() > 0) {
			mv.addObject("result", "success");
			mv.addObject("searchList", item);
		} else {
			mv.addObject("result", "fail");
		}
		
		return mv;
	}
	
	// 모든 검색 기관 리스트 ajax
	@RequestMapping(value="/ajax/selectAllSearchList/{queryTarget}")
	public ModelAndView selectAllSearchList(@PathVariable("queryTarget") String queryTarget, @RequestParam Map<?, ?> requestMap) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		List<?> item = null;
		switch (queryTarget) {
		case "inst":
			item = searchService.selectAllSearchInsttList();
			break;
		case "company":
			item = searchService.selectAllSearchCompanyList();
			break;
		default :
			break;
		}
		
		if (item != null && item.size() > 0) {
			mv.addObject("result", "success");
			mv.addObject("searchList", item);
		} else {
			mv.addObject("result", "fail");
		}

		return mv;
	}
	
	// 검색 기관 수정
	@RequestMapping(value="/ajax/updateSearchList/{queryTarget}", method=RequestMethod.POST)
	public ModelAndView updateSerachList(@PathVariable("queryTarget") String queryTarget, @RequestParam Map<?, ?> requestMap) throws Exception {
		ModelAndView mv = new ModelAndView("jsonView");
		
		String jsonString = (String) requestMap.get("jsonString");
		ObjectMapper mapper = new ObjectMapper();
		List<SearchVO> dataList = mapper.readValue(jsonString, new TypeReference<List<SearchVO>>(){});
		
		
/*		for (SearchVO item : dataList) {
			System.out.println(item.toString());
		}*/
		
		int cnt = 0;
		
		switch (queryTarget) {
		case "inst":
			for (SearchVO searchVO : dataList) {
				switch (searchVO.getType()) {
				case "insert":
					cnt += searchService.insertSearchInstt(searchVO);
					break;
				case "update":
					cnt += searchService.updateSearchInstt(searchVO);
					break;
				case "delete":
					cnt += searchService.deleteSearchInstt(searchVO);
					break;
				default:
					break;
				}
			}
			break;
		case "company":
			for (SearchVO searchVO : dataList) {
				switch (searchVO.getType()) {
				case "insert":
					cnt += searchService.insertSearchCompany(searchVO);
					break;
				case "update":
					cnt += searchService.updateSearchCompany(searchVO);
					break;
				case "delete":
					cnt += searchService.deleteSearchCompany(searchVO);
					break;
				default:
					break;
				}
			}
			break;
		default :
			break;
		}
		
		if (cnt == dataList.size()) {
			mv.addObject("result", "success");
		} else {
			mv.addObject("result", "fail");
		}
		
		return mv;
	}

}
