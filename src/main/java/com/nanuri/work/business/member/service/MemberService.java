package com.nanuri.work.business.member.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.common.paging.PaginationInfo;
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
import com.nanuri.work.business.member.mapper.MemberMapper;
import com.nanuri.work.business.member.vo.EmployeeVO;
import com.nanuri.work.com.code.MemberLevelCode;
import com.nanuri.work.com.login.mapper.LoginMapper;
import com.nanuri.work.com.security.AuthenticationFacade;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MemberService {

	@Autowired
	private MemberMapper memberMapper;
	
	@Autowired
	private LoginMapper loginMapper;

	@Autowired
	private AuthenticationFacade facade;

	@Autowired
	private PasswordEncoder passwordEncoder;

	/**
	 * 공통코드 호출
	 * 
	 * @return 공통코드 리스트
	 */
	public List<CommonCodeDTO> getCommonCodeList(CommonCodeDTO params) {
		return memberMapper.selectCommonCodeList(params);
	}

	/**
	 * 신규 직원 등록
	 * 
	 * @param params 신규직원
	 * @return boolean
	 */
	public boolean registerEmployee(MemberDTO params) {

		int queryResult = 0;

		// 아이디는 휴대전화 번호랑 같음.
		params.setUserId(params.getTelNo());

		// 기본 비밀번호는 휴대전화번호랑 같음.
		params.setUserPassword(passwordEncoder.encode(params.getTelNo()));
		
		params.setUserAutrNm(MemberLevelCode.valueOf(params.getBlgDsCd()));

		queryResult = memberMapper.insertEmployee(params);

		return (queryResult > 0);
	}
	
	/**
	 * 직원정보 상세조회
	 * @param params 이름, 전화번호
	 * @return 직원정보
	 */
	public MemberDTO selectEmployeeDetail(MemberDTO params) {
		return memberMapper.selectEmployeeDetail(params);
	}
	
	/**
	 * 직원정보 수정
	 * @param params
	 * @return
	 */
	public boolean updateEmployee(MemberDTO params) {
		int queryResult = 0;
		
		if(facade.getDetails().getUserAutrNm() == MemberLevelCode.ADMIN || 
				facade.getDetails().getUserAutrNm() == MemberLevelCode.ASSISTANT || 
				facade.getDetails().getUserAutrNm() == MemberLevelCode.EMPLOYEE) {
			queryResult = memberMapper.updateEmployee(params);
		}
		
		return (queryResult > 0);
	}

	/**
	 * 비밀번호 변경
	 * @param params HashMap<"currPwd", 현재 비밀번호>
	 * @param params HashMap<"newPwd", 새 비밀번호>
	 * @return boolean 변경여부
	 */
	public boolean changePassword(HashMap<String, String> params) {
		
		int queryResult = 0;
		
		MemberDTO member = loginMapper.getLoginUserDetailsVO(facade.getDetails().getUserId());
		
		if(!passwordEncoder.matches(params.get("currPwd"), member.getUserPassword())) {
			return false;
		}
		
		params.put("userId", facade.getDetails().getUserId());
		params.put("newPwd", passwordEncoder.encode(params.get("newPwd")));
		queryResult = memberMapper.changePassword(params);
		return (queryResult > 0);
	}

	/**
	 * 직원 목록 출력
	 * 
	 * @return 직원목록 리스트
	 */
	public HashMap<String, Object> getEmployeeList(EmployeeVO params) {
		HashMap<String, Object> resultMap = new HashMap<String, Object>();
		int employeeTotalCount = memberMapper.selectTotalCountEmployee();

		PaginationInfo paginationInfo = new PaginationInfo(params);
		paginationInfo.setTotalRecordCount(employeeTotalCount);

		params.setPaginationInfo(paginationInfo);

		if (employeeTotalCount > 0) {
			resultMap.put("employeeTotalCount", employeeTotalCount);
			resultMap.put("employeeList", memberMapper.selectEmployeeList(params));
		}
		return resultMap;
	}

	/* 기본정보 */

	public List<BasicInfoDTO> getBasicInfoList() {
		return memberMapper.selectBasicInfoList();
	}

	public BasicInfoDTO getBasicInfoDetail() {
		return memberMapper.selectBasicInfoDetail(facade.getDetails().getUserId());
	}

	public boolean updateBasicInfo(BasicInfoDTO params) {
		params.setUserId(facade.getDetails().getUserId());
		params.setUserAutrNm(MemberLevelCode.valueOf(params.getBlgDsCd()));
		return memberMapper.updateBasicInfo(params) > 0;
	}

	/* 학력 */

	public boolean registerSchoolCareer(SchoolCareerDTO params) {
		int queryResult = 0;

		if (params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.updateSchoolCareer(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			params.setUserId(facade.getDetails().getUserId());
			queryResult = memberMapper.insertSchoolCareer(params);
		}

		return (queryResult > 0);
	}

	public List<SchoolCareerDTO> getSchoolCareerList() {
		return memberMapper.selectSchoolCareerList(facade.getDetails().getUserId());
	}

	public SchoolCareerDTO getSchoolCareerDetail(Long seqNo) {
		return memberMapper.selectSchoolCareerDetail(seqNo);
	}

	public boolean deleteSchoolCareer(SchoolCareerDTO params) {
		int queryResult = 0;

		SchoolCareerDTO schoolCareer = memberMapper.selectSchoolCareerDetail(params.getSeqNo());

		if (schoolCareer != null && "N".equals(schoolCareer.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.deleteSchoolCareer(params);
		}

		return (queryResult == 1) ? true : false;
	}

	/* 자격증 */

	public boolean registerCertificate(CertificateDTO params) {
		int queryResult = 0;

		if (params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.updateCertificate(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			params.setUserId(facade.getDetails().getUserId());
			queryResult = memberMapper.insertCertificate(params);
		}

		return (queryResult > 0);
	}

	public List<CertificateDTO> getCertificateList() {
		return memberMapper.selectCertificateList(facade.getDetails().getUserId());
	}

	public CertificateDTO getCertificateDetail(Long seqNo) {
		return memberMapper.selectCertificateDetail(seqNo);
	}

	public boolean deleteCertificate(CertificateDTO params) {
		int queryResult = 0;

		CertificateDTO certificate = memberMapper.selectCertificateDetail(params.getSeqNo());

		if (certificate != null && "N".equals(certificate.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.deleteCertificate(params);
		}

		return (queryResult == 1) ? true : false;
	}

	/* 회사소속이력 */
	public boolean registerWorkhistory(WorkhistoryDTO params) {
		int queryResult = 0;

		if (params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.updateWorkhistory(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			params.setUserId(facade.getDetails().getUserId());
			queryResult = memberMapper.insertWorkhistory(params);
		}

		return (queryResult > 0);
	}

	public List<WorkhistoryDTO> getWorkhistoryList() {
		return memberMapper.selectWorkhistoryList(facade.getDetails().getUserId());
	}

	public WorkhistoryDTO getWorkhistoryDetail(Long seqNo) {
		return memberMapper.selectWorkhistoryDetail(seqNo);
	}

	public boolean deleteWorkhistory(WorkhistoryDTO params) {
		int queryResult = 0;

		WorkhistoryDTO workhistory = memberMapper.selectWorkhistoryDetail(params.getSeqNo());

		if (workhistory != null && "N".equals(workhistory.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.deleteWorkhistory(params);
		}

		return (queryResult == 1) ? true : false;
	}

	/* 교육이수 */
	public boolean registerEducation(EducationDTO params) {
		int queryResult = 0;

		if (params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.updateEducation(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			params.setUserId(facade.getDetails().getUserId());
			queryResult = memberMapper.insertEducation(params);
		}

		return (queryResult > 0);
	}

	public List<EducationDTO> getEducationList() {
		return memberMapper.selectEducationList(facade.getDetails().getUserId());
	}

	public EducationDTO getEducationDetail(Long seqNo) {
		return memberMapper.selectEducationDetail(seqNo);
	}

	public boolean deleteEducation(EducationDTO params) {
		int queryResult = 0;

		EducationDTO education = memberMapper.selectEducationDetail(params.getSeqNo());

		if (education != null && "N".equals(education.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.deleteEducation(params);
		}

		return (queryResult == 1) ? true : false;
	}

	/* 대내외 수상경력 */
	public boolean registerAward(AwardDTO params) {
		int queryResult = 0;

		if (params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.updateAward(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			params.setUserId(facade.getDetails().getUserId());
			queryResult = memberMapper.insertAward(params);
		}

		return (queryResult > 0);
	}

	public List<AwardDTO> getAwardList() {
		return memberMapper.selectAwardList(facade.getDetails().getUserId());
	}

	public AwardDTO getAwardDetail(Long seqNo) {
		return memberMapper.selectAwardDetail(seqNo);
	}

	public boolean deleteAward(AwardDTO params) {
		int queryResult = 0;

		AwardDTO award = memberMapper.selectAwardDetail(params.getSeqNo());

		if (award != null && "N".equals(award.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.deleteAward(params);
		}

		return (queryResult == 1) ? true : false;
	}

	/* 외국어 능력 */
	public boolean registerLanguage(LanguageDTO params) {
		int queryResult = 0;

		if (params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.updateLanguage(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			params.setUserId(facade.getDetails().getUserId());
			queryResult = memberMapper.insertLanguage(params);
		}

		return (queryResult > 0);
	}

	public List<LanguageDTO> getLanguageList() {
		return memberMapper.selectLanguageList(facade.getDetails().getUserId());
	}

	public LanguageDTO getLanguageDetail(Long seqNo) {
		return memberMapper.selectLanguageDetail(seqNo);
	}

	public boolean deleteLanguage(LanguageDTO params) {
		int queryResult = 0;

		LanguageDTO language = memberMapper.selectLanguageDetail(params.getSeqNo());

		if (language != null && "N".equals(language.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.deleteLanguage(params);
		}

		return (queryResult == 1) ? true : false;
	}

	/* 사용가능기술(언어) */
	public boolean registerSkill(SkillDTO params) {
		int queryResult = 0;

		if (params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.updateSkill(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			params.setUserId(facade.getDetails().getUserId());
			queryResult = memberMapper.insertSkill(params);
		}

		return (queryResult > 0);
	}

	public List<SkillDTO> getSkillList() {
		return memberMapper.selectSkillList(facade.getDetails().getUserId());
	}

	public SkillDTO getSkillDetail(Long seqNo) {
		return memberMapper.selectSkillDetail(seqNo);
	}

	public boolean deleteSkill(SkillDTO params) {
		int queryResult = 0;

		SkillDTO skill = memberMapper.selectSkillDetail(params.getSeqNo());

		if (skill != null && "N".equals(skill.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.deleteSkill(params);
		}

		return (queryResult == 1) ? true : false;
	}

	/* 프로젝트이력 */
	public boolean registerCareerHistory(CareerhistoryDTO params) {
		int queryResult = 0;

		if (params.getSeqNo() != null) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.updateCareerhistory(params);
		} else {
			params.setRgmnNm(facade.getDetails().getUsername());
			params.setUserId(facade.getDetails().getUserId());
			queryResult = memberMapper.insertCareerhistory(params);
		}

		return (queryResult > 0);
	}

	public List<CareerhistoryDTO> getCareerhistoryList() {
		return memberMapper.selectCareerhistoryList(facade.getDetails().getUserId());
	}

	public CareerhistoryDTO getCareerhistoryDetail(Long seqNo) {
		return memberMapper.selectCareerhistoryDetail(seqNo);
	}

	public boolean deleteCareerhistory(CareerhistoryDTO params) {
		int queryResult = 0;

		CareerhistoryDTO certificate = memberMapper.selectCareerhistoryDetail(params.getSeqNo());

		if (certificate != null && "N".equals(certificate.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.deleteCareerhistory(params);
		}

		return (queryResult == 1) ? true : false;
	}
}
