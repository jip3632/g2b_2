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
	
	// 기관관리
	/**
	 * 사용여부 Y 기관만
	 * @return List<?>
	 * @throws Exception
	 */
	@Override
	public List<?> selectAvailableSearchInsttList() throws Exception {
		return searchDAO.selectAvailableSearchInsttList();
	}
	
	/**
	 * 모든 검색어 리스트 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	@Override
	public List<?> selectAllSearchInsttList() throws Exception {
		return searchDAO.selectAllSearchInsttList();
	}
	
	/**
	 * 검색어 추가
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	@Override
	public Integer insertSearchInstt(SearchVO searchVO) throws Exception {
		return searchDAO.insertSearchInstt(searchVO);
	}
	
	/**
	 * 검색어 수정
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	@Override
	public Integer updateSearchInstt(SearchVO searchVO) throws Exception {
		return searchDAO.updateSearchInstt(searchVO);
	}
	
	/**
	 * 검색어 삭제
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	@Override
	public Integer deleteSearchInstt(SearchVO searchVO) throws Exception {
		return searchDAO.deleteSearchInstt(searchVO);
	}
	
	// 업체 관리
	// 업체 검색
	/**
	 * 사용여부 Y 업체만 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	public List<?> selectAvailableSearchCompanyList() throws Exception {
		return searchDAO.selectAvailableSearchCompanyList();
	}
	
	/**
	 * 모든 업체 리스트 가져오기
	 * @return List<?>
	 * @throws Exception
	 */
	public List<?> selectAllSearchCompanyList() throws Exception {
		return searchDAO.selectAllSearchCompanyList();
	}
	
	/**
	 * 업체 추가
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer insertSearchCompany(SearchVO searchVO) throws Exception {
		return searchDAO.insertSearchCompany(searchVO);
	}
	
	/**
	 * 업체 수정
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer updateSearchCompany(SearchVO searchVO) throws Exception {
		return searchDAO.updateSearchCompany(searchVO);
	}
	
	/**
	 * 업체삭제
	 * @param serachMap
	 * @return Integer
	 * @throws Exception
	 */
	public Integer deleteSearchCompany(SearchVO searchVO) throws Exception {
		return searchDAO.deleteSearchCompany(searchVO);
	}
}
