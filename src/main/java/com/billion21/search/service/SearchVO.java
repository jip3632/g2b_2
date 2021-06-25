package com.billion21.search.service;

public class SearchVO {
	
	/* Field */
	private String sn;			// 일련번호
	
	// SRCH_SEL
	private String instNm;			// 기관명
	private String toplvInstNm;		// 최상위기관이름
	private String useAt;			// 사용여부
	
	// SRCH_COMPANY
	private String companyNm;		// 업체명
	
	// common
	private String type;			// update 타입

	/* Constructor */
	public SearchVO() {
		super();
	}
	
	/* Getter, Setter */
	public String getSn() { return sn;}

	public void setSn(String sn) {	this.sn = sn;}

	public String getInstNm() {	return instNm;}

	public void setInstNm(String instNm) { this.instNm = instNm;}

	public String getToplvInstNm() { return toplvInstNm;}

	public void setToplvInstNm(String toplvInstNm) { this.toplvInstNm = toplvInstNm;}

	public String getUseAt() { return useAt;}

	public void setUseAt(String useAt) { this.useAt = useAt;}
	
	public String getCompanyNm() { return companyNm; }

	public void setCompanyNm(String companyNm) { this.companyNm = companyNm; }

	public String getType() { return type;}

	public void setType(String type) { this.type = type;}

	@Override
	public String toString() {
		return "SearchVO [sn=" + sn + ", instNm=" + instNm + ", toplvInstNm=" + toplvInstNm + ", useAt=" + useAt
				+ ", companyNm=" + companyNm + ", type=" + type + "]";
	}	
	
}
