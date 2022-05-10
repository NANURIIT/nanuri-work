package com.nanuri.work.business.member.vo;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeVO extends CommonDTO {

	/* 직원목록 리스트 */
	
	private String userId;				/* 사용자 ID */
	private String userNm;				/* 이름 */
	private String dtyNm;				/* 직급 */
	private String telNo;				/* 전화번호 */
	private String emailAddr;			/* 이메일 주소 */
	private String schoolCareer;		/* 학력 */
	private String addr;				/* 주소 */
	private String lastModifyDate;		/* 프로젝트 이력 기준 최종 수정일 */
	
}
