package com.nanuri.work.com.login.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nanuri.work.com.login.vo.UserDetailsVO;

@RestController
public class LoginApiController {
	
	@PostMapping(value = "")
	public UserDetailsVO login() {
		return null;
	}
	
}
