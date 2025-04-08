package com.cock.levart.auth.service;

import com.cock.levart.auth.model.AuthenticationRequest;
import com.cock.levart.auth.model.AuthenticationResponse;
import com.cock.levart.auth.model.RegisterRequest;
import com.cock.levart.model.UserEntity;
import com.cock.levart.repo.UserEntityRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserEntityRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var userExist = userRepo.findByEmailOrUsername(request.getEmail(),request.getUsername());
        if(userExist.isEmpty()){
            var user = UserEntity.builder()
                    .firstname(request.getFirstname())
                    .lastname(request.getLastname())
                    .email(request.getEmail())
                    .username(request.getUsername())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .country(request.getCountry())
                    .city(request.getCity())
                    .about(request.getAbout())
                    .build();
            userRepo.save(user);
            var jwtToken = jwtService.generateToken(user,user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
        throw new RuntimeException("Fail to register the user, user already exist");
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepo.findByEmailOrUsername(request.getEmail(), request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user,user);
        return AuthenticationResponse
                .builder()
                .token(jwtToken)
                .build();
    }
}
