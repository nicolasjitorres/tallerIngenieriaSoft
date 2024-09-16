package modelos;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EstudianteDTO{
    private Long id;
    private String legajo;
    private String carrera;
    private String facultad;
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