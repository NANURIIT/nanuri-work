package com.nanuri.work.business.equipment.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class EquipmentController {
    /*
     * 장비정보 입력
     * @return
     */
    @GetMapping(value = "/admin/equipmentWrite")
    public String getequipmentWrite() { return "business/employee/equipment_add"; }
}
