package com.webienestar.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ReservaDTO {
    private Long id;
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private String fecha;
    private String opinion;
    private String calificacion;
    private String estado;
    
    private Long idEstudiante;
    private Long idVianda;
}