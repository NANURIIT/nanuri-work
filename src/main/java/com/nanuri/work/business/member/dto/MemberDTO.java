package com.nanuri.work.business.member.dto;

import com.nanuri.work.com.code.MemberLevelCode;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {

	private String userId;				/* 사용자ID */
	private String userPassword;		/* 비밀번호 */
	private String userNm;				/* 이름 */
	private String telNo;				/* 전화번호 */
	private MemberLevelCode userAutrNm;			/* 사용자권한 */
	private String accountActivYn;		/* 계정활성여부 */
	
}
