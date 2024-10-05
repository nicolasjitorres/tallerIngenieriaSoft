package com.webienestar.dtos;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BecaComedorDetailDTO {
    private Long id;
    private String nombreEst;
    private String carrera;
    private String email;
    private String estado;
}