package com.nanuri.work.business.board.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.work.business.board.dto.BoardDTO;
import com.nanuri.work.business.board.service.BoardService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/admin")
public class BoardApiController {

	@Autowired
	private BoardService boardService;
	
	@PostMapping(value = "/boardWrite")
	public String registerBoard(@RequestBody BoardDTO params) {
		
		String message = "";

		try {
			boolean isRegistered = boardService.registerBoard(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	@GetMapping(value = "/boardList")
	public HashMap<String, Object> getBoardList(@ModelAttribute("params") BoardDTO params) {
		return boardService.getBoardList(params);
	}
	
	@GetMapping(value = "/boardDetail/{seqNo}")
	public BoardDTO getBoardDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {
		return boardService.getBoardDetail(seqNo);
	}
	
	@DeleteMapping(value = "/boardDelete")
	public boolean deleteBoard(@RequestBody BoardDTO params) {
		return boardService.deleteBoard(params);
	}
	
}
