package com.nanuri.work.com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.work.com.login.service.LoginService;
import com.nanuri.work.com.login.vo.UserDetailsVO;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class LoginApiController {
	
	@Autowired
	private LoginService loginService;
	
	@GetMapping(value = "/v1/login")
	public UserDetailsVO login(String userId, String pwd) {
		log.debug("userId : " + userId);
		log.debug("pwd : " + pwd);
		return loginService.loadUserByUsername(userId);
	}
	
}
