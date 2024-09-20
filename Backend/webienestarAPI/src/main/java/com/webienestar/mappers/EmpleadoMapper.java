package com.webienestar.mappers;

import com.webienestar.modelos.Empleado;
import com.webienestar.dtos.EmpleadoDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface EmpleadoMapper {

    EmpleadoDTO toDto(Empleado empleado);
    Empleado toEntity(EmpleadoDTO empleadoDTO);
}
