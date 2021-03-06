package com.nanuri.work.business.duty.service;

import java.util.ArrayList;
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

	/**
	 * 근태 등록 (출근 버튼 눌렀을 때)
	 * 
	 * @param params
	 * @return
	 */
	public boolean registerOnDuty(DutyHistoryDTO params) {
		int queryResult = 0;

		DutyHistoryDTO dutyHistory = dutyMapper.selectLastDutyHistoryDetail(facade.getDetails().getUserId());

		if (dutyHistory != null && dutyHistory.getEdDt() == null && dutyHistory.getEdTm() == null) {
			return false;
		}

		params.setUserId(facade.getDetails().getUserId());

		queryResult = dutyMapper.insertOnDuty(params);

		return (queryResult > 0);
	}

	/**
	 * 근태 버튼 클릭(상신버튼 눌렀을 때)
	 * @param params
	 * @return
	 */
	public boolean registerOffDuty(DutyHistoryDTO params) {

		int queryResult = 0;

		HashMap<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("stDt", params.getStDt());
		paramMap.put("edDt", params.getEdDt());

		List<String> vacation = dutyMapper.calVacation(paramMap);
		List<DutyHistoryDTO> list = new ArrayList<DutyHistoryDTO>();

		for (int i = 0; i < vacation.size(); i++) {

			DutyHistoryDTO duty = new DutyHistoryDTO();
			duty.setUserId(facade.getDetails().getUserId());
			duty.setBasDt(vacation.get(i));
			duty.setSvceFormCd(params.getSvceFormCd());
			duty.setStDt(params.getStDt());
			duty.setStTm(params.getStTm());
			duty.setEdDt(params.getEdDt());
			duty.setEdTm(params.getEdTm());
			duty.setSbtNum(params.getSbtNum());
			duty.setSvcePrjtTxt(params.getSvcePrjtTxt());
			duty.setRsnTxt(params.getRsnTxt());

			list.add(duty);
		}

		queryResult = dutyMapper.insertOffDuty(list);

		return (queryResult > 0);
	}

	/**
	 * 근태 정보 리스트 출력
	 * 
	 * @param params
	 * @return
	 */
	public HashMap<String, Object> getDutyHistoryList(DutyHistoryVO params) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();

		// 관리자 혹은 경영지원팀이 아니면
		if (facade.getDetails().getUserAutrNm() != MemberLevelCode.ADMIN
				&& facade.getDetails().getUserAutrNm() != MemberLevelCode.ASSISTANT) {
			params.setUserId(facade.getDetails().getUserId());
		}

		int dutyHistoryTotalCount = dutyMapper.selectTotalCountDutyHistory(params);

		PaginationInfo paginationInfo = new PaginationInfo(params);
		paginationInfo.setTotalRecordCount(dutyHistoryTotalCount);

		params.setPaginationInfo(paginationInfo);

		if (dutyHistoryTotalCount > 0) {
			resultMap.put("dutyHistoryTotalCount", dutyHistoryTotalCount);
			resultMap.put("dutyHistoryList", dutyMapper.selectDutyHistoryList(params));
		}
		return resultMap;
	}

	/**
	 * 근태정보 상세조회
	 * @param seqNo
	 * @return
	 */
	public DutyHistoryVO getDutyHistoryDetail(Long seqNo) {
		return dutyMapper.selectDutyHistoryDetail(seqNo);
	}

	/**
	 * 마지막에 등록한 근태 정보 출력
	 * @return
	 */
	public DutyHistoryDTO getLastDutyDetail() {
		return dutyMapper.selectLastDutyHistoryDetail(facade.getDetails().getUserId());
	}

	/**
	 * 근태 정보 수정(퇴근 버튼 눌렀을 때)
	 * 
	 * @param params
	 * @return
	 */
	public boolean updateDuty(DutyHistoryDTO params) {
		int queryResult = 0;

		DutyHistoryDTO dutyHistory = dutyMapper.selectLastDutyHistoryDetail(facade.getDetails().getUserId());

		if (dutyHistory == null) {
			return false;
		}

		if (dutyHistory != null && dutyHistory.getEdDt() != null && dutyHistory.getEdTm() != null) {
			return false;
		}

		params.setSeqNo(dutyHistory.getSeqNo());
		params.setUserId(facade.getDetails().getUserId());

		queryResult = dutyMapper.updateDuty(params);

		return (queryResult > 0);
	}

	/**
	 * 근태 일괄결재
	 * @param params
	 * @return
	 */
	public boolean allPayment(List<DutyHistoryDTO> params) {

		int queryResult = 0;

		for (int i = 0; i < params.size(); i++) {
			params.get(i).setDczmnId(facade.getDetails().getUserId());
			queryResult += dutyMapper.allPayment(params.get(i));
		}
		

		return (queryResult > 0);
	}
	
	/**
	 * 근태 단일결재
	 * @param params
	 * @return
	 */
	public boolean attendance(DutyHistoryDTO params) {
		
		int queryResult = 0;
		
		params.setDczmnId(facade.getDetails().getUserId());
		
		queryResult = dutyMapper.attendance(params);
		
		return (queryResult > 0);
	}
}
