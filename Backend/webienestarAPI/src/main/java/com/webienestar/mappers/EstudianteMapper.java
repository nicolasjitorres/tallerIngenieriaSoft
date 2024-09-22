package com.webienestar.mappers;
import com.webienestar.modelos.Estudiante;
import com.webienestar.dtos.EstudianteDTO;


import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {BecaComedorMapper.class, ReservaMapper.class})
/*public interface EstudianteMapper {

    @Mapping(source = "becasComedor", target = "becasComedorDTO")
    @Mapping(source = "reservas", target = "reservasDTO")
    EstudianteDTO toDto(Estudiante estudiante);

    @Mapping(source = "becasComedorDTO", target = "becasComedor")
    @Mapping(source = "reservasDTO", target = "reservas")
    Estudiante toEntity(EstudianteDTO estudianteDTO);

}*/
public interface EstudianteMapper {

    EstudianteDTO toDto(Estudiante estudiante);

    Estudiante toEntity(EstudianteDTO estudianteDTO);
}
