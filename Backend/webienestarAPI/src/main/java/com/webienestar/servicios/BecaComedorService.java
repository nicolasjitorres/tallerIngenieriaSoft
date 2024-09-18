package com.webienestar.servicios;

import com.webienestar.dtos.BecaComedorDTO;
import com.webienestar.mappers.BecaComedorMapper;
import com.webienestar.modelos.BecaComedor;
import com.webienestar.repositorios.BecaComedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BecaComedorService {

    @Autowired
    private BecaComedorRepository becaComedorRepository;

    public List<BecaComedorDTO> obtenerTodos() {
        return becaComedorRepository.findAll().stream()
                .map(BecaComedorMapper.INSTANCE::toDto)
                .collect(Collectors.toList());
    }

    public BecaComedorDTO obtenerPorId(Long id) {
        return becaComedorRepository.findById(id)
                .map(BecaComedorMapper.INSTANCE::toDto)
                .orElse(null);
    }

    public BecaComedorDTO guardar(BecaComedorDTO becaComedorDTO) {
        BecaComedor becaComedor = BecaComedorMapper.INSTANCE.toEntity(becaComedorDTO);
        becaComedor = becaComedorRepository.save(becaComedor);
        return BecaComedorMapper.INSTANCE.toDto(becaComedor);
    }

    public void eliminar(Long id) {
        becaComedorRepository.deleteById(id);
    }
}
