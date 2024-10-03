package com.webienestar.repositorios;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webienestar.modelos.Estudiante;
import com.webienestar.modelos.Reserva;


@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long>{

}