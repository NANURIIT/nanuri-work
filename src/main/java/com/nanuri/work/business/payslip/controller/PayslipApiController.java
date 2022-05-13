package com.nanuri.work.business.payslip.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.work.business.payslip.dto.PayslipDTO;
import com.nanuri.work.business.payslip.service.PayslipService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/payslip")
public class PayslipApiController {
	
	@Autowired
	private PayslipService payslipService;
	
	/* 급여명세서 리스트 */
	@GetMapping(value = "/getPayslipList")
	public HashMap<String, Object> getPayslipList(@ModelAttribute("param") PayslipDTO params) {
		return payslipService.getPayslipList(params);
	}
}
