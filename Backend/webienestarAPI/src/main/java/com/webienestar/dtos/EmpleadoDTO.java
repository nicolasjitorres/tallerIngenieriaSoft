package com.webienestar.dtos;

import lombok.Data;

@Data
public class EmpleadoDTO {
    private Long id;
    private Long dni;
    private String contraseña;
    private String nombre;
    private String genero;
    private String localidad;
    private String direccion;
    private String mail;
    private Long celular;
    private String rol;
}