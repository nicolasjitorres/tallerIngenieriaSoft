package modelos;

import java.time.Year;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BecaComedor{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private Boolean ingresos;
    private Enum tipoVivienda;
    private Enum condVivienda;
    private String grupoFamiliar;
    private String archivos;
    private Year anio;

}
