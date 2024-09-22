package com.webienestar.dtos;

import java.time.Year;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class BecaComedorDTO {
    private Long id;

    @NotNull(message = "El campo 'ingresos' es obligatorio.")
    private Boolean ingresos;

    @NotBlank(message = "El campo 'tipoVivienda' es obligatorio.")
    @Pattern(regexp = "DEPARTAMENTO|CASA|RESIDENCIA|PENSION|OTRO", message = "El tipoVivienda debe ser 'DEPARTAMENTO', 'CASA', 'RESIDENCIA', 'PENSION' u 'OTRO'.")
    private String tipoVivienda;

    @NotBlank(message = "El campo 'tipoVivienda' es obligatorio.")
    @Pattern(regexp = "PROPIA|ALQUILER|FAMILIAR", message = "El tipoVivienda debe ser 'PROPIA', 'ALQUILER'o 'FAMILIAR'.")
    private String condVivienda;

    @NotBlank(message = "El campo 'grupoFamiliar' es obligatorio.")
    private String grupoFamiliar;

    @NotBlank(message = "El campo 'archivos' es obligatorio.")
    private String archivos;

    @NotBlank(message = "El campo 'anio' es obligatorio.")
    @Pattern(regexp = "2024", message = "El año debe ser 2024.")
    private String anio;

    private Long idEstudiante;
}