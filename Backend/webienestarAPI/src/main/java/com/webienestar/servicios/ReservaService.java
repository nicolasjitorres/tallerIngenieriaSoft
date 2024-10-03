package com.webienestar.servicios;

import com.webienestar.dtos.ReservaDTO;
import com.webienestar.mappers.ReservaMapper;
import com.webienestar.modelos.BecaComedor;
import com.webienestar.modelos.Reserva;
import com.webienestar.modelos.enums.EstadoBeca;
import com.webienestar.modelos.enums.EstadoReserva;
import com.webienestar.repositorios.ReservaRepository;
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

    public ReservaDTO guardar(ReservaDTO reservaDTO) {
        Reserva reserva = reservaMapper.toEntity(reservaDTO);
        reserva = reservaRepository.save(reserva);
        return reservaMapper.toDto(reserva);
    }

    public void eliminar(Long id) {
        reservaRepository.deleteById(id);
    }

    public void actualizarRetirarVianda(ReservaDTO reservaDTO) {
        Optional<Reserva> reservaAActualizar = reservaRepository.findById(reservaDTO.getId());
        LocalDate fechaActual = LocalDate.now();
        DateTimeFormatter formateador = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String fechaFormateada = fechaActual.format(formateador);

        System.out.println(fechaFormateada);
        System.out.println(reservaAActualizar.get().getFecha());
        System.out.println(reservaAActualizar.isPresent());
        System.out.println(reservaAActualizar.get().getFecha() == fechaFormateada);

        if (reservaAActualizar.isPresent() && (reservaAActualizar.get().getFecha().equals(fechaFormateada))) {
            Reserva reservaParaActualizar = reservaAActualizar.get();
            reservaParaActualizar.setEstado(EstadoReserva.RETIRADA); 
            reservaRepository.saveAndFlush(reservaParaActualizar);
            System.out.println("Estoy adentro");
        }
    }


}
