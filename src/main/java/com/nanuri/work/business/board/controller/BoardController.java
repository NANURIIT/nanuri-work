package com.nanuri.work.business.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping(value = "/admin")
public class BoardController {

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

}
