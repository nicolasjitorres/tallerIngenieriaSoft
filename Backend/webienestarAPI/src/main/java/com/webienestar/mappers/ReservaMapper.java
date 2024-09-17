package com.webienestar.mappers;

import com.webienestar.modelos.Reserva;
import com.webienestar.dtos.ReservaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ReservaMapper {
    ReservaMapper INSTANCE = Mappers.getMapper(ReservaMapper.class);

    ReservaDTO toDto(Reserva reserva);
    Reserva toEntity(ReservaDTO reservaDTO);
}
