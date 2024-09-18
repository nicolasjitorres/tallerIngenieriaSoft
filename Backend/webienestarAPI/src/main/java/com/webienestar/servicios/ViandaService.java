package com.webienestar.servicios;

import com.webienestar.dtos.ViandaDTO;
import com.webienestar.mappers.ViandaMapper;
import com.webienestar.modelos.Vianda;
import com.webienestar.repositorios.ViandaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ViandaService {

    @Autowired
    private ViandaRepository viandaRepository;

    public List<ViandaDTO> obtenerTodos() {
        return viandaRepository.findAll().stream()
                .map(ViandaMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
    }

    public ViandaDTO obtenerPorId(Long id) {
        return viandaRepository.findById(id)
                .map(ViandaMapper.INSTANCE::toDto)
                .orElse(null);
    }

    public ViandaDTO guardar(ViandaDTO viandaDTO) {
        Vianda vianda = ViandaMapper.INSTANCE.toEntity(viandaDTO);
        vianda = viandaRepository.save(vianda);
        return ViandaMapper.INSTANCE.toDto(vianda);
    }

    public void eliminar(Long id) {
        viandaRepository.deleteById(id);
    }
}
