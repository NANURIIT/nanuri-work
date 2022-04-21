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
	
	
	
}
