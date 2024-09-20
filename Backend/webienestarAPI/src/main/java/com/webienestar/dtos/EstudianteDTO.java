package com.webienestar.dtos;

import lombok.Data;
import java.util.List;

@Data
public class EstudianteDTO{
    private Long id;
    private String legajo;
    private String carrera;
    private String facultad;
    private Long dni;
    private String contraseña;
    private String nombre;
    private String genero;
    private String localidad;
    private String direccion;
    private String mail;
    private Long celular;
    private String rol;
    
    private List<BecaComedorDTO> becasComedorDTO;
    private List<ReservaDTO> reservasDTO;
}