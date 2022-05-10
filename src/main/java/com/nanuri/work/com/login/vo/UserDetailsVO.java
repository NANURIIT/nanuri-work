package com.nanuri.work.com.login.vo;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.nanuri.work.business.member.dto.MemberDTO;
import com.nanuri.work.com.code.MemberLevelCode;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsVO implements UserDetails {
	
	private String userId;					/* 운영자ID */
	private String userNm;					/* 운영자명 */
	private String telNo;					/* 운영자휴대전화번호 */
	private String userPassword;			/* 비밀번호 */
	private MemberLevelCode userAutrNm;		/* 사용자 권한 */
	private String accountActivYn;			/* 계정활성화여부 */
	private final List<GrantedAuthority> authorities;

    private Boolean isLocked;

    private UserDetailsVO(String userId, String userNm, String telNo, String userPassword, 
    		MemberLevelCode userAutrNm, String accountActivYn, List<GrantedAuthority> authorities) {
    	this.userId = userId;
    	this.userNm = userNm;
    	this.telNo = telNo;
    	this.userPassword = userPassword;
    	this.userAutrNm = userAutrNm;
    	this.accountActivYn = accountActivYn;
    	this.authorities = authorities;
    }
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
//    	List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
//    	authorities.add(new SimpleGrantedAuthority("MEMBER"));	//기본권한 OP AuthorityUtils.createAuthorityList(ROLE_PREFIX.concat(adminLevel));
//
//        return authorities;
    	return this.authorities;
    }
    
    public static UserDetailsVO of(MemberDTO memberDTO, List<GrantedAuthority> authorities) {
		return new UserDetailsVO(memberDTO.getUserId(), memberDTO.getUserNm(), memberDTO.getTelNo(), 
				memberDTO.getUserPassword(), memberDTO.getUserAutrNm(), 
				memberDTO.getAccountActivYn(), authorities);
	}

    @Override
    public String getPassword() {
        return this.userPassword;
    }

    @Override
    public String getUsername() {
        return this.userNm;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
