package com.nanuri.work.business.payslip.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.common.paging.PaginationInfo;
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
	
	/* 급여 명세서 리스트 
	 * 
	 *  
	 */
	public HashMap<String, Object> getPayslipList(PayslipDTO params) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		int payslipTotalCount = payslipMapper.selectTotalCountPayslip(params);
		
		PaginationInfo paginationInfo = new PaginationInfo(params);
		paginationInfo.setTotalRecordCount(payslipTotalCount);
		
		params.setPaginationInfo(paginationInfo);
		
		if (payslipTotalCount > 0) {
			resultMap.put("payslipTotalCount", payslipTotalCount);
			resultMap.put("payslipList", payslipMapper.selectPayslipList(params));
		}
		return resultMap;
		
	}
}
