package com.nanuri.work.business.member.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.work.business.member.dto.CareerhistoryDTO;
import com.nanuri.work.business.member.dto.CertificateDTO;
import com.nanuri.work.business.member.dto.CommonCodeDTO;
import com.nanuri.work.business.member.dto.EducationDTO;
import com.nanuri.work.business.member.dto.SchoolCareerDTO;
import com.nanuri.work.business.member.dto.WorkhistoryDTO;
import com.nanuri.work.business.member.service.MemberService;

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
