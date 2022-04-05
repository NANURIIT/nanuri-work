package com.nanuri.work.business.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MemberController {

	@GetMapping(value = "/admin/employeeList")
	public String getEmployeeListPage() {
		return "business/employee_list";
	}
	
	@GetMapping(value = "/employee/index")
	public String getEmployeeIndexPage() {
		return "business/employee/index";
	}
	
	/**
	 * 기본정보 입력
	 * @return
	 */
	@GetMapping(value = "/employee/basicInfoWrite")
	public String getBasicInfoWritePage() {
		return "business/employee/basic_add";
	}
	
	/**
	 * 학력 입력
	 * @return
	 */
	@GetMapping(value = "/employee/schoolCareerWrite")
	public String getSchoolCareerWritePage() {
		return "business/employee/education_add";
	}
	
	/**
	 * 자격증 입력
	 * @return
	 */
	@GetMapping(value = "/employee/certificateWrite")
	public String getCertificateWritePage() {
		return "business/employee/certificate_add";
	}
	
}
