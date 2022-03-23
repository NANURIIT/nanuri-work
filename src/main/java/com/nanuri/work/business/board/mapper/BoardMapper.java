package com.nanuri.work.business.board.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.business.board.dto.BoardDTO;

@Mapper
public interface BoardMapper {
	
	public int insertBoard(BoardDTO params);			/* 게시글 등록 */
	public List<BoardDTO> selectBoardList();			/* 게시글 리스트 조회 */
	public BoardDTO selectBoardDetail(Long seqNo);		/* 게시글 조회 */
	public int updateInqCn(Long seqNo);					/* 조회수 증가 */
	public int updateBoard(BoardDTO params);			/* 게시글 수정 */
	public int deleteBoard(Long seqNo);					/* 게시글 삭제 */
	public int selectTotalCountBoard();					/* 전체 게시글 갯수 조회 */
	
}
