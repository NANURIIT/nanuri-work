package com.nanuri.work.business.member.dto;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BasicInfoDTO extends CommonDTO {

	/* 기본정보 */
	
	private String userId;			/* 사용자ID */
	private String userNm;			/* 이름 */
	private String rrno;			/* 주민등록번호 */
	private String blgDsCd;			/* 소속구분코드 */
	private String blgNm;			/* 소속 */
	private String dtyNm;			/* 직책 */
	private String dutNm;			/* 직무 */
	private String zip;				/* 우편번호 */
	private String addr;			/* 주소 */
	private String telNo;			/* 전화번호 */
	private String emailAddr;		/* 이메일 */
	private String encoYm;			/* 입사년월 */
	private String rtrmYm;			/* 퇴사년월 */
	private String userAutrNm;		/* 사용자권한 */
	
	
}
