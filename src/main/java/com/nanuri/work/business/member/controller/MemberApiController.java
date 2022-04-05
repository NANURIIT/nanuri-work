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

import com.nanuri.work.business.member.dto.CommonCodeDTO;
import com.nanuri.work.business.member.dto.SchoolCareerDTO;
import com.nanuri.work.business.member.service.MemberService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping(value = "/employee")
public class MemberApiController {

	@Autowired
	private MemberService memberService;
	
	@GetMapping(value = "/getCommonCode")
	public List<CommonCodeDTO> getCommonCodeList(@ModelAttribute("params") CommonCodeDTO params) {
		return memberService.getCommonCodeList(params);
	}
	
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
}
