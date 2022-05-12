package com.nanuri.work.business.duty.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.work.business.duty.dto.DutyHistoryDTO;
import com.nanuri.work.business.duty.service.DutyService;
import com.nanuri.work.business.duty.vo.DutyHistoryVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/duty")
public class DutyApiController {

	@Autowired
	private DutyService dutyService;
	
	/**
	 * 근태 등록(출근 버튼 눌렀을 때)
	 * @param params
	 * @return
	 */
	@PostMapping(value = "/registerOnDuty")
	public String registerOnDuty(@RequestBody DutyHistoryDTO params) {
		
		String message = "";
		
		try {
			boolean isRegistered = dutyService.registerOnDuty(params);
			if(isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	/**
	 * 근태 등록(상신 버튼 눌렀을 때)
	 * @param params
	 * @return
	 */
	@PostMapping(value = "/registerOffDuty")
	public String registerOffDuty(@RequestBody DutyHistoryDTO params) {
		
		String message = "";
		
		try {
			boolean isRegistered = dutyService.registerOffDuty(params);
			if(isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	/**
	 * 근태정보 리스트 출력
	 * @param params
	 * @return
	 */
	@GetMapping(value = "/getDutyHistoryList")
	public HashMap<String, Object> getDutyHistoryList(@ModelAttribute("param") DutyHistoryVO params){
		return dutyService.getDutyHistoryList(params);
	}
	
	/**
	 * 근태정보 상세조회
	 * @param seqNo
	 * @return
	 */
	@GetMapping(value = "/getDutyHistoryDetail/{seqNo}")
	public DutyHistoryVO getDutyHistoryDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {
		return dutyService.getDutyHistoryDetail(seqNo);
	}
	
	/**
	 * 마지막에 등록 한 근태정보 출력
	 * @return
	 */
	@GetMapping(value = "/getLastDutyDetail")
	public DutyHistoryDTO getLastDutyDetail() {
		return dutyService.getLastDutyDetail();
	}
	
	/**
	 * 근태 정보 수정 (퇴근 버튼 눌렀을 때)
	 * @param params
	 * @return
	 */
	@PatchMapping(value = "/updateDuty")
	public boolean updateDuty(@RequestBody DutyHistoryDTO params) {
		return dutyService.updateDuty(params);
	}
	
	/**
	 * 일괄결재
	 * @param params
	 * @return
	 */
	@PatchMapping(value = "/allPayment")
	public boolean allPayment(@RequestBody List<DutyHistoryDTO> params) {
		return dutyService.allPayment(params);
	}
	
	/**
	 * 근태정보 단일결재
	 * @param params
	 * @return
	 */
	@PatchMapping(value="/attendance")
	public boolean attendance(@RequestBody DutyHistoryDTO params) {
		return dutyService.attendance(params);
	}
}
