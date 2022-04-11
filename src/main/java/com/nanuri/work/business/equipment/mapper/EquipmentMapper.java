package com.nanuri.work.business.equipment.mapper;

import com.nanuri.work.business.member.dto.EducationDTO;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface EquipmentMapper {

    /* 장비 정보 */
    public int insertEquipment(EducationDTO params);
    public List<EducationDTO> selectEducationList(String userId);
    public int updateEquipment(EducationDTO params);
    public int deleteEquipment(EducationDTO params);
}
