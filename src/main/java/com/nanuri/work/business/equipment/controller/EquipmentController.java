package com.nanuri.work.business.equipment.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class EquipmentController {
	
	/* pc */
	
	/**
	 * 장비정보 입력
	 * @return
	 */
    @GetMapping(value = "/admin/equipmentWrite")
    public String getEquipmentWrite() { 
    	return "business/equipment/equipment_add"; 
    }
    
	/**
	 * 장비정보 리스트
	 * @return
	 */
	@GetMapping(value = "/admin/equipmentList")
	public String getEquipmentList() {
		return "business/equipment/equipment_add";		
	}
	
	/* mobile */
	@GetMapping(value = "/mobile/equipmentWrite")
	public String getMobileEquipmentWritePage() {
		return "business/mobile/equipment/equipment_add";
	}
    
}
