package com.nanuri.work.business.member.dto;

import com.nanuri.work.business.common.paging.CommonDTO;
import com.nanuri.work.com.code.MemberLevelCode;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO extends CommonDTO {

	private String userId;						/* 사용자ID */
	private String userPassword;				/* 비밀번호 */
	private String blgDsCd;						/* 소속구분 */
	private String blgNm;						/* 소속 */
	private String zip;							/* 우편번호 */
	private String addr;						/* 주소 */
	private String userNm;						/* 이름 */
	private String encoDt;						/* 입사일자 */
	private String rtrmDt;						/* 퇴사일자 */
	/* private String */						/* 소속구분 변경일자 */
	private String dtyNm;						/* 직급 */
	private String telNo;						/* 전화번호 */
	private String rrno;						/* 주민등록번호 */
	private String dutNm;						/* 직무 */
	private String emailAddr;					/* 이메일 */
	private MemberLevelCode userAutrNm;			/* 사용자권한 */
	private String accountActivYn;				/* 계정활성여부 */
	
}
