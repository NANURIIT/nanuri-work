package com.nanuri.work.business.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

	@GetMapping(value = "/dashboard/view")
	public String getIndexPage() {
		return "business/index";
	}
	
}
