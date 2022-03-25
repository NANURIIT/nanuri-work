package com.nanuri.work.business.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping(value = "/admin")
@Controller
public class MemberController {

	@GetMapping(value = "/employeeList")
	public String getEmployeeListPage() {
		return "business/employee_list";
	}
	
}
