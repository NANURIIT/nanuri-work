package com.nanuri.work.com.login.vo;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDetailsVO implements UserDetails {
	
	private String userId;					/* 운영자ID */
	private String userNm;					/* 운영자명 */
	private String telNo;					/* 운영자휴대전화번호 */
	private String userPassword;			/* 비밀번호 */
	private String accountActivYn;			/* 계정활성화여부 */

    private Boolean isLocked;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
    	List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
    	authorities.add(new SimpleGrantedAuthority("MEMBER"));	//기본권한 OP AuthorityUtils.createAuthorityList(ROLE_PREFIX.concat(adminLevel));

        return authorities;
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
