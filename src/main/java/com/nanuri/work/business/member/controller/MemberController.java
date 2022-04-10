package com.nanuri.work.business.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MemberController {

	/* pc */
	
	/**
	 * 직원 등록
	 * @return
	 */
	@GetMapping(value = "/admin/employeeAdd")
	public String getEmployeeAddPage() {
		return "business/employee/employee_add";
	}
	
	/**
	 * 직원정보 리스트
	 * @return
	 */
	@GetMapping(value = "/admin/employeeList")
	public String getEmployeeListPage() {
		return "business/employee_list";
	}
	
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/index")
	public String getEmployeeIndexPage() {
		return "business/employee/index";
=======
	/**
	 * 회원정보 출력
	 * @return
	 */
	@GetMapping(value = "/admin/index")
	public String getAdminIndexPage() {
		return "business/index copy";
>>>>>>> Stashed changes
	}
	
	/**
	 * 기본정보 입력
	 * @return
	 */
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/basicInfoWrite")
	public String getBasicInfoWritePage() {
=======
	@GetMapping(value = "/admin/basicInfoWrite" )
	public String getBasicInfoWrite() {
>>>>>>> Stashed changes
		return "business/employee/basic_add";
	}
	
	/**
	 * 학력 입력
	 * @return
	 */
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/schoolCareerWrite")
=======
	@GetMapping(value = "/admin/schoolCareerWrite")
>>>>>>> Stashed changes
	public String getSchoolCareerWritePage() {
		return "business/employee/education_add";
	}
	
	/**
	 * 자격증 입력
	 * @return
	 */
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/certificateWrite")
=======
	@GetMapping(value = "/admin/certificateWrite")
>>>>>>> Stashed changes
	public String getCertificateWritePage() {
		return "business/employee/certificate_add";
	}
	
	/**
	 * 회사소속이력 입력
	 * @return
	 */
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/workhistoryWrite")
	public String getWokinghistoryWritePage() {
		return "business/employee/workhistory_add"; 
=======
	@GetMapping(value = "/admin/workhistoryWrite")
	public String getWorkhistoryWritePage() {
		return "business/employee/workhistory_add";
>>>>>>> Stashed changes
	}
	
	/**
	 * 교육이수 입력
	 * @return
	 */
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/educationWrite")
=======
	@GetMapping(value = "/admin/educationWrite")
>>>>>>> Stashed changes
	public String getEducationWritePage() {
		return "business/employee/complete_add";
	}
	
	/**
	 * 대내외 수상경력 입력
	 * @return
	 */
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/awardWrite")
=======
	@GetMapping(value = "/admin/awardWrite")
>>>>>>> Stashed changes
	public String getAwardWritePage() {
		return "business/employee/award_add";
	}
	
	/**
	 * 외국어 능력 입력
	 * @return
	 */
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/languageWrite")
=======
	@GetMapping(value = "/admin/languageWrite")
>>>>>>> Stashed changes
	public String getLanguageWritePage() {
		return "business/employee/language_add";
	}
	
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/skillWrite")
=======
	/**
	 * 사용가능기술(언어) 입력
	 * @return
	 */
	@GetMapping(value = "/admin/skillWrite")
>>>>>>> Stashed changes
	public String getSkillWritePage() {
		return "business/employee/skill_add";
	}
	
	/**
	 * 프로젝트이력 입력
	 * @return
	 */
<<<<<<< Updated upstream
	@GetMapping(value = "/employee/careerhistoryWrite")
=======
	@GetMapping(value = "/admin/careerhistoryWrite")
>>>>>>> Stashed changes
	public String getCareerhistoryWritePage() {
		return "business/employee/careerhistory_add";
	}
	
	
	/* mobile */
	
	/**
	 * 회원정보 출력
	 * @return
	 */
	@GetMapping(value = "/mobile/employeeInfo")
	public String getMobileEmployeeIndexPage() {
		return "business/mobile/employee/index";
	}
	
	/**
	 * 기본정보 입력
	 * @return
	 */
	@GetMapping(value = "/mobile/basicInfoWrite")
	public String getMobileBasicInfoWritePage() {
		return "business/mobile/employee/basic_add";
	}
	
	/**
	 * 학력 입력
	 * @return
	 */
	@GetMapping(value = "/mobile/schoolCareerWrite")
	public String getMobileSchoolCareerWritePage() {
		return "business/mobile/employee/education_add";
	}
	
	/**
	 * 자격증 입력
	 * @return
	 */
	@GetMapping(value = "/mobile/certificateWrite")
	public String getMobileCertificateWritePage() {
		return "business/mobile/employee/certificate_add";
	}
	
	/**
	 * 회사소속이력 입력
	 * @return
	 */
	@GetMapping(value = "/mobile/workhistoryWrite")
	public String getMobileWokinghistoryWritePage() {
		return "business/mobile/employee/workhistory_add"; 
	}
	
	/**
	 * 교육이수 입력
	 * @return
	 */
	@GetMapping(value = "/mobile/educationWrite")
	public String getMobileEducationWritePage() {
		return "business/mobile/employee/complete_add";
	}
	
	/**
	 * 대내외 수상경력 입력
	 * @return
	 */
	@GetMapping(value = "/mobile/awardWrite")
	public String getMobileAwardWritePage() {
		return "business/mobile/employee/award_add";
	}
	
	/**
	 * 외국어 능력 입력
	 * @return
	 */
	@GetMapping(value = "/mobile/languageWrite")
	public String getMobileLanguageWritePage() {
		return "business/mobile/employee/language_add";
	}
	
	/**
	 * 사용가능기술(언어) 입력
	 * @return
	 */
	@GetMapping(value = "/mobile/skillWrite")
	public String getMobileSkillWritePage() {
		return "business/mobile/employee/skill_add";
	}
	
	/**
	 * 프로젝트이력 입력
	 * @return
	 */
	@GetMapping(value = "/mobile/careerhistoryWrite")
	public String getMobileCareerhistoryWritePage() {
		return "business/mobile/employee/careerhistory_add";
	}
	
}
