package com.nanuri.work.com.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.nanuri.work.com.interceptor.LoggerInterceptor;

@Configuration
public class WebConfig implements WebMvcConfigurer {
	
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
	}

}
