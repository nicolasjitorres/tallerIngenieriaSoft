package com.webienestar.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webienestar.modelos.Empleado;

import java.util.Optional;


@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {
    Optional<Empleado> findByDni(Long dni);
    Optional<Empleado> findByUsername(String username);
}
