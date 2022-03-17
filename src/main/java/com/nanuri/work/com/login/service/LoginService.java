package com.nanuri.work.com.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.nanuri.work.com.login.mapper.LoginMapper;
import com.nanuri.work.com.login.vo.UserDetailsVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class LoginService implements UserDetailsService {
	
	@Autowired
	private LoginMapper loginMapper;

	/**
	 * 회원계정정보 조회
	 *
	 * @param {String} loginId 회원ID
	 * @return {UserDetailsVO} 계정정보
	 */
	@Override
	public UserDetailsVO loadUserByUsername(String loginId) {
		return loginMapper.getLoginUserDetailsVO(loginId);
	}

}
