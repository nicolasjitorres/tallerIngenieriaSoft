package com.webienestar.controladores;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import com.webienestar.modelos.enums.EstadoReserva;

import com.webienestar.dtos.ReservaDTO;
import com.webienestar.mappers.ReservaMapper;
import com.webienestar.modelos.Reserva;
import com.webienestar.repositorios.ReservaRepository;
import com.webienestar.dtos.ViandaDTO;
import com.webienestar.servicios.ReservaService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservas")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private ReservaMapper reservaMapper;

    @Autowired
    private ReservaRepository reservaRepository;

    @GetMapping
    public List<ReservaDTO> obtenerTodos() {
        return reservaService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ReservaDTO obtenerPorId(@PathVariable Long id) {
        return reservaService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        reservaService.eliminar(id);
    }

    @PutMapping("/actualizar-cantidad")
    public ResponseEntity<?> actualizarCantidadPorReservas(@RequestBody List<ReservaDTO> reservas) {
        try {
            reservaService.actualizarCantidadPorReservas(reservas);
            return ResponseEntity.ok("Cantidad de viandas actualizada con éxito.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error al actualizar la cantidad de viandas: " + e.getMessage());
        }
    }

    @GetMapping("/verificar/{idEstudiante}")
    public ResponseEntity<?> verificarReserva(@PathVariable Long idEstudiante) {
        String fechaHoy = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")); // Formato dd-MM-yyyy
        Reserva tieneReserva = reservaService.verificarReserva(idEstudiante, fechaHoy);
        if (tieneReserva != null) {
            return ResponseEntity.ok(tieneReserva);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al verificar la reserva del estudiante. ");
    }

    @PostMapping
    public ResponseEntity<?> crearReserva(@Valid @RequestBody ReservaDTO reservaDTO) {
        try {
            // Convertir DTO a entidad Reserva
            Reserva reserva = reservaMapper.toEntity(reservaDTO); // Asegúrate de que esto sea correcto

            // Guardar la reserva usando el servicio
            reserva = reservaService.guardar(reserva); // Aquí usamos la entidad, que es lo que el servicio espera
            return new ResponseEntity<>(reservaMapper.toDto(reserva), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear la reserva: " + e.getMessage());
        }
    }

    @GetMapping("/calificar/{idEstudiante}")
    public ResponseEntity<Reserva> getReservaParaCalificar(
            @PathVariable Long idEstudiante) {

        // Obtener la fecha de hoy
        String fechaHoy = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        // Buscar la reserva para el estudiante y la fecha actual
        Optional<Reserva> reserva = reservaRepository.findByEstudiante_IdAndFechaAndEstado(
                idEstudiante, fechaHoy, EstadoReserva.RETIRADA);

        // Retornar la reserva si existe, o un estado 204 No Content si no hay reservas
        // para calificar
        return reserva.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PutMapping("/cancelar/{idEstudiante}")
    public ResponseEntity<String> cancelarVianda(@PathVariable Long idEstudiante) {
        String fechaHoy = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));

        // Busca la reserva en estado CONFIRMADA
        Optional<Reserva> reserva = reservaRepository.findByEstudiante_IdAndFechaAndEstado(
                idEstudiante, fechaHoy, EstadoReserva.RESERVADA);

        if (reserva.isPresent()) {
            Reserva reservaEncontrada = reserva.get();
            reservaEncontrada.setEstado(EstadoReserva.CANCELADA); // Cambia el estado a CANCELADA
            reservaRepository.save(reservaEncontrada);
            return ResponseEntity.ok("Vianda cancelada con éxito.");
        } else {
            // Devuelve un 404 si no se encuentra ninguna reserva confirmada
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontró una reserva confirmada para el estudiante en la fecha de hoy.");
        }
    }

    @PutMapping
    public void actualizarEstadoReserva(@RequestBody ReservaDTO reservaDTO){
        reservaService.actualizarRetirarVianda(reservaDTO);;
    }

    
    @PutMapping("/retroalimentacion")
    public void emitarRetroalimentacion(@RequestBody ReservaDTO reservaDTO){
        reservaService.emitarRetroalimentacion(reservaDTO);;
    }

}
