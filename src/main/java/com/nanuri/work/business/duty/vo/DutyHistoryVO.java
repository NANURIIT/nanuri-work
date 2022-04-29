package com.nanuri.work.business.duty.vo;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DutyHistoryVO extends CommonDTO {

	private Long seqNo;				/* 일련번호 */
	private String userId;			/* 사용자ID */
	private String userNm;			/* 이름 */
	private String telNo;			/* 전화번호 */
	private String dtyNm;			/* 직급 */
	private String blgNm;			/* 소속 */
	private String basDt;			/* 기준일자 */
	private String svceFormCd;		/* 근무형태코드 */
	private String svceFormCdNm;	/* 근태구분 */
	private String sbtAftVctnDys;	/* 차감후 휴가일수 */
	private String stDt;			/* 시작일자 */
	private String stTm;			/* 시작시각 */
	private String edDt;			/* 종료일자 */
	private String edTm;			/* 종료시각 */
	private String prd;				/* 전체 기간 일수 */
	private String rgDtm;			/* 상신일시 */
	private String dczStsCd;		/* 결재상태 */
	private String dczStsCdnm;		/* 결재상태명 */
	private String dczDtm;			/* 결재일시 */
	private String dczmnId;			/* 결재자 이름 */
	
}
