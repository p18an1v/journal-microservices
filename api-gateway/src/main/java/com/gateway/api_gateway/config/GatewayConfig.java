package com.gateway.api_gateway.config;

import org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions;
import org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.function.RequestPredicates;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.uri;

@Configuration
public class GatewayConfig {

        // AUTH ROUTES (PUBLIC) - routed to USER-SERVICE
        @Bean
        public RouterFunction<ServerResponse> authRoute() {
                return GatewayRouterFunctions.route("auth-route")
                                .route(RequestPredicates.path("/auth/**")
                                                .or(RequestPredicates.path("/oauth2/**"))
                                                .or(RequestPredicates.path("/oauth-success"))
                                                .or(RequestPredicates.path("/error")),
                                                HandlerFunctions.http())
                                .before(uri("http://localhost:8082"))
                                .build();
        }

        // USER ROUTES (PROTECTED) - routed to USER-SERVICE
        @Bean
        public RouterFunction<ServerResponse> userRoute() {
                return GatewayRouterFunctions.route("user-route")
                                .route(RequestPredicates.path("/api/users/**")
                                                .or(RequestPredicates.path("/api/users")),
                                                HandlerFunctions.http())
                                .before(uri("http://localhost:8082"))
                                .build();
        }

        // JOURNAL ROUTES (PROTECTED) - routed to JOURNAL-SERVICE
        @Bean
        public RouterFunction<ServerResponse> journalRoute() {
                return GatewayRouterFunctions.route("journal-route")
                                .route(RequestPredicates.path("/api/journals/**")
                                                .or(RequestPredicates.path("/api/journals")),
                                                HandlerFunctions.http())
                                .before(uri("http://localhost:8081"))
                                .build();
        }
}
