package com.webienestar.servicios;

import com.webienestar.dtos.ReservaDTO;
import com.webienestar.mappers.ReservaMapper;
import com.webienestar.modelos.Reserva;
import com.webienestar.repositorios.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<ReservaDTO> obtenerTodos() {
        return reservaRepository.findAll().stream()
                .map(ReservaMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
    }

    public ReservaDTO obtenerPorId(Long id) {
        return reservaRepository.findById(id)
                .map(ReservaMapper.INSTANCE::toDto)
                .orElse(null);
    }

    public ReservaDTO guardar(ReservaDTO reservaDTO) {
        Reserva reserva = ReservaMapper.INSTANCE.toEntity(reservaDTO);
        reserva = reservaRepository.save(reserva);
        return ReservaMapper.INSTANCE.toDto(reserva);
    }

    public void eliminar(Long id) {
        reservaRepository.deleteById(id);
    }
}
