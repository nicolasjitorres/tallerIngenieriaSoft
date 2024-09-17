package com.webienestar.mappers;

import com.webienestar.modelos.Estudiante;
import com.webienestar.dtos.EstudianteDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface EstudianteMapper {
    EstudianteMapper INSTANCE = Mappers.getMapper(EstudianteMapper.class);

    EstudianteDTO toDto(Estudiante estudiante);
    Estudiante toEntity(EstudianteDTO estudianteDTO);
}