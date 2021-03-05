package com.billion21.search.service.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository("SearchDAO")
public class SearchDAO  {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<?> selectSearchTargetList() throws Exception {
		return sqlSession.selectList("selectSearchTargetList");
	}
	
	public List<?> selectAllSearchList() throws Exception {
		return sqlSession.selectList("selectAllSearchList");
	}
}
