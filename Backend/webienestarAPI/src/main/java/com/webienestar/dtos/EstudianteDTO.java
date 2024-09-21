package com.webienestar.dtos;

import lombok.Data;
import java.util.List;

import org.hibernate.validator.constraints.UniqueElements;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

@Data
public class EstudianteDTO {
    private Long id;

    @NotBlank(message = "El campo 'legajo' es obligatorio.")
    private String legajo;

    @NotBlank(message = "El campo 'carrera' es obligatorio.")
    private String carrera;

    @NotBlank(message = "El campo 'facultad' es obligatorio.")
    private String facultad;

    @NotNull(message = "El campo 'dni' es obligatorio.")
    @Min(value = 10000000, message = "El DNI debe tener 8 dígitos.")
    @Max(value = 99999999, message = "El DNI debe tener 8 dígitos.")
    private Long dni;

    @NotBlank(message = "El campo 'contraseña' es obligatorio.")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres.")
    private String contraseña;

    @NotBlank(message = "El campo 'nombre' es obligatorio.")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres.")
    private String nombre;

    @NotBlank(message = "El campo 'género' es obligatorio.")
    private String genero;

    @NotBlank(message = "El campo 'localidad' es obligatorio.")
    private String localidad;

    @NotBlank(message = "El campo 'dirección' es obligatorio.")
    private String direccion;

    @Email(message = "El correo electrónico debe tener un formato válido.")
    @NotBlank(message = "El campo 'mail' es obligatorio.")
    private String mail;

    @NotNull(message = "El campo 'celular' es obligatorio.")
    //@Digits(integer = 10, fraction = 0, message = "El número de celular debe tener hasta 10 dígitos.")
    private Long celular;

    @NotBlank(message = "El campo 'rol' es obligatorio.")
    private String rol;

    private List<BecaComedorDTO> becasComedorDTO;
    private List<ReservaDTO> reservasDTO;
}
