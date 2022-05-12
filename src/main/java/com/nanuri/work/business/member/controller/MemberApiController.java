package com.nanuri.work.business.member.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
import com.nanuri.work.business.member.service.MemberService;
import com.nanuri.work.business.member.vo.EmployeeVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/employee")
public class MemberApiController {

	@Autowired
	private MemberService memberService;
	
	/**
	 * 공통코드 호출
	 * @param params
	 * @return
	 */
	@GetMapping(value = "/getCommonCode")
	public List<CommonCodeDTO> getCommonCodeList(@ModelAttribute("params") CommonCodeDTO params) {
		return memberService.getCommonCodeList(params);
	}
	
	/**
	 * 신규 직원 등록
	 * @param params 신규직원
	 * @return 결과 메세지
	 */
	@PostMapping(value = "/registerEmployee")
	public String registerEmployee(@RequestBody MemberDTO params) {
		String message = "";
		
		try {
			boolean isRegistered = memberService.registerEmployee(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	/**
	 * 직원 정보 상세 조회
	 * @param params
	 * @return
	 */
	@GetMapping(value = "/getEmployeeDetail")
	public MemberDTO getEmployeeDetail(MemberDTO params) {
		return memberService.selectEmployeeDetail(params);
	}
	
	/**
	 * 직원정보 수정
	 * @param params
	 * @return
	 */
	@PatchMapping(value = "/updateEmployee")
	public String updateEmployee(@RequestBody MemberDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.updateEmployee(params);
			if(isRegistered == false){
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	/**
	 * 비밀번호 변경
	 * @param params
	 * @return
	 */
	@PatchMapping(value = "/changePassword")
	public boolean changePassword(@RequestBody HashMap<String, String> params) {
		return memberService.changePassword(params);
	}
	
	/**
	 * 직원목록 호출
	 * @param params
	 * @return 직원목록
	 */
	@GetMapping("/employeeList")
	public HashMap<String, Object> getEmployeeList(@ModelAttribute("params") EmployeeVO params){
		return memberService.getEmployeeList(params);
	}
	
	/* 기본정보 */
	
	@GetMapping(value = "/basicInfoList")
	public List<BasicInfoDTO> getbasicInfoList(){
		return memberService.getBasicInfoList();
	}
	
	@GetMapping(value = "/basicInfoDetail")
	public BasicInfoDTO getBasicInfoDetail() {
		return memberService.getBasicInfoDetail();
	}
	
	@PostMapping(value = "/basicInfoUpdate")
	public String updateBasicInfo(@RequestBody BasicInfoDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.updateBasicInfo(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	/* 학력 */
	
	@PostMapping(value = "/schoolCareerWrite")
	public String registerSchoolCareer(@RequestBody SchoolCareerDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.registerSchoolCareer(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	@GetMapping(value = "/schoolCareerList")
	public List<SchoolCareerDTO> getSchoolCareerList(){
		return memberService.getSchoolCareerList();
	}
	
	@GetMapping(value = "/schoolCareerDetail/{seqNo}")
	public SchoolCareerDTO schoolCareerDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {		
		return memberService.getSchoolCareerDetail(seqNo);
	}
	
	@DeleteMapping(value = "/schoolCareerDelete")
	public boolean deleteSchoolCareer(@RequestBody SchoolCareerDTO params) {
		return memberService.deleteSchoolCareer(params);
	}
	
	/* 자격증 */
	
	@PostMapping(value = "/certificateWrite")
	public String registerCertificate(@RequestBody CertificateDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.registerCertificate(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	@GetMapping(value = "/certificateList")
	public List<CertificateDTO> getCertificateList(){
		return memberService.getCertificateList();
	}
	
	@GetMapping(value = "/certificateDetail/{seqNo}")
	public CertificateDTO getCertificateDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {		
		return memberService.getCertificateDetail(seqNo);
	}
	
	@DeleteMapping(value = "/certificateDelete")
	public boolean deleteCertificate(@RequestBody CertificateDTO params) {
		return memberService.deleteCertificate(params);
	}
	
	/* 회사소속이력 */
	
	@PostMapping(value = "/workhistoryWrite")
	public String registerWorkhistory(@RequestBody WorkhistoryDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.registerWorkhistory(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	@GetMapping(value = "/workhistoryList")
	public List<WorkhistoryDTO> getWorkhistoryList(){
		return memberService.getWorkhistoryList();
	}
	
	@GetMapping(value = "/workhistoryDetail/{seqNo}")
	public WorkhistoryDTO getWorkhistoryDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {		
		return memberService.getWorkhistoryDetail(seqNo);
	}
	
	@DeleteMapping(value = "/workhistoryDelete")
	public boolean deleteWorkhistory(@RequestBody WorkhistoryDTO params) {
		return memberService.deleteWorkhistory(params);
	}
	
	/* 교육이수 */
	
	@PostMapping(value = "/educationWrite")
	public String registerEducation(@RequestBody EducationDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.registerEducation(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	@GetMapping(value = "/educationList")
	public List<EducationDTO> getEducationList(){
		return memberService.getEducationList();
	}
	
	@GetMapping(value = "/educationDetail/{seqNo}")
	public EducationDTO getEducationDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {		
		return memberService.getEducationDetail(seqNo);
	}
	
	@DeleteMapping(value = "/educationDelete")
	public boolean deleteEducation(@RequestBody EducationDTO params) {
		return memberService.deleteEducation(params);
	}
	
	/* 대내외 수상경력 */
	
	@PostMapping(value = "/awardWrite")
	public String registerAward(@RequestBody AwardDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.registerAward(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	@GetMapping(value = "/awardList")
	public List<AwardDTO> getAwardList(){
		return memberService.getAwardList();
	}
	
	@GetMapping(value = "/awardDetail/{seqNo}")
	public AwardDTO getAwardDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {		
		return memberService.getAwardDetail(seqNo);
	}
	
	@DeleteMapping(value = "/awardDelete")
	public boolean deleteAward(@RequestBody AwardDTO params) {
		return memberService.deleteAward(params);
	}
	
	/* 외국어 능력 */
	
	@PostMapping(value = "/languageWrite")
	public String registerLanguage(@RequestBody LanguageDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.registerLanguage(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	@GetMapping(value = "/languageList")
	public List<LanguageDTO> getLanguageList(){
		return memberService.getLanguageList();
	}
	
	@GetMapping(value = "/languageDetail/{seqNo}")
	public LanguageDTO getLanguageDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {		
		return memberService.getLanguageDetail(seqNo);
	}
	
	@DeleteMapping(value = "/languageDelete")
	public boolean deleteLanguage(@RequestBody LanguageDTO params) {
		return memberService.deleteLanguage(params);
	}
	
	/* 사용가능기술(언어) */
	
	@PostMapping(value = "/skillWrite")
	public String registerSkill(@RequestBody SkillDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.registerSkill(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	@GetMapping(value = "/skillList")
	public List<SkillDTO> getSkillList(){
		return memberService.getSkillList();
	}
	
	@GetMapping(value = "/skillDetail/{seqNo}")
	public SkillDTO getSkillDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {		
		return memberService.getSkillDetail(seqNo);
	}
	
	@DeleteMapping(value = "/skillDelete")
	public boolean deleteSkill(@RequestBody SkillDTO params) {
		return memberService.deleteSkill(params);
	}
	
	/* 프로젝트이력 */
	
	@PostMapping(value = "/careerhistoryWrite")
	public String registerCareerhistory(@RequestBody CareerhistoryDTO params) {
		String message = "";

		try {
			boolean isRegistered = memberService.registerCareerHistory(params);
			if (isRegistered == false) {
				message = "등록에 실패하였습니다.";
			}
		} catch (Exception e) {
			message = "시스템에 문제가 발생하였습니다.";
			log.error(e.getMessage());
			e.printStackTrace();
		}
		
		return message;
	}
	
	@GetMapping(value = "/careerhistoryist")
	public List<CareerhistoryDTO> getCareerhistoryList(){
		return memberService.getCareerhistoryList();
	}
	
	@GetMapping(value = "/careerhistoryDetail/{seqNo}")
	public CareerhistoryDTO getCareerhistoryDetail(@PathVariable(value = "seqNo", required = true) Long seqNo) {		
		return memberService.getCareerhistoryDetail(seqNo);
	}
	
	@DeleteMapping(value = "/careerhistoryDelete")
	public boolean deleteCareerhistory(@RequestBody CareerhistoryDTO params) {
		return memberService.deleteCareerhistory(params);
	}
	
}
