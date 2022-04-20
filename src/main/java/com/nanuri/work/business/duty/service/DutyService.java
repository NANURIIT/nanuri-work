package com.nanuri.work.business.duty.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.common.paging.PaginationInfo;
import com.nanuri.work.business.duty.dto.DutyHistoryDTO;
import com.nanuri.work.business.duty.mapper.DutyMapper;
import com.nanuri.work.business.duty.vo.DutyHistoryVO;
import com.nanuri.work.com.code.MemberLevelCode;
import com.nanuri.work.com.security.AuthenticationFacade;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class DutyService {

	@Autowired
	private DutyMapper dutyMapper;
	
	@Autowired
	private AuthenticationFacade facade;
	
	public boolean registerDuty(DutyHistoryDTO params) {
		int queryResult = 0;
		
		DutyHistoryDTO dutyHistory = dutyMapper.selectLastDutyHistoryDetail(facade.getDetails().getUserId());
		
		if(dutyHistory != null && dutyHistory.getEdDt() == null && dutyHistory.getEdTm() == null) {
			return false;
		}
		
		params.setUserId(facade.getDetails().getUserId());
		
		queryResult = dutyMapper.insertDuty(params);
		
		return (queryResult > 0);
	}
	
	public HashMap<String, Object> getDutyHistoryList(DutyHistoryVO params){
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		int dutyHistoryTotalCount = dutyMapper.selectTotalCountDutyHistory();
		
		String userId = null;
		
		PaginationInfo paginationInfo = new PaginationInfo(params);
		paginationInfo.setTotalRecordCount(dutyHistoryTotalCount);
		
		params.setPaginationInfo(paginationInfo);
		
		if(facade.getDetails().getUserAutrNm() != MemberLevelCode.ADMIN &&
				facade.getDetails().getUserAutrNm() != MemberLevelCode.ASSISTANT) {
			userId = facade.getDetails().getUserId();
		}
		
		if(dutyHistoryTotalCount > 0) {
			resultMap.put("dutyHistoryTotalCount", dutyHistoryTotalCount);
			resultMap.put("dutyHistoryList", dutyMapper.selectDutyHistoryList(userId));
		}
		return resultMap;
	}
	
	public DutyHistoryDTO getLastDutyDetail() {
		return dutyMapper.selectLastDutyHistoryDetail(facade.getDetails().getUserId());
	}
	
	public boolean updateDuty(DutyHistoryDTO params) {
		int queryResult = 0;
		
		DutyHistoryDTO dutyHistory = dutyMapper.selectLastDutyHistoryDetail(facade.getDetails().getUserId());
		
		if(dutyHistory == null) {
			return false;
		}
		
		if(dutyHistory != null && dutyHistory.getEdDt() != null && dutyHistory.getEdTm() != null) {
			return false;
		}
		
		params.setSeqNo(dutyHistory.getSeqNo());
		params.setUserId(facade.getDetails().getUserId());
		
		queryResult = dutyMapper.updateDuty(params);
		
		return (queryResult > 0);
	}
	
}
