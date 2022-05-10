package com.nanuri.work.business.common.paging;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommonDTO extends Criteria {

	private PaginationInfo paginationInfo;
	private String rgmnNm;		/* 등록자명 */
	private String rgDtm;		/* 등록일시 */	
	private String mdfpNm;		/* 수정자명 */
	private String modDtm;		/* 수정일시 */
	private String delYn;		/* 삭제여부 */
	
}
