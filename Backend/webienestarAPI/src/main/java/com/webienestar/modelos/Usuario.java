package com.webienestar.modelos;

import com.webienestar.modelos.enums.Genero;
import com.webienestar.modelos.enums.Rol;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public class Usuario {
    private Long dni;
    private String contraseña;
    private String nombre;
    private Genero genero;
    private String localidad;
    private String direccion;
    private String mail;
    private Long celular;
    private Rol rol;
}
