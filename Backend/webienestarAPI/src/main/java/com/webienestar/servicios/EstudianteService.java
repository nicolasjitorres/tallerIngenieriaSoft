package com.webienestar.servicios;

import com.webienestar.dtos.EstudianteDTO;
import com.webienestar.mappers.EstudianteMapper;
import com.webienestar.modelos.Estudiante;
import com.webienestar.repositorios.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @Autowired
    private EstudianteMapper estudianteMapper;

    public List<EstudianteDTO> obtenerTodos() {
        return estudianteRepository.findAll().stream()
                .map(estudianteMapper::toDto)
                .collect(Collectors.toList());
    }

    public EstudianteDTO obtenerPorId(Long id) {
        return estudianteRepository.findById(id)
                .map(estudianteMapper::toDto)
                .orElse(null);
    }

    public EstudianteDTO guardar(EstudianteDTO estudianteDTO) {
        Estudiante estudiante = estudianteMapper.toEntity(estudianteDTO);
        estudiante = estudianteRepository.save(estudiante);
        return estudianteMapper.toDto(estudiante);
    }

    public void eliminar(Long id) {
        estudianteRepository.deleteById(id);
    }
}
