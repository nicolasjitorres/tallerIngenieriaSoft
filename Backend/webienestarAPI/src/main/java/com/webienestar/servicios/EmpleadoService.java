package com.webienestar.servicios;

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

    public List<EmpleadoDTO> obtenerTodos() {
        return empleadoRepository.findAll().stream()
                .map(EmpleadoMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
    }

    public EmpleadoDTO obtenerPorId(Long id) {
        return empleadoRepository.findById(id)
                .map(EmpleadoMapper.INSTANCE::toDto)
                .orElse(null);
    }

    public EmpleadoDTO guardar(EmpleadoDTO empleadoDTO) {
        Empleado empleado = EmpleadoMapper.INSTANCE.toEntity(empleadoDTO);
        empleado = empledoRepository.save(empleado);
        return EmpleadoMapper.INSTANCE.toDto(empleado);
    }

    public void eliminar(Long id) {
        empleadoRepository.deleteById(id);
    }
}
