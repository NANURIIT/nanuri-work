package com.nanuri.work.business.member.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.member.dto.CareerhistoryDTO;
import com.nanuri.work.business.member.dto.CertificateDTO;
import com.nanuri.work.business.member.dto.CommonCodeDTO;
import com.nanuri.work.business.member.dto.EducationDTO;
import com.nanuri.work.business.member.dto.SchoolCareerDTO;
import com.nanuri.work.business.member.dto.WorkhistoryDTO;
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
	
	public List<CertificateDTO> getCertificateList(){
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
	
	public List<WorkhistoryDTO> getWorkhistoryList(){
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
	
	public List<EducationDTO> getEducationList(){
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
	
	public List<CareerhistoryDTO> getCareerhistoryList(){
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
