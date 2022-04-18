package com.nanuri.work.business.equipment.vo;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EquipmentVO extends CommonDTO{
	private Long seqNo;
	private String eqType;		 /* 상세코드명 */
    private String modlNm;       /* 모델명 */
    private String srlNo;        /* 시리얼번호 */
    private String pyDt;         /* 지급일자 */
	private String userId;		 /* 사용자ID */	

}
