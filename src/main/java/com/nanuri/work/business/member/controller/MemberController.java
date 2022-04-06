package com.nanuri.work.business.member.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MemberController {

	@GetMapping(value = "/admin/employeeList")
	public String getEmployeeListPage() {
		return "business/employee_list";
	}
	
	@GetMapping(value = "/employee/index")
	public String getEmployeeIndexPage() {
		return "business/employee/index";
	}
	
	/**
	 * 기본정보 입력
	 * @return
	 */
	@GetMapping(value = "/employee/basicInfoWrite")
	public String getBasicInfoWritePage() {
		return "business/employee/basic_add";
	}
	
	/**
	 * 학력 입력
	 * @return
	 */
	@GetMapping(value = "/employee/schoolCareerWrite")
	public String getSchoolCareerWritePage() {
		return "business/employee/education_add";
	}
	
	/**
	 * 자격증 입력
	 * @return
	 */
	@GetMapping(value = "/employee/certificateWrite")
	public String getCertificateWritePage() {
		return "business/employee/certificate_add";
	}
	
	/**
	 * 회사소속이력 입력
	 * @return
	 */
	@GetMapping(value = "/employee/workhistoryWrite")
	public String getWokinghistoryWritePage() {
		return "business/employee/workhistory_add"; 
	}
	
	/**
	 * 교육이수 입력
	 * @return
	 */
	@GetMapping(value = "/employee/educationWrite")
	public String getEducationWritePage() {
		return "business/employee/complete_add";
	}
	
	/**
	 * 대내외 수상경력 입력
	 * @return
	 */
	@GetMapping(value = "/employee/awardWrite")
	public String getAwardWritePage() {
		return "business/employee/award_add";
	}
	
	/**
	 * 외국어 능력 입력
	 * @return
	 */
	@GetMapping(value = "/employee/languageWrite")
	public String getLanguageWritePage() {
		return "business/employee/language_add";
	}
	
	@GetMapping(value = "/employee/skillWrite")
	public String getSkillWritePage() {
		return "business/employee/skill_add";
	}
	
	/**
	 * 프로젝트이력 입력
	 * @return
	 */
	@GetMapping(value = "/employee/careerhistoryWrite")
	public String getCareerhistoryWritePage() {
		return "business/employee/careerhistory_add";
	}
	
}
