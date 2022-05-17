package com.nanuri.work.com.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.nanuri.work.business.member.dto.MemberDTO;
import com.nanuri.work.com.login.mapper.LoginMapper;
import com.nanuri.work.com.login.vo.UserDetailsVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthorizationService {

	private final LoginMapper loginMapper;
//	private final UserDetailsVO userVo;
	
	public boolean setAuth(String auth) {
		log.debug(">>>>>>> setAuth auth : {}", auth);
		String token = "";
		String testUserNo = getTestUserNo(auth);
		log.debug(">>>>>>> testUserNo : " + testUserNo);
		
		Optional<UserDetailsVO> userVoOpt = loginMapper.getUserDetailsByToken(auth);
		
		if(userVoOpt.isEmpty()) {
			log.debug(">>>>>>> userTokenInfo is null");
			return false;
		} else {
			log.debug(">>>>>>> userTokenInfo get");
			token = userVoOpt.get().getDeviceToken();
			
			log.debug(">>>>>>> New token : " + token);
		}
		
		
		return true;
	}
	
	private String getTestUserNo(String testToken) {
		if ("testToken01".equals(testToken)) {
			return "2000009001";
		} else if ("testToken02".equals(testToken)) {
			return "2000009002";
		} else if ("testToken03".equals(testToken)) {
			return "2000009003";
		} else if ("testToken04".equals(testToken)) {
			return "2000009004";
		} else if ("testToken05".equals(testToken)) {
			return "2000009005";
		} else if ("testToken06".equals(testToken)) {
			return "2000009006";
		} else if ("testToken07".equals(testToken)) {
			return "2000009007";
		} else if ("testToken08".equals(testToken)) {
			return "2000009008";
		} else if ("testToken09".equals(testToken)) {
			return "2000009009";
		}
		return null;
	}
}
