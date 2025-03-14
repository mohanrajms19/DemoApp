package customer.demoapp;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()  // Disable CSRF (only for testing, enable in production)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/employees/**").permitAll() // Allow API calls
                .anyRequest().authenticated()) // Authenticate other endpoints
            .formLogin().disable()
            .httpBasic().disable(); // Disable authentication

        return http.build();
    }
}