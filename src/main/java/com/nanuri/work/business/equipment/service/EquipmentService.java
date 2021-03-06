package com.nanuri.work.business.equipment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.equipment.dto.EquipmentDTO;
import com.nanuri.work.business.equipment.mapper.EquipmentMapper;
import com.nanuri.work.business.equipment.vo.EquipmentVO;
import com.nanuri.work.com.security.AuthenticationFacade;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EquipmentService {

    @Autowired
    private EquipmentMapper equipmentMapper;
    
    @Autowired
    private AuthenticationFacade facade;
    
    /* 장비 정보 등록*/
    public boolean registeEquipment(EquipmentDTO params) {
		int queryResult = 0;
		
		if (params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = equipmentMapper.updateEquipment(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			params.setUserId(facade.getDetails().getUserId());
			queryResult = equipmentMapper.insertEquipment(params);
		}

		return (queryResult > 0);
    }
    
    /* 장비 정보 리스트*/
    public List<EquipmentVO> getEquipmentList(){
    	return equipmentMapper.selectEquipmentList(facade.getDetails().getUserId());
    }
    
    /* 장비 정보 리스트 수정 */
    public EquipmentDTO getEquipmentDetail(Long seqNo) {
		return equipmentMapper.selectEquipmentDetail(seqNo);
    }
    
    /* 장비 정보 삭제 */
    public boolean deleteEquipment(EquipmentDTO params){
		int queryResult = 0;
		
		EquipmentDTO equipment = equipmentMapper.selectEquipmentDetail(params.getSeqNo());
		
		if (equipment != null && "N".equals(equipment.getWdrwYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = equipmentMapper.deleteEquipment(params);
		}

		return (queryResult == 1) ? true : false;
    }


}
