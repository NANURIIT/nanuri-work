package com.nanuri.work.com.login.mapper;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.business.member.dto.MemberDTO;
import com.nanuri.work.com.login.vo.UserDetailsVO;

@Mapper
public interface LoginMapper {
	
	/**
	 * 회원계정정보 조회
	 *
	 * @param operatorId
	 * @return MemberDTO
	 */
	public MemberDTO getLoginUserDetailsVO(String loginId);
	
	public Optional<UserDetailsVO> getUserDetailsByToken(String auth);

}
