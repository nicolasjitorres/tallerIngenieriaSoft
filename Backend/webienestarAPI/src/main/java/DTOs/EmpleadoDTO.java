package dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmpleadoDTO {
    private Long id;
    private Long dni;
    private String contraseña;
    private String nombre;
    private Enum genero;
    private String localidad;
    private String direccion;
    private String mail;
    private Long celular;
    private Enum rol;
}