package com.billion21.search.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.billion21.search.service.SearchService;
import com.billion21.search.service.SearchVO;

@Service("SearchService")
public class SearchServiceImpl implements SearchService {
	
	@Resource(name="SearchDAO")
	SearchDAO searchDAO;
	
	@Override
	public List<?> selectSearchTargetList() throws Exception {
		return searchDAO.selectSearchTargetList();
	}
	
	/**
	 * 모든 검색어 리스트 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	@Override
	public List<?> selectAllSearchList() throws Exception {
		return searchDAO.selectAllSearchList();
	}
	
	/**
	 * 검색어 추가
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	@Override
	public Integer insertSearchKeyword(SearchVO searchVO) throws Exception {
		return searchDAO.insertSearchKeyword(searchVO);
	}
	
	/**
	 * 검색어 수정
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	@Override
	public Integer updateSearchKeyword(SearchVO searchVO) throws Exception {
		return searchDAO.updateSearchKeyword(searchVO);
	}
	
	/**
	 * 검색어 삭제
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	@Override
	public Integer deleteSearchKeyword(SearchVO searchVO) throws Exception {
		return searchDAO.deleteSearchKeyword(searchVO);
	}
}
