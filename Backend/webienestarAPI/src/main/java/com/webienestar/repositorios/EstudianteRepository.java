package com.webienestar.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webienestar.modelos.Estudiante;

import java.util.Optional;


@Repository
public interface EstudianteRepository extends JpaRepository<Estudiante, Long>{
    boolean existsByDni(Long dni);
    boolean existsByLegajo(String legajo);
    Optional<Estudiante> findByDni(Long dni);
    Optional<Estudiante> findByUsername(String username);
}
