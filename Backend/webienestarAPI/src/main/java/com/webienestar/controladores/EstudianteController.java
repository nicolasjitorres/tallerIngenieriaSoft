package com.webienestar.controladores;

import com.webienestar.dtos.EstudianteDTO;
import com.webienestar.servicios.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/estudiantes")
@CrossOrigin(origins = "http://localhost:5173")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    // Obtener todos los estudiantes
    @GetMapping
    public ResponseEntity<List<EstudianteDTO>> obtenerTodos() {
        List<EstudianteDTO> estudiantes = estudianteService.obtenerTodos();
        if (estudiantes.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 si no hay estudiantes
        }
        return new ResponseEntity<>(estudiantes, HttpStatus.OK); // 200 si hay estudiantes
    }

    // Obtener estudiante por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        EstudianteDTO estudianteDTO = estudianteService.obtenerPorId(id);
        if (estudianteDTO == null) {
            // Se devuelve un mensaje de error en formato JSON
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Estudiante no encontrado"));
        }
        return new ResponseEntity<>(estudianteDTO, HttpStatus.OK); // 200 si se encuentra el estudiante
    }

    // Guardar un estudiante
    @PostMapping
    public ResponseEntity<?> guardar(@Valid @RequestBody EstudianteDTO estudianteDTO) {
        try {
            EstudianteDTO estudianteGuardado = estudianteService.guardar(estudianteDTO);
            return new ResponseEntity<>(estudianteGuardado, HttpStatus.CREATED); // 201 si se crea correctamente
        } catch (Exception e) {
            // Devuelve un mensaje con un error si la solicitud no es válida
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Error al guardar el estudiante"));
        }
    }

    // Eliminar estudiante
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        boolean eliminado = estudianteService.eliminar(id);
        if (eliminado) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 si se elimina correctamente
        } else {
            // Devuelve un mensaje si no se encuentra el estudiante para eliminar
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Estudiante no encontrado"));
        }
    }
}
