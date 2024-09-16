package modelos;

import java.time.Year;

import javax.annotation.processing.Generated;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vianda{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private varchar tipo;
    private varchar plato;
    private varchar postre;

    

}