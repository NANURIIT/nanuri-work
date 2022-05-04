package com.nanuri.work.business.duty.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class DutyController {

	/* pc */
	
	/**
	 * 근태정보 리스트
	 * @return view
	 */
	@GetMapping(value = "/admin/dutyList")
	public String getAdminDutyListPage() {
		return "/business/duty/attendance_list";
	}
	
	/**
	 * 근태정보 입력
	 * @return view
	 */
	@GetMapping(value = "/admin/dutyWrite")
	public String getAdminDutyWritePage() {
		return  "/business/duty/attendance_add";
	}
	
	/**
	 * 근태결재
	 * @return view
	 */
	@GetMapping(value = "/admin/dutyConfirm")
	public String getAdminDutyConfirmPage() {
		return "/business/duty/attendance_approve";
	}
	
	/* mobile */
	
	/**
	 * 근태정보 리스트
	 * @return view
	 */
	@GetMapping(value = "/mobile/dutyList")
	public String getMobileDutyListPage() {
		return "/business/mobile/duty/attendance_list";
	}
	
	/**
	 * 근태정보 상세보기
	 * @return view
	 */
	@GetMapping(value = "/mobile/dutyListDetail")
	public String getMobileDutyListDetailPage() {
		return "/business/mobile/duty/attendance_list_detail";
	}
	
	/**
	 * 근태정보 입력
	 * @return view
	 */
	@GetMapping(value = "/mobile/dutyWrite")
	public String getMobileDutyWritePage() {
		return "/business/mobile/duty/attendance_add";
	}
	
	/**
	 * 근태결재
	 * @return view
	 */
	@GetMapping(value = "/mobile/dutyConfirm")
	public String getMobileDutyConfirmPage() {
		return "/business/mobile/duty/attendance_approve";
	}
	
	/**
	 * 근태결재 상세보기
	 * @return view
	 */
	@GetMapping(value = "/mobile/dutyConfirmDetail")
	public String getMobileDutyConfirmDetailPage() {
		return "/business/mobile/duty/attendance_approve_detail";
	}
	
}
