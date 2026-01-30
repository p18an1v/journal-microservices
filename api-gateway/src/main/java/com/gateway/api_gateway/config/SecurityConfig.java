package com.gateway.api_gateway.config;

import com.gateway.api_gateway.filter.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

        @Autowired
        private JwtAuthFilter jwtFilter;

        @Autowired
        private OAuth2SuccessHandler oAuth2SuccessHandler;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

                http
                                .csrf(AbstractHttpConfigurer::disable)
                                .formLogin(AbstractHttpConfigurer::disable) // form login disable temp
                                .httpBasic(AbstractHttpConfigurer::disable) // basic disable
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/auth/**",
                                                                "/oauth2/**",
                                                                "/oauth-success",
                                                                "/error")
                                                .permitAll()
                                                .anyRequest().authenticated() // any request is authenticated
                                // .anyRequest().permitAll()
                                ).oauth2Login(oauth -> oauth
                                                .successHandler(oAuth2SuccessHandler)
                                                .failureHandler((request, response, exception) -> {
                                                        exception.printStackTrace();
                                                        response.sendRedirect("/oauth-error");
                                                }))
                                .exceptionHandling(ex -> ex
                                                .authenticationEntryPoint((request, response, authException) -> {
                                                        response.sendError(401, "Unauthorized");
                                                }))
                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

                return http.build();
        }

        // @Bean
        // public AuthenticationManager authenticationManager() {
        // return authentication -> authentication;
        // }
}
