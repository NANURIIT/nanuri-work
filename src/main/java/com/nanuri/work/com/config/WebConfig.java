package com.nanuri.work.com.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.nanuri.work.com.interceptor.LoggerInterceptor;
import com.nanuri.work.com.interceptor.TokenChecker;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Configuration
public class WebConfig implements WebMvcConfigurer {
	private final TokenChecker tokenChecker;
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoggerInterceptor())
				.excludePathPatterns("/css/**"
									,"/fonts/**"
									,"/img/**"
									,"/js/**"
									,"/error"
									,"/static/*"
									,"/favicon.ico"
									); // Interceptor 예외
		
		registry.addInterceptor(tokenChecker).addPathPatterns("/**").excludePathPatterns(
				"/login"
				,"/fonts/**"
				,"/img/**"
				,"/js/**"
				,"/favicon.ico"
				,"/error"
		);
	}

}
