package com.webienestar.servicios;

import com.webienestar.dtos.BecaComedorDTO;
import com.webienestar.dtos.BecaComedorDetailDTO;
import com.webienestar.dtos.EstudianteDTO;
import com.webienestar.excepciones.ResourceNotFoundException;
import com.webienestar.mappers.BecaComedorMapper;
import com.webienestar.modelos.BecaComedor;
import com.webienestar.modelos.Estudiante;
import com.webienestar.modelos.enums.EstadoBeca;
import com.webienestar.repositorios.BecaComedorRepository;
import com.webienestar.repositorios.EstudianteRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.util.Map;
import java.util.function.Function;

@Service
public class BecaComedorService {

    @Autowired
    private BecaComedorRepository becaComedorRepository;

    @Autowired
    private BecaComedorMapper becaComedorMapper;

    @Autowired
    private EstudianteRepository estudianteRepository;

    public List<BecaComedorDTO> obtenerTodos() {
        return becaComedorRepository.findAll().stream()
                .map(becaComedorMapper::toDto)
                .collect(Collectors.toList());
    }

    public BecaComedorDTO obtenerPorId(Long id) {
        return becaComedorRepository.findById(id)
                .map(becaComedorMapper::toDto)
                .orElse(null);
    }

    public BecaComedorDTO guardar(BecaComedorDTO becaComedorDTO) {
        Optional<Estudiante> estudiante = estudianteRepository.findById(becaComedorDTO.getIdEstudiante());

        if (estudiante.isEmpty()) {
            throw new ResourceNotFoundException("Estudiante no encontrado con ID " + becaComedorDTO.getIdEstudiante());
        }

        becaComedorDTO.setAnio("" + LocalDate.now().getYear());

        if (becaComedorRepository.existsByEstudianteAndAnio(estudiante, becaComedorDTO.getAnio())) {
            throw new ResourceNotFoundException(
                    "El estudiante ya posee una inscripcion en el año académico " + becaComedorDTO.getAnio());
        }

        BecaComedor becaComedor = becaComedorMapper.toEntity(becaComedorDTO);
        becaComedor = becaComedorRepository.save(becaComedor);
        return becaComedorMapper.toDto(becaComedor);
    }

    public void eliminar(Long id) {
        becaComedorRepository.deleteById(id);
    }

    public void aprobarBeca(BecaComedorDTO becaComedorDTO) {
        Optional<BecaComedor> becaAActualizar = becaComedorRepository.findById(becaComedorDTO.getId());
        if (becaAActualizar.isPresent() && becaAActualizar.get().getEstadoBeca() == EstadoBeca.EN_EVALUACION) {
            BecaComedor becaParaActualizar = becaAActualizar.get();
            becaParaActualizar.setEstadoBeca(EstadoBeca.APROBADA);
            becaComedorRepository.saveAndFlush(becaParaActualizar);
        }
    }

    public void denegarBeca(BecaComedorDTO becaComedorDTO) {
        Optional<BecaComedor> becaAActualizar = becaComedorRepository.findById(becaComedorDTO.getId());
        if (becaAActualizar.isPresent() && becaAActualizar.get().getEstadoBeca() == EstadoBeca.EN_EVALUACION) {
            BecaComedor becaParaActualizar = becaAActualizar.get();
            becaParaActualizar.setEstadoBeca(EstadoBeca.DENEGADA);
            becaComedorRepository.saveAndFlush(becaParaActualizar);
        }
    }

    public List<BecaComedorDTO> obtenerBecasEnEvaluacionDeEsteAnio() {
        int anioActual = LocalDate.now().getYear();

        List<BecaComedorDTO> todasLasBecas = obtenerTodos();

        List<BecaComedorDTO> becasFiltradas = todasLasBecas.stream()
                .filter(beca -> {
                    return Integer.parseInt(beca.getAnio()) == anioActual &&
                            "EN_EVALUACION".equals(beca.getEstadoBeca());
                })
                .collect(Collectors.toList());

        return becasFiltradas;
    }

    public List<BecaComedorDetailDTO> listarSolicitudesBeca() {
        List<BecaComedorDTO> becas = obtenerBecasEnEvaluacionDeEsteAnio();
        List<Estudiante> estudiantes = estudianteRepository.findAll();

        Map<Long, Estudiante> estudiantesMap = estudiantes.stream()
                .collect(Collectors.toMap(Estudiante::getId, Function.identity()));

        List<BecaComedorDetailDTO> solicitudesBeca = new ArrayList<>();
        for (BecaComedorDTO beca : becas) {
            Estudiante estudiante = estudiantesMap.get(beca.getIdEstudiante());
            if (estudiante != null) {
                BecaComedorDetailDTO detailDTO = new BecaComedorDetailDTO();
                detailDTO.setId(beca.getId());
                detailDTO.setNombreEst(estudiante.getNombre());
                detailDTO.setCarrera(estudiante.getCarrera());
                detailDTO.setEmail(estudiante.getMail());
                detailDTO.setEstado(beca.getEstadoBeca());

                solicitudesBeca.add(detailDTO);
            }
        }

        return solicitudesBeca;
    }

}
