package com.nanuri.work.business.duty.vo;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DutyHistoryVO extends CommonDTO {

	private String userNm;
	private String dtyNm;
	private String blgNm;
	private String basDt;
	private String svceFormCdNm;
	private String rgDtm;
	private String dczStsCd;
	private String dczStsCdnm;
	private String dczDtm;
	private String dczmnId;
	
}
