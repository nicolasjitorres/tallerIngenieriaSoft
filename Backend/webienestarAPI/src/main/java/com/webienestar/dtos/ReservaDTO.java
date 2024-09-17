package com.webienestar.dtos;

import java.util.Date;
import lombok.Data;

@Data
public class ReservaDTO {
    private Long id;
    private int idVianda;
    private Date fecha;
    private String opinion;
    private String calificacion;
    private String estado;
}