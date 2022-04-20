package com.nanuri.work.business.member.dto;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonCodeDTO extends CommonDTO {

	private String dsCd;		/* 구분코드 */
	private String dtlDsCd;		/* 상세구분코드 */
	private String dtlCd;		/* 상세코드 */
	private String dsCdNm;		/* 구분코드명 */
	private String dtlDsCdNm;	/* 상세구분코드명 */
	private String dtlCnm;		/* 상세코드명 */
	
}
