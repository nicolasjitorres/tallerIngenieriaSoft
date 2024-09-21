package com.webienestar.dtos;

import lombok.Data;
import java.util.List;

import org.hibernate.validator.constraints.UniqueElements;

import jakarta.validation.constraints.NotBlank;

@Data
public class EstudianteDTO {
    private Long id;

    @NotBlank(message = "El campo 'legajo' es obligatorio.")
    private String legajo;

    @NotBlank(message = "El campo 'carrera' es obligatorio.")
    private String carrera;

    @NotBlank(message = "El campo 'facultad' es obligatorio.")
    private String facultad;

    private Long dni;
    private String contraseña;
    private String nombre;
    private String genero;
    private String localidad;
    private String direccion;
    private String mail;
    private Long celular;
    private String rol;

    private List<BecaComedorDTO> becasComedorDTO;
    private List<ReservaDTO> reservasDTO;
}
