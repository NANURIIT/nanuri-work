package com.nanuri.work.business.board.service;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.board.dto.BoardDTO;
import com.nanuri.work.business.board.mapper.BoardMapper;

@Service
public class BoardService {

	@Autowired
	private BoardMapper boardMapper;
	
	public boolean registerBoard(BoardDTO params) {
		int queryResult = 0;
		
		if(params.getSeqNo() != null) {
			queryResult = boardMapper.updateBoard(params);
		} else {
			queryResult = boardMapper.insertBoard(params);
		}
		
		return (queryResult > 0);
	}
	
	public List<BoardDTO> getBoardList() {
		List<BoardDTO> boardList = Collections.emptyList();
		
		if(boardMapper.selectTotalCountBoard() > 0 ) {
			boardList = boardMapper.selectBoardList();
		}
		
		return boardList;
	}
	
	public BoardDTO getBoardDetail(Long seqNo) {
		boardMapper.updateInqCn(seqNo);
		return boardMapper.selectBoardDetail(seqNo);
	}
	
	public boolean deleteBoard(Long seqNo) {
		int queryResult = 0;
		
		BoardDTO board = boardMapper.selectBoardDetail(seqNo);
		
		if(board != null && "N".equals(board.getDelYn())) {
			queryResult = boardMapper.deleteBoard(seqNo);
		}
		
		return (queryResult == 1) ? true : false;
	}
	
}
