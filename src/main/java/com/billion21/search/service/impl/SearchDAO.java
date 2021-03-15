package com.billion21.search.service.impl;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.billion21.search.service.SearchVO;

@Repository("SearchDAO")
public class SearchDAO  {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<?> selectSearchTargetList() throws Exception {
		return sqlSession.selectList("selectSearchTargetList");
	}
	
	/**
	 * 모든 검색어 리스트 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	public List<?> selectAllSearchList() throws Exception {
		return sqlSession.selectList("selectAllSearchList");
	}
	
	/**
	 * 검색어 추가
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer insertSearchKeyword(SearchVO searchVO) throws Exception {
		return sqlSession.insert("insertSearchKeyword", searchVO);
	}
	
	/**
	 * 검색어 수정
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer updateSearchKeyword(SearchVO searchVO) throws Exception {
		return sqlSession.update("updateSearchKeyword", searchVO);
	}
	
	/**
	 * 검색어 삭제
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer deleteSearchKeyword(SearchVO searchVO) throws Exception {
		return sqlSession.delete("deleteSearchKeyword", searchVO);
	}
}
