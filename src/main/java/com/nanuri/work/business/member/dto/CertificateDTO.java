package com.nanuri.work.business.member.dto;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CertificateDTO extends CommonDTO {

	private Long seqNo;				/* 일련번호 */
	private String userId;			/* 사용자 ID */
	private String qlfcDsCd;		/* 자격증구분코드 */
	private String qlfcNm;			/* 자격증명 */
	private String pbcplNm;			/* 발행처 */
	private String acqDt;			/* 취득일자 */
	private String vldDt;			/* 유효일자 */
	private String updtDt;			/* 갱신일자 */
	
}
