package modelos;

import java.time.Year;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reserva{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int idVianda;
    private Date fecha;
    private varcharLong opinion;
    private varchar calificacion;
    private String estado;



}