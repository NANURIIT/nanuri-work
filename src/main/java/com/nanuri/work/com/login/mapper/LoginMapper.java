package com.nanuri.work.com.login.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.business.member.dto.MemberDTO;

@Mapper
public interface LoginMapper {
	
	/**
	 * 회원계정정보 조회
	 *
	 * @param operatorId
	 * @return MemberDTO
	 */
	public MemberDTO getLoginUserDetailsVO(String loginId);

}
