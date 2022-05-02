package com.nanuri.work.business.duty.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class DutyController {

	/* pc */
	
	@GetMapping(value = "/admin/dutyList")
	public String getAdminDutyListPage() {
		return "/business/duty/attendance_list";
	}
	
	@GetMapping(value = "/admin/dutyWrite")
	public String getAdminDutyWritePage() {
		return  "/business/duty/attendance_add";
	}
	
	@GetMapping(value = "/admin/dutyConfirm")
	public String getAdminDutyConfirmPage() {
		return "/business/duty/attendance_approve";
	}
	
	/* mobile */
	
	@GetMapping(value = "/mobile/dutyList")
	public String getMobileDutyListPage() {
		return "/business/mobile/duty/attendance_list";
	}
	
	@GetMapping(value = "/mobile/dutyListDetail")
	public String getMobileDutyListDetailPage() {
		return "/business/mobile/duty/attendance_list_detail";
	}
	
	@GetMapping(value = "/mobile/dutyWrite")
	public String getMobileDutyWritePage() {
		return "/business/mobile/duty/attendance_add";
	}
	
	@GetMapping(value = "/mobile/dutyConfirm")
	public String getMobileDutyConfirmPage() {
		return "/business/mobile/duty/attendance_approve";
	}
	
	@GetMapping(value = "/mobile/dutyConfirmDetail")
	public String getMobileDutyConfirmDetailPage() {
		return "/business/mobile/duty/attendance_approve_detail";
	}
	
}
