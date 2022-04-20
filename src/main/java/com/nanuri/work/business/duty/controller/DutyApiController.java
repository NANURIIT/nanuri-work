package com.nanuri.work.business.duty.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.work.business.duty.dto.DutyHistoryDTO;
import com.nanuri.work.business.duty.service.DutyService;

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
	
}
