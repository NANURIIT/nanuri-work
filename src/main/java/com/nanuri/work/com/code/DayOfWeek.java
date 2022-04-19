package com.nanuri.work.com.code;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum DayOfWeek {
	
	SUN("일요일"), 
	MON("월요일"), 
	TUE("화요일"), 
	WED("수요일"), 
	THU("목요일"), 
	FRI("금요일"), 
	SAT("토요일");
	
	String dayOfWeek;
	
}
