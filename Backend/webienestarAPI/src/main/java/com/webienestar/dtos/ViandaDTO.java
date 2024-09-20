package com.webienestar.dtos;

import lombok.Data;
import java.util.List;

@Data
public class ViandaDTO {
    private Long id;
    private String tipo;
    private String plato;
    private String postre;
    private List<ReservaDTO> reservasDTO;
}