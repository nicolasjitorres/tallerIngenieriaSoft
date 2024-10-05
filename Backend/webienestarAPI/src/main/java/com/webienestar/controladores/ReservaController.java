package com.webienestar.controladores;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import com.webienestar.modelos.enums.EstadoReserva;
import com.webienestar.repositorios.ReservaRepository;
import com.webienestar.dtos.ReservaDTO;
import com.webienestar.modelos.Reserva;
import com.webienestar.servicios.ReservaService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reservas")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

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

    @PostMapping
    public ResponseEntity<?> crearReserva(@Valid @RequestBody ReservaDTO reservaDTO) {
        try {
            return new ResponseEntity<>(reservaService.guardar(reservaDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al crear la reserva: " + e.getMessage());
        }
    }

    // @PostMapping
    // public ReservaDTO guardar(@Valid @RequestBody ReservaDTO reservaDTO) {
    // return reservaService.guardar(reservaDTO);
    // }

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
        String fechaHoy = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        Reserva reserva = reservaService.verificarReserva(idEstudiante, fechaHoy);
        if (reserva != null) {
            return ResponseEntity.ok(reserva);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al verificar la reserva del estudiante. ");
    }

    @GetMapping("/calificar/{idEstudiante}")
    public ResponseEntity<Reserva> getReservaParaCalificar(@PathVariable Long idEstudiante) {
        String fechaHoy = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        Optional<Reserva> reserva = reservaRepository.findByEstudiante_IdAndFechaAndEstado(
                idEstudiante, fechaHoy, EstadoReserva.RETIRADA);
        return reserva.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PutMapping("/cancelar/{idEstudiante}")
    public ResponseEntity<String> cancelarVianda(@PathVariable Long idEstudiante) {
        String fechaHoy = LocalDate.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        Optional<Reserva> reserva = reservaRepository.findByEstudiante_IdAndFechaAndEstado(idEstudiante, fechaHoy,
                EstadoReserva.RESERVADA);

        if (reserva.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontró una reserva confirmada para el estudiante en la fecha de hoy.");
        }

        Reserva reservaEncontrada = reserva.get();
        reservaEncontrada.setEstado(EstadoReserva.CANCELADA);
        reservaRepository.save(reservaEncontrada);
        return ResponseEntity.ok("Vianda cancelada con éxito.");

    }

    @PutMapping
    public void actualizarEstadoReserva(@RequestBody ReservaDTO reservaDTO) {
        reservaService.actualizarRetirarVianda(reservaDTO);
    }

    @PutMapping("/retroalimentacion")
    public void emitarRetroalimentacion(@RequestBody ReservaDTO reservaDTO) {
        reservaService.emitarRetroalimentacion(reservaDTO);
    }
}
