package com.nanuri.work.business.equipment.dto;


import com.nanuri.work.business.common.paging.CommonDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EquipmentDTO extends CommonDTO {
    private Long seqNo;          /* 일련번호 */
    private String userId;       /* 사용자ID */
    private String modlNm;       /* 모델명 */
    private String eqpmKdCd;   	 /* 장비종류코드 */
    private String srlNo;        /* 시리얼번호 */
    private String pyDt;         /* 지급일자 */
    private String wdrwDt;       /* 회수일자 */
}
