package com.nanuri.work.business.member.dto;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Setter;
import lombok.Getter;

@Getter
@Setter
public class WorkhistoryDTO extends CommonDTO {
	
	/* 회사소속이력 */
	
	private Long seqNo;			/* 일련번호 */
	private String userId;		/* 사용자 ID */
	private String wrkplNm;		/* 근무처 */
	private String encoYm;		/* 입사년월 */
	private String rtrmYm;		/* 퇴사년월 */
	private String dtyNm;		/* 직책 */
	private String chrgBsnNm;	/* 담당업무 */
	
}
