package com.nanuri.work.com.interceptor;

import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.AsyncHandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nanuri.work.com.login.vo.UserDetailsVO;
import com.nanuri.work.com.service.AuthorizationService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class TokenChecker implements AsyncHandlerInterceptor {
	private final ObjectMapper objectMapper;
	private final AuthorizationService authService;
	private final UserDetailsVO userVo;
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		log.debug("################################################################################");
		log.debug(request.getRequestURI() + " ==> START");
		log.debug("################################################################################");
		log.debug("Token Checker Interceptor");
		
		if(request.getMethod().equals("OPTIONS")) {
			return true;
		}
		
		String authorization = request.getHeader("Authorization");
		log.debug("preHandle authorization : {}", authorization);
		
		if(StringUtils.hasText(authorization)) {
			log.debug("preHandle authorization hasText");
			if(!authService.setAuth(authorization)) {
//				TODO => 정상적인 토큰이 아님을 표시, 강경모
			}
		} else {
//			TODO => 토큰을 찾을 수 없음을 표시, 강경모
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		log.debug("################################################################################");
		log.debug(request.getRequestURI() + " ==> END");
		log.debug("################################################################################");
		
		// TODO => device token vs fcm token, 강경모
		response.setHeader("Authorization", userVo.getDeviceToken());
	}

	@Override
	@Transactional(propagation = Propagation.REQUIRES_NEW)
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		log.debug("********************************************************************************");
		String requestBody = "";
		String responseBody = "";
		
		if(request.getClass().getName().contains("SecurityContextHolderAwareRequestWrapper")) {
			return;
		}
		
		final ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;
		final ContentCachingResponseWrapper cachingResponse = (ContentCachingResponseWrapper) response;
		
		if(cachingRequest.getContentType() != null) {
			if(cachingRequest.getContentType().contains("application/json")) {
				if(cachingRequest.getContentAsByteArray() != null && cachingRequest.getContentAsByteArray().length != 0) {
					requestBody = objectMapper.readTree(cachingRequest.getContentAsByteArray()).toString();
					log.debug("***** Request Body : {}", requestBody);
				}
			} else {
				if(!request.getParameterMap().isEmpty() && !cachingRequest.getContentType().contains("Content-Type: multipart/form-data")) {
					requestBody = logPrintParameter(request);
					log.debug("***** Request Body : {}", requestBody);
				}
			}
		}
		
		if(cachingResponse.getContentType() != null && cachingResponse.getContentType().contains("application/json")) {
			if(cachingResponse.getContentAsByteArray() != null && cachingResponse.getContentAsByteArray().length != 0) {
				responseBody = objectMapper.readTree(cachingResponse.getContentAsByteArray()).toString();
				log.debug("***** Response Body : {}", responseBody);
			}
		}
		log.debug("********************************************************************************");
	}
	
	private String logPrintParameter(HttpServletRequest request) {
		String param = "";
		Set<String> keySet = request.getParameterMap().keySet();
		
		for (String key : keySet) {
			param += key + ":" + request.getParameter(key) + ",";
		}
		if(!param.isEmpty()) {
			param = param.substring(0, param.length() - 1);
		}
		
		return param;
	}
	
	
}
