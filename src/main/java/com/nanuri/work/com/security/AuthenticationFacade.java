package com.nanuri.work.com.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.nanuri.work.com.login.vo.UserDetailsVO;

@Component
public class AuthenticationFacade {
	
	public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public UserDetailsVO getDetails() {
        Authentication auth = getAuthentication();
        return (UserDetailsVO)auth.getPrincipal();
    }

}
