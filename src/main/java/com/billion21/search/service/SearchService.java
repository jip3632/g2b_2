package com.billion21.search.service;

import java.util.List;

public interface SearchService {

	List<?> selectSearchTargetList() throws Exception;
	
	List<?> selectAllSearchList() throws Exception;
	
	Integer insertSearchKeyword(SearchVO searchVO) throws Exception;
	
	Integer updateSearchKeyword(SearchVO searchVO) throws Exception;
	
	Integer deleteSearchKeyword(SearchVO searchVO) throws Exception;
}
