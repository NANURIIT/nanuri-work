package com.nanuri.work.business.payslip.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
public class PayslipController {
	
	/* pc */

	/**
	 * 급여내역 리스트
	 */
	@GetMapping(value = "/admin/payslipList")
	public String getPayslipListPage() {
		return "business/payslip/payslip";
	}
}
