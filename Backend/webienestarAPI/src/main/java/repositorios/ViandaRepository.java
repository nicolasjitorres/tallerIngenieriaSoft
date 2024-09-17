package repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import modelos.Vianda;

@Repository
public interface ViandaRepository extends JpaRepository<Vianda, Long>{
    
}
