package com.nanuri.work.business.duty.dto;

import lombok.Setter;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;

@Getter
@Setter
public class DutyHistoryDTO extends CommonDTO {

	private Long seqNo;					/* 일련번호 */
	private String userId;				/* 사용자ID */
	private String basDt;				/* 기준일자 */
	private String svceFormCd;			/* 근무형태코드 */
	private String stDt;				/* 시작일자 */
	private String stTm;				/* 시작시각 */
	private String aawBtnClkDtm;		/* 출근버튼클릭일시 */
	private String edDt;				/* 종료일자 */
	private String edTm;				/* 종료시각 */
	private String ckofBtnClkDtm;		/* 퇴근버튼클릭일시 */
	private String sbtNum;				/* 차감숫자 */
	private String svcePrjtTxt;			/* 근무프로젝트txt */
	private String rsnTxt;				/* 사유txt */
	private String dczStsCd;			/* 결재상태코드 */
	private String dczmnId;				/* 결재자ID */
	private String dczDtm;				/* 결재일시 */
	
}
