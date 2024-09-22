package com.webienestar.dtos;

import lombok.Data;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

@Data
public class ViandaDTO {
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Long id;

    @NotBlank(message = "El campo 'tipo' es obligatorio.")
    @Pattern(regexp = "Clasico|Saludable", message = "El tipo debe ser 'Clasico' o 'Saludable'.")
    private String tipo;

    @NotBlank(message = "El campo 'plato' es obligatorio.")
    private String plato;

    @NotBlank(message = "El campo 'postre' es obligatorio.")
    private String postre;

    private List<ReservaDTO> reservasDTO;
}