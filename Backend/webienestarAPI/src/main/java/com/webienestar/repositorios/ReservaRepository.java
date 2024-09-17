package com.webienestar.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webienestar.modelos.Reserva;


@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long>{

}