package com.webienestar.mappers;

import com.webienestar.modelos.BecaComedor;
import com.webienestar.dtos.BecaComedorDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BecaComedorMapper {

    @Mapping(source = "estudiante.id", target = "idEstudiante")
    BecaComedorDTO toDto(BecaComedor becaComedor);

    @Mapping(source = "idEstudiante", target = "estudiante.id")
    BecaComedor toEntity(BecaComedorDTO becaComedorDTO);
}

