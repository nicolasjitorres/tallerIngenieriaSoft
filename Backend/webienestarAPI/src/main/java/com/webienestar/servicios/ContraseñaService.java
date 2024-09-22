package com.webienestar.servicios;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ContraseñaService {
    private final BCryptPasswordEncoder passwordEncoder;

    public ContraseñaService() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }
    
    public String hashearContraseña(String contraseña) {
        return passwordEncoder.encode(contraseña);
    }

    public boolean verificarContraseña(String contraseñaSinHash, String contraseñaHasheada) {
        return passwordEncoder.matches(contraseñaSinHash, contraseñaHasheada);
    }
}
