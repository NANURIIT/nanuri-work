package com.nanuri.work.business.member.dto;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EducationDTO extends CommonDTO {

	/* 교육이수 */

	private Long seqNo;			/* 일련번호 */
	private String userId;		/* 사용자ID */
	private String eduNm;		/* 교육명 */
	private String stDt;		/* 시작일 */
	private String edDt;		/* 종료일 */
	private String orgNm;		/* 기관명 */
	
}
