package com.webienestar.modelos;

import com.webienestar.modelos.enums.Genero;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public class Usuario {
    private Long dni;
    private String password;
    private String username;
    private String nombre;
    @Enumerated(EnumType.STRING)
    private Genero genero;
    private String localidad;
    private String direccion;
    private String mail;
    private Long celular;
}
