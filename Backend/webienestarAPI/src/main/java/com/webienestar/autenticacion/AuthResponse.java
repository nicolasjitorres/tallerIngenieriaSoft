package com.webienestar.autenticacion;

import com.webienestar.modelos.enums.Rol;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    String token;
    Long id;
    String nombre;
    String email;
    Long dni;
    Rol rol;
}
