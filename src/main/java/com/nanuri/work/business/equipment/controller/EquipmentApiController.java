package com.nanuri.work.business.equipment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.work.business.equipment.dto.EquipmentDTO;
import com.nanuri.work.business.equipment.service.EquipmentService;
import com.nanuri.work.business.member.dto.CommonCodeDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/equipment")

public class EquipmentApiController {

	@Autowired
	private EquipmentService equipmentService;
	
	/**
	 * 공통코드 호출
	 * @param params
	 * @return
	 */
//	@GetMapping(value = "/getCommonCode")
//	public List<CommonCodeDTO> getCommonCodeList(@ModelAttribute("params") CommonCodeDTO params) {
//		// getcommoncodelist 는 memberservice에 있음.
//		return equipmentService.getCommonCodeList(params);
//	}
	
	@PostMapping(value = "/registeEquipment")
	public String registeEquipment(@RequestBody EquipmentDTO params) {
		String message = "";
		
		try {
			// 아직 registerEquipment method가 정의되있지않음.
//			boolean isRegistered = equipmentService.registeEquipment(params);
//			if (isRegistered == false) {
//				message = "등록에 실패하였습니다.";				
//			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			e.printStackTrace();
		}
		
		return message;		
	}
	
	
}
