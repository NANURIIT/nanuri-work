package com.nanuri.work.business.member.dto;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CareerhistoryDTO extends CommonDTO {

	private Long seqNo;				/* 일련번호 */
	private String userId;			/* 사용자 ID */
	private String bzNm;			/* 사업명 */
	private String bzStYm;			/* 사업시작년월 */
	private String bzEdYm;			/* 사업종료년월 */
	private String ordrNm;			/* 발주사 */
	private String bzCntn;			/* 사업내용 */
	private String blgCoNm;			/* 소속회사 */
	private String rolCd;			/* 역할코드 */
	private String chrgBsnNm;		/* 담당업무 */
	private String langNm;			/* 사용언어 */
	private String dbNm;			/* 사용DB */
	private String osNm;			/* 사용OS */
	private String useFrmwkNm;		/* 사용프레임워크 */
	private String mthNm;			/* 사용방법론 */
	private String etcCapaNm;		/* 사용기타 */
	
}
