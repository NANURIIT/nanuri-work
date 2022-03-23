package com.nanuri.work.business.board.dto;

import com.nanuri.work.business.common.paging.CommonDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDTO extends CommonDTO {

	private Long seqNo;				/* 일련번호 */
	private String bultTypCd;		/* 게시글 유형 코드 */
	private String bultTitlNm;		/* 게시글 제목 */
	private String brcn;			/* 게시글 내용 */
	private int inqCn;				/* 조회수 */
	
}
