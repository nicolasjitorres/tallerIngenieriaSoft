package com.webienestar.dtos;

// import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.validation.constraints.*;
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

    private String estadoBeca;

    private String anio;

    private String fecha;

    private Long idEstudiante;
}