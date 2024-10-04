package com.webienestar.servicios;

import com.webienestar.dtos.ReservaDTO;
import com.webienestar.mappers.ReservaMapper;
import com.webienestar.modelos.Estudiante;
import com.webienestar.modelos.Reserva;
import com.webienestar.modelos.Vianda;
import com.webienestar.modelos.BecaComedor;
import com.webienestar.modelos.Reserva;
import com.webienestar.modelos.enums.EstadoBeca;
import com.webienestar.modelos.enums.EstadoReserva;
import com.webienestar.repositorios.ReservaRepository;
import com.webienestar.repositorios.ViandaRepository;
import com.webienestar.repositorios.EstudianteRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ReservaMapper reservaMapper;

    @Autowired
    private ViandaRepository viandaRepository;

    @Autowired
    private EstudianteRepository estudianteRepository;

    public List<ReservaDTO> obtenerTodos() {
        return reservaRepository.findAll().stream()
                .map(reservaMapper::toDto)
                .collect(Collectors.toList());
    }

    public ReservaDTO obtenerPorId(Long id) {
        return reservaRepository.findById(id)
                .map(reservaMapper::toDto)
                .orElse(null);
    }

    /*
     * public ReservaDTO guardar(ReservaDTO reservaDTO) {
     * Reserva reserva = reservaMapper.toEntity(reservaDTO);
     * reserva = reservaRepository.save(reserva);
     * return reservaMapper.toDto(reserva);
     * }
     */
    public Reserva guardar(Reserva reserva) {
        Optional<Vianda> viandaAActualizar = viandaRepository.findById(reserva.getIdVianda());
        if (viandaAActualizar.isPresent()) {
            Vianda vianda = viandaAActualizar.get();

            if (vianda.getCantidadDelDia() > 0) {
                vianda.setCantidadDelDia(vianda.getCantidadDelDia() - 1);
                viandaRepository.saveAndFlush(vianda); //
                LocalDate hoy = LocalDate.now();
                String fechaHoy = hoy.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
                reserva.setFecha(fechaHoy); // Asegúrate de que la reserva tiene la fecha en formato String

                return reservaRepository.save(reserva); // Guarda la entidad en el repositorio
            } else {
                throw new IllegalStateException(
                        "No hay más viandas disponibles para la reserva con ID: " + reserva.getId());
            }
        } else {
            throw new EntityNotFoundException("La vianda con id " + reserva.getIdVianda() + " no fue encontrada.");
        }
    }

    public void eliminar(Long id) {
        reservaRepository.deleteById(id);
    }

    public void actualizarCantidadPorReservas(List<ReservaDTO> reservas) {
        for (ReservaDTO reserva : reservas) {
            Optional<Vianda> viandaAActualizar = viandaRepository.findById(reserva.getIdVianda());

            if (viandaAActualizar.isPresent()) {
                Vianda vianda = viandaAActualizar.get();

                if (vianda.getCantidadDelDia() > 0) {
                    vianda.setCantidadDelDia(vianda.getCantidadDelDia() - 1);
                    viandaRepository.saveAndFlush(vianda); //
                } else {
                    throw new IllegalStateException(
                            "No hay más viandas disponibles para la reserva con ID: " + reserva.getId());
                }
            } else {
                throw new EntityNotFoundException("La vianda con id " + reserva.getIdVianda() + " no fue encontrada.");
            }
        }
    }

    public Reserva verificarReserva(Long idEstudiante, String fecha) {
        Optional<Reserva> reserva = reservaRepository.findByEstudiante_IdAndFecha(idEstudiante, fecha);
        if (reserva.isPresent()) {
            return reserva.get(); // Retorna true si ya tiene una reserva
        }else{
            return null;
        }
    }

    public void cancelarVianda(Long idEstudiante) {
        // Obtener la fecha de hoy
        String fechaHoy = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        // Buscar la reserva confirmada para el estudiante en la fecha actual
        Optional<Reserva> reserva = reservaRepository.findByEstudiante_IdAndFechaAndEstado(
                idEstudiante, fechaHoy, EstadoReserva.RETIRADA);

        if (reserva.isPresent()) {
            Reserva reservaEncontrada = reserva.get();
            // Cambiar el estado a CANCELADA
            reservaEncontrada.setEstado(EstadoReserva.CANCELADA);
            reservaRepository.save(reservaEncontrada);
        } else {
            throw new EntityNotFoundException(
                    "No se encontró una reserva confirmada para el estudiante en la fecha de hoy.");
        }
    }

}
