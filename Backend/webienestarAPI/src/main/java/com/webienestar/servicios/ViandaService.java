package com.webienestar.servicios;

import com.webienestar.dtos.ViandaDTO;
import com.webienestar.mappers.ViandaMapper;
import com.webienestar.modelos.Vianda;
import com.webienestar.repositorios.ViandaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ViandaService {

    @Autowired
    private ViandaRepository viandaRepository;

    @Autowired
    private ViandaMapper viandaMapper;

    public List<ViandaDTO> obtenerTodos() {
        return viandaRepository.findAll().stream()
                .map(viandaMapper::toDto)
                .collect(Collectors.toList());
    }

    public ViandaDTO obtenerPorId(Long id) {
        return viandaRepository.findById(id)
                .map(viandaMapper::toDto)
                .orElse(null);
    }

    public ViandaDTO guardar(ViandaDTO viandaDTO) {
        Vianda vianda = viandaMapper.toEntity(viandaDTO);
        vianda = viandaRepository.save(vianda);
        return viandaMapper.toDto(vianda);
    }

    public void eliminar(Long id) {
        viandaRepository.deleteById(id);
    }

    public void actualizarCantidad(List<ViandaDTO> viandasDtos) {
        for (ViandaDTO vianda : viandasDtos) {
            Optional<Vianda> viandaAActualizar = viandaRepository.findById(vianda.getId());
            if (viandaAActualizar.isPresent() && vianda.getCantidadDelDia() > 0) {
                Vianda viandaParaActualizar = viandaAActualizar.get();
                viandaParaActualizar.setCantidadDelDia(vianda.getCantidadDelDia());
                viandaRepository.saveAndFlush(viandaParaActualizar);
            }
        }

    }

}
