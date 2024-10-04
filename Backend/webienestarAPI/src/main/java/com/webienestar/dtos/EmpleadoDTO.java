package com.webienestar.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class EmpleadoDTO {
    private Long id;

    @NotNull(message = "El campo 'dni' es obligatorio.")
    @Min(value = 1000000, message = "El dni debe tener al menos 7 dígitos.")
    @Max(value = 99999999, message = "El dni debe tener como máximo 8 dígitos.")
    private Long dni;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "El campo 'contraseña' es obligatorio.")
    @Size(min = 8, message = "La contraseña debe tener al menos 8 caracteres.")
    private String password;

    @NotBlank(message = "El campo 'nombre' es obligatorio.")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres.")
    private String username;

    @NotBlank(message = "El campo 'nombre' es obligatorio.")
    @Size(max = 100, message = "El nombre no puede tener más de 100 caracteres.")
    private String nombre;

    @NotBlank(message = "El campo 'género' es obligatorio.")
    @Pattern(regexp = "MASCULINO|FEMENINO|OTRO", message = "El género debe ser 'MASCULINO', 'FEMENINO' u 'OTRO'.")
    private String genero;

    @NotBlank(message = "El campo 'localidad' es obligatorio.")
    private String localidad;

    @NotBlank(message = "El campo 'dirección' es obligatorio.")
    private String direccion;

    @Email(message = "El correo electrónico debe tener un formato válido.")
    @NotBlank(message = "El campo 'mail' es obligatorio.")
    private String mail;

    @NotNull(message = "El campo 'celular' es obligatorio.")
    @Digits(integer = 10, fraction = 0, message = "El número de celular debe tener hasta 10 dígitos.")
    private Long celular;

    @NotBlank(message = "El campo 'rol' es obligatorio.")
    @Pattern(regexp = "ESTUDIANTE|ADMIN|EMPLEADO_COMEDOR|EMPLEADO_CONTROL|SECRETARIO", message = "El rol debe ser 'ESTUDIANTE', 'ADMIN', 'EMPLEADO_COMEDOR', 'EMPLEADO_CONTROL' o 'SECRETARIO'.")
    private String rol;
}