package com.nanuri.work.business.common.paging;

import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Criteria {
	
	/** 현재 페이지 번호 */
	private int thisPageNo;	//currentPageNo

	/** 페이지당 출력할 데이터 개수 */
	private int pageDivNo;	//recordsPerPage

	/** 화면 하단에 출력할 페이지 사이즈 */
	private int pageViewNo;		//pageSize

	/** 검색 키워드 */
	private String searchKeyword;

	/** 검색 유형 */
	private String searchType;
	
	/** 검색 날짜 유형 */
	private String searchDateType;
	
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
