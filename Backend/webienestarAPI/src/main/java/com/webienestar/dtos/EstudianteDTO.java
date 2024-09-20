package com.webienestar.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class EstudianteDTO {
    private Long id;

    @NotBlank(message = "El campo 'legajo' es obligatorio.")
    private String legajo;

    private String carrera;
    private String facultad;

    @NotNull(message = "El DNI es obligatorio.")
    private Long dni;

    @NotBlank(message = "La contraseña es obligatoria.")
    private String contraseña;

    @NotBlank(message = "El nombre es obligatorio.")
    private String nombre;

    private String genero;
    private String localidad;
    private String direccion;

    @Email(message = "El formato del correo es inválido.")
    private String mail;

    @NotNull(message = "El celular es obligatorio.")
    private Long celular;

    private String rol;

    private List<BecaComedorDTO> becasComedorDTO;
    private List<ReservaDTO> reservasDTO;
}
