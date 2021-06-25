package com.billion21.search.service;

import java.util.List;

public interface SearchService {

	// 기관 관리
	/**
	 * 사용여부 Y 기관만
	 * @return List<?>
	 * @throws Exception
	 */
	List<?> selectAvailableSearchInsttList() throws Exception;
	
	/**
	 * 모든 검색 기관 리스트 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	List<?> selectAllSearchInsttList() throws Exception;
	
	/**
	 * 검색 기관 추가
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	Integer insertSearchInstt(SearchVO searchVO) throws Exception;
	
	/**
	 * 검색 기관 수정
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	Integer updateSearchInstt(SearchVO searchVO) throws Exception;
	
	/**
	 * 검색 기관 삭제
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	Integer deleteSearchInstt(SearchVO searchVO) throws Exception;
	
	// 업체 관리
	/**
	 * 사용여부 Y 업체만 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	List<?> selectAvailableSearchCompanyList() throws Exception;
	
	/**
	 * 모든 업체 리스트 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	List<?> selectAllSearchCompanyList() throws Exception;
	
	/**
	 * 업체 추가
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	Integer insertSearchCompany(SearchVO searchVO) throws Exception;
	
	/**
	 * 업체 수정
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	Integer updateSearchCompany(SearchVO searchVO) throws Exception;
	
	/**
	 * 업체삭제
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	Integer deleteSearchCompany(SearchVO searchVO) throws Exception;
}
