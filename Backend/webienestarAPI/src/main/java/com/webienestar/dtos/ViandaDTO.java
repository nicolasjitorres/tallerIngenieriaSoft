package com.webienestar.dtos;

import lombok.Data;

@Data
public class ViandaDTO {
    private Long id;
    private String tipo;
    private String plato;
    private String postre;
}