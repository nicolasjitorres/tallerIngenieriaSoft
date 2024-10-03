package com.webienestar.repositorios;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webienestar.modelos.Estudiante;
import com.webienestar.modelos.Reserva;
import com.webienestar.modelos.enums.EstadoReserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
    // Método para encontrar una reserva por estudiante, fecha y estado
    Optional<Reserva> findByEstudiante_IdAndFechaAndEstado(Long idEstudiante, String fecha, EstadoReserva estado);
    
    // Método para encontrar todas las reservas de un estudiante para una fecha específica
    Optional<Reserva> findByEstudiante_IdAndFecha(Long idEstudiante, String fecha);
}