package com.billion21.search.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.billion21.search.service.SearchService;

@Service("SearchService")
public class SearchServiceImpl implements SearchService {
	
	@Resource(name="SearchDAO")
	SearchDAO searchDAO;
	
	@Override
	public List<?> selectSearchTargetList() throws Exception {
		return searchDAO.selectSearchTargetList();
	}
	
	@Override
	public List<?> selectAllSearchList() throws Exception {
		return searchDAO.selectAllSearchList();
	}
}
