package repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import modelos.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long>{

}