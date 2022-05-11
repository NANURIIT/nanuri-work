package com.nanuri.work.business.payslip.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.business.payslip.dto.PayslipDTO;

@Mapper
public interface PayslipMapper {
	
	/* 급여 명세서 */
	public List<PayslipDTO> selectPayslipList(PayslipDTO params);
	public List<PayslipDTO> selectPayslipList(String userId);
}
