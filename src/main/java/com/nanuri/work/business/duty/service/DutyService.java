package com.nanuri.work.business.duty.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.duty.dto.DutyHistoryDTO;
import com.nanuri.work.business.duty.mapper.DutyMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DutyService {

	@Autowired
	private DutyMapper dutyMapper;
	
	public boolean registerDuty(DutyHistoryDTO params) {
		int queryResult = 0;
		queryResult = dutyMapper.insertDuty(params);
		
		return (queryResult > 0);
	}
	
}
