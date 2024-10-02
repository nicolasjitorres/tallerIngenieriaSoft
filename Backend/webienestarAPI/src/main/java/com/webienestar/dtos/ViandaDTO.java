package com.webienestar.dtos;

import lombok.Data;
import java.util.List;

import jakarta.validation.constraints.*;

@Data
public class ViandaDTO {
    private Long id;

    @NotBlank(message = "El campo 'tipo' es obligatorio.")
    @Pattern(regexp = "Clasico|Saludable", message = "El tipo debe ser 'Clasico' o 'Saludable'.")
    private String tipo;

    @NotBlank(message = "El campo 'plato' es obligatorio.")
    private String plato;

    @NotBlank(message = "El campo 'postre' es obligatorio.")
    private String postre;

    private int cantidadDelDia;

    private List<ReservaDTO> reservasDTO;
}