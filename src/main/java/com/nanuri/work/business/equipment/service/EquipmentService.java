package com.nanuri.work.business.equipment.service;

import com.nanuri.work.business.equipment.dto.EquipmentDTO;
import com.nanuri.work.business.equipment.mapper.EquipmentMapper;
import com.nanuri.work.business.member.mapper.MemberMapper;
import com.nanuri.work.com.security.AuthenticationFacade;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentMapper equipmentMapper;
    
    @Autowired
    private MemberMapper memberMapper;
    
    @Autowired
    private AuthenticationFacade facade;
    
    /* 장비 정보 */
    public List<EquipmentDTO> getEquipmentList(){
    	return equipmentMapper.selectEducationList(facade.getDetails().getUserId());
    }
}
