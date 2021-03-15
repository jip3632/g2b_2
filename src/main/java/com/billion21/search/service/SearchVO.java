package com.billion21.search.service;

public class SearchVO {
	
	/* Field */
	private String sn;			// 기관코드
	private String instNm;			// 기관명
	private String toplvInstNm;		// 최상위기관이름
	private String useAt;			// 사용여부
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
	
	public String getType() { return type;}

	public void setType(String type) { this.type = type;}	
	
}
