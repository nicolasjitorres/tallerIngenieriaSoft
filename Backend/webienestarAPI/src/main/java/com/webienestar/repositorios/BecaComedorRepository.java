package com.webienestar.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

import com.webienestar.modelos.BecaComedor;
import com.webienestar.modelos.Estudiante;

@Repository
public interface BecaComedorRepository extends JpaRepository<BecaComedor, Long>{
    boolean existsByEstudianteAndAnio(Optional<Estudiante> estudiante, String anio);
}
