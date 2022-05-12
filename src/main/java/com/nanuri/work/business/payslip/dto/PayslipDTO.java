package com.nanuri.work.business.payslip.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PayslipDTO {
	private String userId; 			/* 사용자ID : 전화번호 */
	private String dtyNm;			/* 직급 */
	private String blgNm;			/* 소속 */
	private String slydt;			/* 급여일자 */
	private String slyKdnm;			/* 급여종류명 */
	private String createAt;		/* 생성일시 */
	private String updateAt;		/* 수정일시 */
	private String pydt;			/* 지급일자 */
	private String bscAm;			/* 기본금액 */
	private String dtyAlwAm;		/* 직책수당금액 */	
	private String xthAlwAm;		/* 연장수당금액 */
	private String hidyAlwAM;		/* 휴일수당금액 */
	private String bonusAm;			/* 상여금액 */
	private String etcAm;			/* 기타금액 */
	private String mealAm;			/* 식사금액 */
	private String trnepAm;			/* 교통비금액 */
	private String wlfrAm;			/* 복리후생금액 */
	private String tmmAm;			/* 당월금액 */
	private String itx;				/* 소득세 */
	private String ihtax;			/* 주민세 */
	private String ntpsAm;			/* 국민연금금액 */
	private String hinsAm;			/* 건강보험금액 */
	private String itrmMdtmtAm;		/* 장기요양금액 */	
	private String emplInsAm;		/* 고용보험금액 */
	private String dutnStamt;		/* 공제합계금액 */
	private String sbtRcpAm;		/* 차감수령금액 */
	
}
