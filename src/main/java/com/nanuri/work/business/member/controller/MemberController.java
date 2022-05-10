package com.nanuri.work.business.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.nanuri.work.com.security.AuthenticationFacade;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class MemberController {
	
	@Autowired
	private AuthenticationFacade facade;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	/* pc */
	
	/**
	 * root url로 접속시도시 /admin/index 페이지로 redirection시킴
	 * @return
	 */
	@GetMapping(value = "/")
	public String getIndexPage() {
		return "redirect:/admin/index";
	}
	
	/**
	 * 비밀번호 변경 페이지
	 * @return
	 */
	@GetMapping(value = "/admin/changePassword")
	public String getChangePasswordPage() {
		return "business/change_pw";
	}
	
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
	
	/**
	 * 회원정보 출력
	 * @return
	 */
	@GetMapping(value = "/admin/index")
	public String getAdminIndexPage() {	
		// 로그인 시 아이디와 비밀번호가 같은경우(비밀번호가 전화번호일경우) 비밀번호 페이지로 이동시켜 비밀번호 변경을 유도.
		if(passwordEncoder.matches(facade.getDetails().getUserId(), facade.getDetails().getUserPassword())) {
			return "business/change_pw";
		} else {
			return "business/employee/index";
		}
	}
	
	/**
	 * 기본정보 입력
	 * @return
	 */
	@GetMapping(value = "/admin/basicInfoWrite" )
	public String getBasicInfoWrite() {
		return "business/employee/basic_add";
	}
	
	/**
	 * 학력 입력
	 * @return
	 */
	@GetMapping(value = "/admin/schoolCareerWrite")
	public String getSchoolCareerWritePage() {
		return "business/employee/education_add";
	}
	
	/**
	 * 자격증 입력
	 * @return
	 */
	@GetMapping(value = "/admin/certificateWrite")
	public String getCertificateWritePage() {
		return "business/employee/certificate_add";
	}
	
	/**
	 * 회사소속이력 입력
	 * @return
	 */
	@GetMapping(value = "/admin/workhistoryWrite")
	public String getWorkhistoryWritePage() {
		return "business/employee/workhistory_add";
	}
	
	/**
	 * 교육이수 입력
	 * @return
	 */
	@GetMapping(value = "/admin/educationWrite")
	public String getEducationWritePage() {
		return "business/employee/complete_add";
	}
	
	/**
	 * 대내외 수상경력 입력
	 * @return
	 */
	@GetMapping(value = "/admin/awardWrite")
	public String getAwardWritePage() {
		return "business/employee/award_add";
	}
	
	/**
	 * 외국어 능력 입력
	 * @return
	 */
	@GetMapping(value = "/admin/languageWrite")
	public String getLanguageWritePage() {
		return "business/employee/language_add";
	}
	
	/**
	 * 사용가능기술(언어) 입력
	 * @return
	 */
	@GetMapping(value = "/admin/skillWrite")
	public String getSkillWritePage() {
		return "business/employee/skill_add";
	}
	
	/**
	 * 프로젝트이력 입력
	 * @return
	 */
	@GetMapping(value = "/admin/careerhistoryWrite")
	public String getCareerhistoryWritePage() {
		return "business/employee/careerhistory_add";
	}
	
	
	/* mobile */
	
	/**
	 * 회원정보 출력
	 * @return
	 */
	@GetMapping(value = "/mobile/index")
	public String getMobileEmployeeIndexPage() {
		return "business/mobile/employee/index";
	}
	
	/**
	 * 회원정보 리스트 출력
	 * @return
	 */
	@GetMapping(value = "/mobile/employeeList")
	public String getMobileEmployeeListPage() {
		return "business/mobile/employee_list";
	}
	
	/**
	 * 직원 등록
	 * @return
	 */
	@GetMapping(value = "/mobile/employeeAdd")
	public String getMobileEmployeeAddPage() {
		return "business/mobile/employee/employee_add";
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
