package com.nanuri.work.business.duty.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
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
	
	@PostMapping(value = "/registerDuty")
	public boolean registerDuty(@RequestBody DutyHistoryDTO params) {
		return dutyService.registerDuty(params);
	}
	
	@GetMapping(value = "/getDutyHistoryList")
	public HashMap<String, Object> getDutyHistoryList(@ModelAttribute("params") DutyHistoryVO params){
		return dutyService.getDutyHistoryList(params);
	}
	
	@GetMapping(value = "/getLastDutyDetail")
	public DutyHistoryDTO getLastDutyDetail() {
		return dutyService.getLastDutyDetail();
	}
	
	@PatchMapping(value = "/updateDuty")
	public boolean updateDuty(@RequestBody DutyHistoryDTO params) {
		return dutyService.updateDuty(params);
	}
	
}
