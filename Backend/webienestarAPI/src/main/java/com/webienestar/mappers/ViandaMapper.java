package com.webienestar.mappers;

import com.webienestar.modelos.Vianda;
import com.webienestar.dtos.ViandaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ReservaMapper.class})
public interface ViandaMapper {

    @Mapping(source = "reservas", target = "reservasDTO")
    ViandaDTO toDto(Vianda vianda);

    @Mapping(source = "reservasDTO", target = "reservas")
    Vianda toEntity(ViandaDTO viandaDTO);
}
