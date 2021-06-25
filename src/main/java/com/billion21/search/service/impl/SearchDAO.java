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
	
	// 기관 검색
	/**
	 * 사용여부 Y 기관만
	 * @return List<?>
	 * @throws Exception
	 */
	public List<?> selectAvailableSearchInsttList() throws Exception {
		return sqlSession.selectList("selectAvailableSearchInsttList");
	}
	
	/**
	 * 모든 검색 기관 리스트 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	public List<?> selectAllSearchInsttList() throws Exception {
		return sqlSession.selectList("selectAllSearchInsttList");
	}
	
	/**
	 * 검색 기관 추가
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer insertSearchInstt(SearchVO searchVO) throws Exception {
		return sqlSession.insert("insertSearchInstt", searchVO);
	}
	
	/**
	 * 검색 기관 수정
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer updateSearchInstt(SearchVO searchVO) throws Exception {
		return sqlSession.update("updateSearchInstt", searchVO);
	}
	
	/**
	 * 검색 기관 삭제
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer deleteSearchInstt(SearchVO searchVO) throws Exception {
		return sqlSession.delete("deleteSearchInstt", searchVO);
	}
	
	// 업체 검색
	/**
	 * 사용여부 Y 업체만 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	public List<?> selectAvailableSearchCompanyList() throws Exception {
		return sqlSession.selectList("selectAvailableSearchCompanyList");
	}
	
	/**
	 * 모든 업체 리스트 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	public List<?> selectAllSearchCompanyList() throws Exception {
		return sqlSession.selectList("selectAllSearchCompanyList");
	}
	
	/**
	 * 업체 추가
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer insertSearchCompany(SearchVO searchVO) throws Exception {
		return sqlSession.insert("insertSearchCompany", searchVO);
	}
	
	/**
	 * 업체 수정
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer updateSearchCompany(SearchVO searchVO) throws Exception {
		return sqlSession.update("updateSearchCompany", searchVO);
	}
	
	/**
	 * 업체삭제
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer deleteSearchCompany(SearchVO searchVO) throws Exception {
		return sqlSession.delete("deleteSearchCompany", searchVO);
	}
}
