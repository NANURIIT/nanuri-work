package com.nanuri.work.com.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberLevelCode {
	
	/** 윤영자 */
	ADMIN(1, "운영자"), 
	/** 직원 */
	EMPLOYEE(2, "직원"), 
	/** 경영관리 */
	ASSISTANT(3, "경영관리"), 
	/** 프리랜서 */
	FREELANCER(4, "프리랜서"), 
	/** 협력사 */
	PARTNERS(5, "협력사"), 
	/** 기타 */
	ETC(6, "기타");
	
	int level;
	String text;
}
