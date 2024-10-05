package com.webienestar.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class ReservaDTO {
    private Long id;
    
    @NotBlank(message = "La fecha es obligatoria")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private String fecha;

    @Size(max = 500, message = "La opinión no puede exceder los 500 caracteres")
    private String opinion;

    private int calificacion;

    @NotBlank(message = "El estado es obligatorio")
    @Size(min = 2, max = 20, message = "El estado debe tener entre 2 y 20 caracteres")
    private String estado;
    

    private Long idEstudiante;
    private Long idVianda;
}