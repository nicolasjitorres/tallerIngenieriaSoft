package com.webienestar.servicios;

import com.webienestar.dtos.EstudianteDTO;
import com.webienestar.mappers.EstudianteMapper;
import com.webienestar.modelos.Estudiante;
import com.webienestar.repositorios.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.webienestar.exceptions.DniYaExisteException;
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

    /*public EstudianteDTO guardar(EstudianteDTO estudianteDTO) {

        // Esto de aqui abajo lo que deberia hacer es buscar si existe el DNI que ingresamos y en ese caso devolver un msj de que el dni ya existe
        // if (estudianteRepository.existsByDni(estudianteDTO.getDni())) {
        //     throw new DniYaExisteException("El DNI ya está en uso.");
        // }
        Estudiante estudiante = estudianteMapper.toEntity(estudianteDTO);
        estudiante = estudianteRepository.save(estudiante);
        return estudianteMapper.toDto(estudiante);
    }*/

    @Autowired
    private ContraseñaService contraseñaService;

    public EstudianteDTO guardar(EstudianteDTO estudianteDTO) {
        // Validar si el DNI ya existe
        if (estudianteRepository.existsByDni(estudianteDTO.getDni())) {
            throw new DniYaExisteException("El DNI ya está en uso.");
        }

        // Hashear la contraseña antes de guardar
        if (estudianteDTO.getContraseña() != null) {
            String contraseñaHasheada = contraseñaService.hashearContraseña(estudianteDTO.getContraseña());
            estudianteDTO.setContraseña(contraseñaHasheada);
        }

        // Convertir el DTO a entidad y guardar
        Estudiante estudiante = estudianteMapper.toEntity(estudianteDTO);
        estudiante = estudianteRepository.save(estudiante);

        return estudianteMapper.toDto(estudiante);
    }

    public void eliminar(Long id) {
        estudianteRepository.deleteById(id);
    }
}
