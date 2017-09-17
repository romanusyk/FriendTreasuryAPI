package romanusyk.ft.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Created by Roman Usyk on 17.09.17.
 */
@Service
public class SpringSecurityService implements SecurityService {

    @Override
    public Boolean hasRole(String role) {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority(role));
    }

}
