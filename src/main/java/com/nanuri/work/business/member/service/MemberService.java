package com.nanuri.work.business.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.member.dto.CertificateDTO;
import com.nanuri.work.business.member.dto.CommonCodeDTO;
import com.nanuri.work.business.member.dto.SchoolCareerDTO;
import com.nanuri.work.business.member.mapper.MemberMapper;
import com.nanuri.work.com.security.AuthenticationFacade;

@Service
public class MemberService {

	@Autowired
	private MemberMapper memberMapper;

	@Autowired
	private AuthenticationFacade facade;

	public List<CommonCodeDTO> getCommonCodeList(CommonCodeDTO params) {
		return memberMapper.selectCommonCodeList(params);
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

	public boolean deleteSchoolCareer(SchoolCareerDTO params) {
		int queryResult = 0;

		SchoolCareerDTO schoolCareer = memberMapper.selectSchoolCareerDetail(params.getSeqNo());

		if (schoolCareer != null && "N".equals(schoolCareer.getDelYn())) {
			params.setMdfpNm(facade.getDetails().getUsername());
			queryResult = memberMapper.deleteSchoolCareer(params);
		}

		return (queryResult == 1) ? true : false;
	}

	public SchoolCareerDTO getSchoolCareerDetail(Long seqNo) {
		return memberMapper.selectSchoolCareerDetail(seqNo);
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

}
