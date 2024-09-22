package com.webienestar.servicios;

import com.webienestar.autenticacion.SecurityHasher;
import com.webienestar.dtos.EstudianteDTO;
import com.webienestar.excepciones.DuplicateFieldException;
import com.webienestar.mappers.EstudianteMapper;
import com.webienestar.modelos.Estudiante;
import com.webienestar.modelos.enums.Rol;
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
    private SecurityHasher securityHasher;

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

        if (estudianteRepository.existsByDni(estudianteDTO.getDni())) {
            throw new DuplicateFieldException("El DNI ya está en uso");
        }
        if (estudianteRepository.existsByLegajo(estudianteDTO.getLegajo())) {
            throw new DuplicateFieldException("El legajo ya está en uso");
        }
        if (estudianteDTO.getContrasenia() != null) {
            String contraseniaHasheada = securityHasher.passwordEncoder().encode(estudianteDTO.getContrasenia());
            estudianteDTO.setContrasenia(contraseniaHasheada);
        }

        // Por defecto se cargan los estudiantes con este rol
        estudianteDTO.setRol(Rol.ESTUDIANTE.toString());

        Estudiante estudiante = estudianteMapper.toEntity(estudianteDTO);
        estudiante = estudianteRepository.save(estudiante);

        return estudianteMapper.toDto(estudiante);
    }

    public void eliminar(Long id) {
        estudianteRepository.deleteById(id);
    }
}
