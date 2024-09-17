package com.webienestar.mappers;

import com.webienestar.modelos.Vianda;
import com.webienestar.dtos.ViandaDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ViandaMapper {
    ViandaMapper INSTANCE = Mappers.getMapper(ViandaMapper.class);

    ViandaDTO toDto(Vianda vianda);
    Vianda toEntity(ViandaDTO viandaDTO);
}
