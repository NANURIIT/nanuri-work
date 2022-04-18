package com.nanuri.work.business.equipment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.work.business.equipment.dto.EquipmentDTO;
import com.nanuri.work.business.equipment.service.EquipmentService;
import com.nanuri.work.business.equipment.vo.EquipmentVO;
import com.nanuri.work.business.member.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/equipment")

public class EquipmentApiController {
	@Autowired
	private MemberService memberService;
	
	@Autowired
	private EquipmentService equipmentService;
	
	/* 장비 정보 등록 */
	@PostMapping(value = "/registeEquipment")
	public String registeEquipment(@RequestBody EquipmentDTO params) {
		String message = "";
		
		try {
			boolean isRegistered = equipmentService.registeEquipment(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";				
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			e.printStackTrace();
		}
		
		return message;		
	}
	
	/* 장비 정보 리스트 */
	@GetMapping(value = "/equipmentList")
	public List<EquipmentVO> getEquipmentList(){
		return equipmentService.getEquipmentList();
	}
	
    /* 장비 정보 리스트 수정 */
	@GetMapping(value = "/equipmentDetail/{seqNo}")
	public EquipmentDTO getEquipmentDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {		
		return equipmentService.getEquipmentDetail(seqNo);
	}
	
	/* 장비 정보 삭제 */
	@DeleteMapping(value = "/equipmentDelete")
	public boolean deleteEquipment(@RequestBody EquipmentDTO params) {
		return equipmentService.deleteEquipment(params);
	}
}
