package com.webienestar.dtos;

import java.time.Year;
import lombok.Data;

@Data
public class BecaComedorDTO {
    private Long id;
    private Boolean ingresos;
    private String tipoVivienda;
    private String condVivienda;
    private String grupoFamiliar;
    private String archivos;
    private Year anio;
    private Long idEstudiante;
}