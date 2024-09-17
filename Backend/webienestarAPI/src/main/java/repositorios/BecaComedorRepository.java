package repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import modelos.BecaComedor;

@Repository
public interface BecaComedorRepository extends JpaRepository<BecaComedor, Long>{

}
