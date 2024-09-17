package modelos;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@MappedSuperclass
@Data
public class Usuario {
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
