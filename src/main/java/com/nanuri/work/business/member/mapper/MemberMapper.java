package com.nanuri.work.business.member.mapper;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.nanuri.work.business.member.dto.AwardDTO;
import com.nanuri.work.business.member.dto.BasicInfoDTO;
import com.nanuri.work.business.member.dto.CareerhistoryDTO;
import com.nanuri.work.business.member.dto.CertificateDTO;
import com.nanuri.work.business.member.dto.CommonCodeDTO;
import com.nanuri.work.business.member.dto.EducationDTO;
import com.nanuri.work.business.member.dto.LanguageDTO;
import com.nanuri.work.business.member.dto.MemberDTO;
import com.nanuri.work.business.member.dto.SchoolCareerDTO;
import com.nanuri.work.business.member.dto.SkillDTO;
import com.nanuri.work.business.member.dto.WorkhistoryDTO;
import com.nanuri.work.business.member.vo.EmployeeVO;

@Mapper
public interface MemberMapper {
	
	public List<EmployeeVO> selectEmployeeList(EmployeeVO params);		/* 직원 목록 출력 */
	public int selectTotalCountEmployee();
	public int insertEmployee(MemberDTO params);						/* 직원 등록 */
	public MemberDTO selectEmployeeDetail(MemberDTO params);					/* 직원 상세조회 */
	public int changePassword(HashMap<String, String> params);			/* 비밀번호 변경 */
	
	/* 기본정보 */
	public int insertBasicInfo(BasicInfoDTO params);
	public List<BasicInfoDTO> selectBasicInfoList();
	public BasicInfoDTO selectBasicInfoDetail(String userId);
	public int updateBasicInfo(BasicInfoDTO params);
	
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
	
	/* 회사소속이력 */
	public int insertWorkhistory(WorkhistoryDTO params);
	public List<WorkhistoryDTO> selectWorkhistoryList(String userId);
	public WorkhistoryDTO selectWorkhistoryDetail(Long seqNo);
	public int updateWorkhistory(WorkhistoryDTO params);
	public int deleteWorkhistory(WorkhistoryDTO params);
	
	/* 교육이수 */
	public int insertEducation(EducationDTO params);
	public List<EducationDTO> selectEducationList(String userId);
	public EducationDTO selectEducationDetail(Long seqNo);
	public int updateEducation(EducationDTO params);
	public int deleteEducation(EducationDTO params);
	
	/* 대내외 수상경력 */
	public int insertAward(AwardDTO params);
	public List<AwardDTO> selectAwardList(String userId);
	public AwardDTO selectAwardDetail(Long seqNo);
	public int updateAward(AwardDTO params);
	public int deleteAward(AwardDTO params);
	
	/* 외국어 능력 */
	public int insertLanguage(LanguageDTO params);
	public List<LanguageDTO> selectLanguageList(String userId);
	public LanguageDTO selectLanguageDetail(Long seqNo);
	public int updateLanguage(LanguageDTO params);
	public int deleteLanguage(LanguageDTO params);
	
	/* 사용가능기술(언어) */
	public int insertSkill(SkillDTO params);
	public List<SkillDTO> selectSkillList(String userId);
	public SkillDTO selectSkillDetail(Long seqNo);
	public int updateSkill(SkillDTO params);
	public int deleteSkill(SkillDTO params);
	
	/* 프로젝트이력 */
	public int insertCareerhistory(CareerhistoryDTO params);
	public List<CareerhistoryDTO> selectCareerhistoryList(String userId);
	public CareerhistoryDTO selectCareerhistoryDetail(Long seqNo);
	public int updateCareerhistory(CareerhistoryDTO params);
	public int deleteCareerhistory(CareerhistoryDTO params);
	
}
