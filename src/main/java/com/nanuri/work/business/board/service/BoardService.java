package com.nanuri.work.business.board.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.board.dto.BoardDTO;
import com.nanuri.work.business.board.mapper.BoardMapper;
import com.nanuri.work.business.common.paging.PaginationInfo;
import com.nanuri.work.com.code.MemberLevelCode;
import com.nanuri.work.com.security.AuthenticationFacade;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardService {

	@Autowired
	private BoardMapper boardMapper;
	
	@Autowired
	private AuthenticationFacade facade;
	
	public boolean registerBoard(BoardDTO params) {
		int queryResult = 0;
		if(params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = boardMapper.updateBoard(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			queryResult = boardMapper.insertBoard(params);
		}
		
		return (queryResult > 0);
	}
	
	public HashMap<String, Object> getBoardList(BoardDTO params) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		int boardTotalCount = 0;
		
		if(facade.getDetails().getUserAutrNm() == MemberLevelCode.ADMIN 	// ADMIN, ASSISTANT, EMPLOYEE 권한은 모든 게시물 열람 가능 
				|| facade.getDetails().getUserAutrNm() == MemberLevelCode.ASSISTANT 
				|| facade.getDetails().getUserAutrNm() == MemberLevelCode.EMPLOYEE) {
			boardTotalCount = boardMapper.selectTotalCountPrivateBoard(params);
		} else {	// 그 외 권한은 공개설정 ALL 게시글만 열람 가능
			boardTotalCount = boardMapper.selectTotalCountPublicBoard(params);
		}
		
		
		PaginationInfo paginationInfo = new PaginationInfo(params);
		paginationInfo.setTotalRecordCount(boardTotalCount);
		
		params.setPaginationInfo(paginationInfo);
		
		if(boardTotalCount > 0 ) {
			if(facade.getDetails().getUserAutrNm() == MemberLevelCode.ADMIN 	// ADMIN, ASSISTANT, EMPLOYEE 권한은 모든 게시물 열람 가능 
					|| facade.getDetails().getUserAutrNm() == MemberLevelCode.ASSISTANT 
					|| facade.getDetails().getUserAutrNm() == MemberLevelCode.EMPLOYEE) {
				resultMap.put("boardTotalCount", boardTotalCount);
				resultMap.put("boardList", boardMapper.selectPrivateBoardList(params));
			} else {	// 그 외 권한은 공개설정 ALL 게시글만 열람 가능
				resultMap.put("boardTotalCount", boardTotalCount);
				resultMap.put("boardList", boardMapper.selectPublicBoardList(params));
			}
		}
		return resultMap;
	}
	
	public BoardDTO getBoardDetail(Long seqNo) {
		boardMapper.updateInqCn(seqNo);
		return boardMapper.selectBoardDetail(seqNo);
	}
	
	public boolean deleteBoard(BoardDTO params) {
		int queryResult = 0;
		
		BoardDTO board = boardMapper.selectBoardDetail(params.getSeqNo());
		
		if(board != null && "N".equals(board.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = boardMapper.deleteBoard(params);
		}
		
		return (queryResult == 1) ? true : false;
	}
	
}
