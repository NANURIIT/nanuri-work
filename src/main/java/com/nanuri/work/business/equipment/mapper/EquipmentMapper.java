package com.nanuri.work.business.equipment.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.business.equipment.dto.EquipmentDTO;
import com.nanuri.work.business.member.dto.CommonCodeDTO;


@Mapper
public interface EquipmentMapper {

    /* 장비 정보 */
    public int insertEquipment(EquipmentDTO params);
	public List<CommonCodeDTO> selectCommonCodeList(CommonCodeDTO params);
    public List<EquipmentDTO> selectEducationList(String userId);
    public int updateEquipment(EquipmentDTO params);
    public int deleteEquipment(EquipmentDTO params);
}
