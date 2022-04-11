package com.nanuri.work.business.equipment.service;

import com.nanuri.work.business.equipment.mapper.EquipmentMapper;
import com.nanuri.work.com.security.AuthenticationFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentService {

    @Autowired
    private EquipmentMapper equipmentMapper;

    @Autowired
    private AuthenticationFacade facade;

}
