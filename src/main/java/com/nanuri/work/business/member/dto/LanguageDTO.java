package com.nanuri.work.business.member.dto;

import lombok.Setter;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;

@Getter
@Setter
public class LanguageDTO extends CommonDTO {

	/* 외국어 능력 */
	
	private Long seqNo;			/* 일련번호 */
	private String userId;		/* 사용자ID */
	private String frgnNm;		/* 언어 */
	private String prfcnNm;		/* 숙련도 */
	private String etcNm;		/* 기타 */
	
}
