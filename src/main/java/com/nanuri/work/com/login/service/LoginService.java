package com.nanuri.work.com.login.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.nanuri.work.business.member.dto.MemberDTO;
import com.nanuri.work.com.code.MemberLevelCode;
import com.nanuri.work.com.login.mapper.LoginMapper;
import com.nanuri.work.com.login.vo.UserDetailsVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class LoginService implements UserDetailsService {
	
	public static String ROLE_PREFIX = "ROLE_";
	
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
		MemberDTO memberDTO = loginMapper.getLoginUserDetailsVO(loginId);
		return UserDetailsVO.of(memberDTO, getGrantedAuthorities(memberDTO));
	}
	
	private List<GrantedAuthority> getGrantedAuthorities(MemberDTO memberDTO) {
		MemberLevelCode memberLevel = memberDTO.getUserAutrNm();
		List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(ROLE_PREFIX.concat(memberLevel.name()));
		return authorities;
	}

}
