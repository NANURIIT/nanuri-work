package com.nanuri.work.business.duty.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.business.duty.dto.DutyHistoryDTO;

@Mapper
public interface DutyMapper {

	public int insertDuty(DutyHistoryDTO params);
	
}
