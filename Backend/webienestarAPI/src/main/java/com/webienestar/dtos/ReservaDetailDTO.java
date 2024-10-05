package com.webienestar.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservaDetailDTO {
    private Long id;
    private String fecha;
    private String nombreEstudiante;
    private boolean becario;
    private String plato;
    private String postre;
    private String tipoVianda;
}