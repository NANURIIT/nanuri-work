package com.nanuri.work.business.member.dto;

import lombok.Setter;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;

@Getter
@Setter
public class SchoolCareerDTO extends CommonDTO {

	private Long seqNo;			/* 일련번호 */
	private String userId;		/* 사용자 ID*/
	private String sccaDsCd;	/* 학력구분코드 */
	private String majrNm;		/* 전공 */
	private String schlNm;		/* 학교명 */
	private String etisYm;		/* 입학년월 */
	private String grduYm;		/* 졸업년월 */
	
}
