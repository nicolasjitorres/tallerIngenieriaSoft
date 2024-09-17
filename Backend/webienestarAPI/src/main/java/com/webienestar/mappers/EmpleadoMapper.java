package com.webienestar.mappers;

import com.webienestar.modelos.Empleado;
import com.webienestar.dtos.EmpleadoDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EmpleadoMapper {
    EmpleadoMapper INSTANCE = Mappers.getMapper(EmpleadoMapper.class);

    EmpleadoDTO toDto(Empleado Empleado);
    Empleado toEntity(EmpleadoDTO EmpleadoDTO);
}
