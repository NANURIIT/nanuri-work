package com.nanuri.work.business.board.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class BoardController {

	/* pc */
	
	/**
	 * 공지사항 리스트
	 * @return
	 */
	@GetMapping(value = "/admin/notice")
	public String getNoticePage() {
		return "business/board/notice";
	}
	
	/**
	 * 공지사항 입력
	 * @return
	 */
	@GetMapping(value = "/admin/noticeWrite")
	public String getNoticeWritePage() {
		return "business/board/notice_write";
	}

	/**
	 * 공지사항 상세보기
	 * @return
	 */
	@GetMapping(value = "/admin/noticeDetail")
	public String getNoticeDetailPage() {
		return "business/board/notice_detail";
	}
	
	/* mobile */
	
	/**
	 * 공지사항 리스트
	 * @return
	 */
	@GetMapping(value = "/mobile/notice")
	public String getMobileNoticePage() {
		return "business/mobile/notice/notice";
	}
	
	/**
	 * 공지사항 작성
	 * @return
	 */
	@GetMapping(value = "/mobile/noticeWrite")
	public String getMobilenoticeWritePage() {
		return "business/mobile/notice/notice_write";
	}
	
	/**
	 * 공지사항 상세보기
	 * @return
	 */
	@GetMapping(value = "/mobile/noticeDetail")
	public String getMobileNoticeDetailPage() {
		return "business/mobile/notice/notice_detail";
	}

}
