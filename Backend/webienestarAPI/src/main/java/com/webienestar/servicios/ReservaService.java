package com.webienestar.servicios;

import com.webienestar.dtos.EstudianteDTO;
import com.webienestar.dtos.ReservaDTO;
import com.webienestar.dtos.ReservaDetailDTO;
import com.webienestar.dtos.ViandaDTO;
import com.webienestar.mappers.ReservaMapper;
import com.webienestar.modelos.Reserva;
import com.webienestar.modelos.Vianda;
import com.webienestar.modelos.enums.EstadoReserva;
import com.webienestar.repositorios.ReservaRepository;
import com.webienestar.repositorios.ViandaRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.util.Date;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private ReservaMapper reservaMapper;

    @Autowired
    private ViandaRepository viandaRepository;

    @Autowired
    private EstudianteService estudianteService;

    @Autowired
    private ViandaService viandaService;

    public List<ReservaDTO> obtenerTodos() {
        return reservaRepository.findAll().stream()
                .map(reservaMapper::toDto)
                .collect(Collectors.toList());
    }

    public ReservaDTO obtenerPorId(Long id) {
        return reservaRepository.findById(id)
                .map(reservaMapper::toDto)
                .orElse(null);
    }

    public ReservaDTO guardar(ReservaDTO reservaDTO) {
        Reserva reserva = reservaMapper.toEntity(reservaDTO);
        Optional<Vianda> viandaPresente = viandaRepository.findById(reserva.getVianda().getId());

        if (viandaPresente.isEmpty()) {
            throw new EntityNotFoundException(
                    "La vianda con id " + reserva.getVianda().getId() + " no fue encontrada.");
        }

        if (viandaPresente.get().getCantidad() <= 0) {
            throw new IllegalStateException(
                    "No hay más viandas disponibles para la reserva con ID: " + reserva.getId());
        }

        Vianda vianda = viandaPresente.get();
        vianda.setCantidad(vianda.getCantidad() - 1);
        viandaRepository.saveAndFlush(vianda);
        LocalDate hoy = LocalDate.now();
        String fechaHoy = hoy.format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        reserva.setFecha(fechaHoy);
        return reservaMapper.toDto(reservaRepository.save(reserva));
    }

    public void eliminar(Long id) {
        reservaRepository.deleteById(id);
    }

    public void actualizarCantidadPorReservas(List<ReservaDTO> reservas) {
        for (ReservaDTO reserva : reservas) {
            Optional<Vianda> viandaPresente = viandaRepository.findById(reserva.getIdVianda());

            if (viandaPresente.isEmpty()) {
                throw new EntityNotFoundException("La vianda con id " + reserva.getIdVianda() + " no fue encontrada.");
            }

            if (viandaPresente.get().getCantidad() <= 0) {
                throw new IllegalStateException(
                        "No hay más viandas disponibles para la reserva con ID: " + reserva.getId());
            }

            Vianda vianda = viandaPresente.get();
            vianda.setCantidad(vianda.getCantidad() - 1);
            viandaRepository.saveAndFlush(vianda);
        }
    }

    public ReservaDTO verificarReserva(Long idEstudiante, String fecha) {
        Optional<Reserva> reserva = reservaRepository.findByEstudiante_IdAndFecha(idEstudiante, fecha);
        if (reserva.isPresent()) {
            return reservaMapper.toDto(reserva.get());
        } else {
            return null;
        }
    }

    public void cancelarVianda(Long idEstudiante) {
        String fechaHoy = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        Optional<Reserva> reserva = reservaRepository.findByEstudiante_IdAndFechaAndEstado(
                idEstudiante, fechaHoy, EstadoReserva.RESERVADA);
        if (reserva.isPresent()) {
            Reserva reservaEncontrada = reserva.get();
            reservaEncontrada.setEstado(EstadoReserva.CANCELADA);
            reservaRepository.save(reservaEncontrada);
        } else {
            throw new EntityNotFoundException(
                    "No se encontró una reserva confirmada para el estudiante en la fecha de hoy.");
        }
    }

    public void actualizarRetirarVianda(ReservaDTO reservaDTO) {
        Optional<Reserva> reservaAActualizar = reservaRepository.findById(reservaDTO.getId());
        LocalDate fechaActual = LocalDate.now();
        DateTimeFormatter formateador = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String fechaFormateada = fechaActual.format(formateador);

        if (reservaAActualizar.isPresent() && (reservaAActualizar.get().getFecha().equals(fechaFormateada))) {
            Reserva reservaParaActualizar = reservaAActualizar.get();
            reservaParaActualizar.setEstado(EstadoReserva.RETIRADA);
            reservaRepository.saveAndFlush(reservaParaActualizar);
        }
    }

    public void emitarRetroalimentacion(ReservaDTO reservaDTO) {
        Optional<Reserva> reservaCalificar = reservaRepository.findById(reservaDTO.getId());

        if (reservaCalificar.isPresent()) {
            Reserva reservaParaCalificar = reservaCalificar.get();
            reservaParaCalificar.setCalificacion(reservaDTO.getCalificacion());
            reservaParaCalificar.setOpinion(reservaDTO.getOpinion());
            reservaParaCalificar.setEstado(EstadoReserva.CALIFICADA);
            reservaRepository.saveAndFlush(reservaParaCalificar);
        }
    }

    public List<?> obtenerTodasDelDia() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        String fechaActual = LocalDate.now().format(formatter);

        List<ReservaDTO> reservas = reservaRepository.findAll().stream()
                .map(reservaMapper::toDto)
                .filter(reserva -> reserva.getFecha().equals(fechaActual) && reserva.getEstado() == "RESERVADA")
                .collect(Collectors.toList());

        List<EstudianteDTO> estudiantes = estudianteService.obtenerTodos();
        List<ViandaDTO> viandas = viandaService.obtenerTodos();

        Map<Long, EstudianteDTO> estudianteMap = estudiantes.stream()
                .collect(Collectors.toMap(EstudianteDTO::getId, estudiante -> estudiante));

        Map<Long, ViandaDTO> viandaMap = viandas.stream()
                .collect(Collectors.toMap(ViandaDTO::getId, vianda -> vianda));

        List<ReservaDetailDTO> detalles = reservas.stream()
                .map(reserva -> {
                    EstudianteDTO estudiante = estudianteMap.get(reserva.getIdEstudiante());
                    ViandaDTO vianda = viandaMap.get(reserva.getIdVianda());

                    ReservaDetailDTO reservaDetail = new ReservaDetailDTO();
                    reservaDetail.setId(reserva.getId());
                    reservaDetail.setNombreEstudiante(estudiante.getNombre());
                    reservaDetail.setPlato(vianda.getPlato());
                    reservaDetail.setPostre(vianda.getPostre());
                    reservaDetail.setFecha(fechaActual);
                    return reservaDetail;
                })
                .collect(Collectors.toList());

        return detalles;
    }

    public List<?> obtenerReservasEstudianteVianda(String fechaInicioStr) throws ParseException {

        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
        Date fechaInicio = dateFormat.parse(fechaInicioStr);

        // Obtener las reservas y filtrar por estado "RETIRADA" y fecha mayor o igual a
        // la fecha de inicio
        List<ReservaDTO> reservas = reservaRepository.findAll().stream()
                .map(reservaMapper::toDto)
                .filter(reserva -> "RETIRADA".equals(reserva.getEstado())) // Verificar si el estado es "RETIRADA"
                .filter(reserva -> {
                    try {
                        // Convertir la fecha de la reserva a un objeto Date
                        Date fechaReserva = dateFormat.parse(reserva.getFecha());
                        return !fechaReserva.before(fechaInicio); // Filtrar si la fecha de reserva es >= a la fecha de
                                                                  // inicio
                    } catch (ParseException e) {
                        e.printStackTrace();
                        return false;
                    }
                })
                .collect(Collectors.toList());

        List<EstudianteDTO> estudiantes = estudianteService.obtenerTodos();
        List<ViandaDTO> viandas = viandaService.obtenerTodos();

        Map<Long, EstudianteDTO> estudianteMap = estudiantes.stream()
                .collect(Collectors.toMap(EstudianteDTO::getId, estudiante -> estudiante));

        Map<Long, ViandaDTO> viandaMap = viandas.stream()
                .collect(Collectors.toMap(ViandaDTO::getId, vianda -> vianda));

        List<ReservaDetailDTO> detalles = reservas.stream()
                .map(reserva -> {
                    EstudianteDTO estudiante = estudianteMap.get(reserva.getIdEstudiante());
                    ViandaDTO vianda = viandaMap.get(reserva.getIdVianda());

                    ReservaDetailDTO reservaDetail = new ReservaDetailDTO();
                    reservaDetail.setId(reserva.getId());
                    reservaDetail.setNombreEstudiante(estudiante.getNombre());
                    reservaDetail.setBecario(estudianteService.tieneBecaComedorEsteAnio(estudiante.getId()));
                    reservaDetail.setPlato(vianda.getPlato());
                    reservaDetail.setPostre(vianda.getPostre());
                    reservaDetail.setFecha(reserva.getFecha());
                    reservaDetail.setTipoVianda(vianda.getTipo());
                    return reservaDetail;
                })
                .collect(Collectors.toList());

        return detalles;
    }

}
