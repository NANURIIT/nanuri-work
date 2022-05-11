package com.nanuri.work.business.payslip.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.payslip.dto.PayslipDTO;
import com.nanuri.work.business.payslip.mapper.PayslipMapper;
import com.nanuri.work.com.security.AuthenticationFacade;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class PayslipService {
	
	@Autowired
	private PayslipMapper payslipMapper;
	
	@Autowired
	private AuthenticationFacade facade;
	
	/* 급여 명세서 리스트 */
	public List<PayslipDTO> getPayslipList() {
		return payslipMapper.selectPayslipList(facade.getDetails().getUserId());
	}
}
