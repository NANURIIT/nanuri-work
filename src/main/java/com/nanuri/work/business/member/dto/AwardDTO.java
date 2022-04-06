package com.nanuri.work.business.member.dto;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AwardDTO extends CommonDTO {

	/* 대내외 수상경력 */
	
	private Long seqNo;			/* 일련번호 */
	private String userId;		/* 사용자ID */
	private String przNm;		/* 포상명 */
	private String przDt;		/* 포상일자 */
	private String przOrgNm;	/* 포상기관 */
	private String etcNm;		/* 기타 */
	
}
