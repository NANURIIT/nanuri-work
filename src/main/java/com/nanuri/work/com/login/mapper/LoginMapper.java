package com.nanuri.work.com.login.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.nanuri.work.com.login.vo.UserDetailsVO;

@Mapper
public interface LoginMapper {
	
	/**
	 * 회원계정정보 조회
	 *
	 * @param operatorId
	 * @return UserDetailsVO
	 */
	public UserDetailsVO getLoginUserDetailsVO(String loginId);

}
