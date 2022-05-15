package com.nanuri.work.com.login.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.nanuri.work.com.security.AuthenticationFacade;

@Controller
public class LoginController {
	
	@Autowired
	private AuthenticationFacade facade;

	/**
	 * 로그인 - 로그인 화면
	 *
	 * @param
	 * @return view
	 */
	@RequestMapping("/login")
	public String loginPage() {
		return "login";
	}

	/**
	 * 로그인 - 로그인 거부화면
	 *
	 * @param model
	 * @return view
	 */
	@GetMapping("/denied")
	public String deniedPage(@RequestParam String exception, Model model) {
		model.addAttribute("username", facade.getDetails().getUsername());
		model.addAttribute("exception", exception);

		return "/denied";
	}

}
