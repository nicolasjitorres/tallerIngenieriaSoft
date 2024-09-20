package com.webienestar.mappers;

import com.webienestar.modelos.Reserva;
import com.webienestar.dtos.ReservaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReservaMapper {

    @Mapping(source = "estudiante.id", target = "idEstudiante")
    @Mapping(source = "vianda.id", target = "idVianda")
    ReservaDTO toDto(Reserva reserva);

    @Mapping(source = "idEstudiante", target = "estudiante.id")
    @Mapping(source = "idVianda", target = "vianda.id")
    Reserva toEntity(ReservaDTO reservaDTO);
}
