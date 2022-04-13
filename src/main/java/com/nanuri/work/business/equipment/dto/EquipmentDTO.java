package com.nanuri.work.business.equipment.dto;


import com.nanuri.work.business.common.paging.CommonDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EquipmentDTO extends CommonDTO {
    public Long seqNo;          /* 일련번호 */
    public String userId;       /* 사용자ID */
    public String modlNm;       /* 모델명 */
    public String eqpmKdCd;   	/* 장비종류코드 */
    public String srlNo;        /* 시리얼번호 */
    public String pyDt;         /* 지급일자 */
    public String wdrwDt;       /* 회수일자 */
}
