package com.nanuri.work.com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.work.com.login.service.LoginService;
import com.nanuri.work.com.login.vo.UserDetailsVO;
import com.nanuri.work.com.security.AdminAuthenticationProvider;

@RestController
public class LoginApiController {

	@Autowired
	private LoginService loginService;
	
	@PostMapping(value = "")
	public UserDetailsVO login() {
		return null;
	}
	
}
