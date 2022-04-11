package com.nanuri.work.business.member.vo;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeVO extends CommonDTO {

	/* 직원목록 리스트 */
	
	private String userId;
	private String userNm;
	private String dtyNm;
	private String telNo;
	private String emailAddr;
	private String dtlCnm;
	private String addr;
	
}
