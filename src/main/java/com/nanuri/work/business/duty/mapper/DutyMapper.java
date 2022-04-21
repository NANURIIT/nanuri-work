package com.nanuri.work.business.duty.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.business.duty.dto.DutyHistoryDTO;
import com.nanuri.work.business.duty.vo.DutyHistoryVO;

@Mapper
public interface DutyMapper {

	public int insertOnDuty(DutyHistoryDTO params);
	public List<DutyHistoryVO> selectDutyHistoryList(String userId);
	public DutyHistoryDTO selectLastDutyHistoryDetail(String userId);
	public int updateDuty(DutyHistoryDTO params);
	public int selectTotalCountDutyHistory();
}