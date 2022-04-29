package com.nanuri.work.business.duty.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.business.duty.dto.DutyHistoryDTO;
import com.nanuri.work.business.duty.vo.DutyHistoryVO;

@Mapper
public interface DutyMapper {

	public int insertOnDuty(DutyHistoryDTO params);
	public List<DutyHistoryVO> selectDutyHistoryList(DutyHistoryVO params);
	public DutyHistoryDTO selectLastDutyHistoryDetail(String userId);
	public int updateDuty(DutyHistoryDTO params);
	public int selectTotalCountDutyHistory();
	
	public int insertOffDuty(List<DutyHistoryDTO> dutyList);
	public List<String> calVacation(HashMap<String, String> params);
	
	public int allPayment(DutyHistoryDTO params);
}
