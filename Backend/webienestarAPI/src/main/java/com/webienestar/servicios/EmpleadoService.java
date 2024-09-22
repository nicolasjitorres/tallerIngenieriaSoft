package com.webienestar.servicios;

import com.webienestar.autenticacion.SecurityHasher;
import com.webienestar.dtos.EmpleadoDTO;
import com.webienestar.mappers.EmpleadoMapper;
import com.webienestar.modelos.Empleado;
import com.webienestar.repositorios.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmpleadoService {

    @Autowired
    private EmpleadoRepository empleadoRepository;

    @Autowired
    private SecurityHasher securityHasher;

    @Autowired
    private EmpleadoMapper empleadoMapper;

    public List<EmpleadoDTO> obtenerTodos() {
        return empleadoRepository.findAll().stream()
                .map(empleadoMapper::toDto)
                .collect(Collectors.toList());
    }

    public EmpleadoDTO obtenerPorId(Long id) {
        return empleadoRepository.findById(id)
                .map(empleadoMapper::toDto)
                .orElse(null);
    }


    public EmpleadoDTO guardar(EmpleadoDTO empleadoDTO) {

        if (empleadoDTO.getContrasenia() != null) {
            String contraseniaHasheada = securityHasher.passwordEncoder().encode(empleadoDTO.getContrasenia());
            empleadoDTO.setContrasenia(contraseniaHasheada);
        }

        Empleado empleado = empleadoMapper.toEntity(empleadoDTO);
        empleado = empleadoRepository.save(empleado);
        return empleadoMapper.toDto(empleado);
    }

    public void eliminar(Long id) {
        empleadoRepository.deleteById(id);
    }
}
