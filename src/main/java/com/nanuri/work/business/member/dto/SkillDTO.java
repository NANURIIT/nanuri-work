package com.nanuri.work.business.member.dto;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SkillDTO extends CommonDTO {

	private Long seqNo;
	private String userId;
	private String langFeldNm;
	private String prfcnNm;
	private String etcNm;
	
}
