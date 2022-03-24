package com.nanuri.work.business.board.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.nanuri.work.business.board.dto.BoardDTO;
import com.nanuri.work.business.board.service.BoardService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping(value = "/admin")
public class BoardController {

	@Autowired
	private BoardService boardService;

	@GetMapping(value = "/notice")
	public String getNoticePage() {
		return "business/board/notice";
	}

	@GetMapping(value = "/noticeWrite")
	public String getNoticeWritePage(@RequestParam(value = "seqNo", required = false) Long seqNo) {
		return "business/board/notice_write";
	}

	@GetMapping(value = "noticeDetail")
	public String getNoticeDetail() {
		return "business/board/notice_detail";
	}
	
	@ResponseBody
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
			e.printStackTrace();
		}
		
		return message;
	}
	
	@ResponseBody
	@GetMapping(value = "/boardList")
	public HashMap<String, Object> getBoardList(@ModelAttribute("params") BoardDTO params) {
		return boardService.getBoardList(params);
	}
	
	@ResponseBody
	@GetMapping(value = "/boardDetail/{seqNo}")
	public BoardDTO getBoardDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {
		return boardService.getBoardDetail(seqNo);
	}

}
