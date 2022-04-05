package com.nanuri.work.business.member.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.business.member.dto.CareerhistoryDTO;
import com.nanuri.work.business.member.dto.CertificateDTO;
import com.nanuri.work.business.member.dto.CommonCodeDTO;
import com.nanuri.work.business.member.dto.SchoolCareerDTO;

@Mapper
public interface MemberMapper {
	
	/* 학력 */
	public int insertSchoolCareer(SchoolCareerDTO params);
	public List<CommonCodeDTO> selectCommonCodeList(CommonCodeDTO params); 
	public List<SchoolCareerDTO> selectSchoolCareerList(String userId);
	public SchoolCareerDTO selectSchoolCareerDetail(Long seqNo);
	public int updateSchoolCareer(SchoolCareerDTO params);
	public int deleteSchoolCareer(SchoolCareerDTO params);
	
	/* 자격증 */
	public int insertCertificate(CertificateDTO params);
	public List<CertificateDTO> selectCertificateList(String userId);
	public CertificateDTO selectCertificateDetail(Long seqNo);
	public int updateCertificate(CertificateDTO params);
	public int deleteCertificate(CertificateDTO params);
	
	/* 근무이력 */
	
	/* 경력이력 */
	public int insertCareerhistory(CareerhistoryDTO params);
	public List<CareerhistoryDTO> selectCareerhistoryList(String userId);
	public CareerhistoryDTO selectCareerhistoryDetail(Long seqNo);
	public int updateCareerhistory(CareerhistoryDTO params);
	public int deleteCareerhistory(CareerhistoryDTO params);
	
}
