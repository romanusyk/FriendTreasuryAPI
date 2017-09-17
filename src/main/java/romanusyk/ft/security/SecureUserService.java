package romanusyk.ft.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import romanusyk.ft.domain.User;
import romanusyk.ft.repository.UserRepository;

import java.util.Collection;

/**
 * Created by Roman Usyk on 17.09.17.
 */
@Service
public class SecureUserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.userRepository.findUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.", username));
        } else {
            Collection<? extends GrantedAuthority> authorities;
            try {
                authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(user.getAuthorities());
            } catch (Exception e) {
                authorities = null;
            }
            return new SecuredUser(
                    new Long(user.getId()),
                    user.getUsername(),
                    user.getPassword(),
                    authorities
            );
        }
    }

}
