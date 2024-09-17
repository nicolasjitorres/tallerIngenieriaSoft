package com.webienestar.mappers;

import com.webienestar.modelos.BecaComedor;
import com.webienestar.dtos.BecaComedorDTO;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BecaComedorMapper {
    BecaComedorMapper INSTANCE = Mappers.getMapper(BecaComedorMapper.class);

    BecaComedorDTO toDto(BecaComedor becaComedor);
    BecaComedor toEntity(BecaComedorDTO becaComedorDTO);
}
