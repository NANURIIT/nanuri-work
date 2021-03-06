package com.nanuri.work.com.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Aspect
public class LoggerAspect {
	
	@Around("execution(* com.nanuri.work.business..controller.*Controller.*(..)) and "
			+ "!execution(* com.nanuri.work.business..controller.LoginController.*(..)) or "
			+ "execution(* com.nanuri.work.business..service.*Service.*(..)) or "
			+ "execution(* com.nanuri.work.business..repository.*Repository.*(..)) or "
			+ "execution(* com.nanuri.work.business..mapper.*Mapper.*(..))")
	public Object printLog(ProceedingJoinPoint joinPoint) throws Throwable {

		String type = "";
		String name = joinPoint.getSignature().getDeclaringTypeName();

		if (name.contains("Controller") == true) {
			type = "##### Controller ===> ";
		}

		if (name.contains("Service") == true) {
			type = "##### Service    ===> ";
		}

		if (name.contains("Repository") == true) {
			type = "##### Repository ===> ";
		}

		if (name.contains("Mapper") == true) {
			type = "##### Mapper     ===> ";
		}

		log.debug(type + name + "." + joinPoint.getSignature().getName() + "()");
		return joinPoint.proceed();
	}

}
