package com.nanuri.work.business.common.paging;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Criteria {
	
	/** 현재 페이지 번호 */
	private int thisPageNo;

	/** 페이지당 출력할 데이터 개수 */
	private int pageDivNo;

	/** 화면 하단에 출력할 페이지 사이즈 */
	private int pageViewNo;

	/** 검색 키워드 */
	private String searchKeyword;

	/** 검색 유형 */
	private String searchType;
	
	/** 게시판 검색 날짜 유형 */
	private String searchDateType;
	
	/** 근태 검색 기준년도 */
	private String searchDate;
	
	public Criteria() {
		this.thisPageNo = 1;
		this.pageDivNo = 10;
		this.pageViewNo = 5;
	}

//	public String makeQueryString(int pageNo) {
//
//		UriComponents uriComponents = UriComponentsBuilder.newInstance()
//				.queryParam("thisPageNo", pageNo)
//				.queryParam("pageDivNo", pageDivNo)
//				.queryParam("pageViewNo", pageViewNo)
//				.queryParam("searchType", searchType)
//				.queryParam("searchKeyword", searchKeyword)
//				.build()
//				.encode();
//
//		return uriComponents.toUriString();
//	}

}
