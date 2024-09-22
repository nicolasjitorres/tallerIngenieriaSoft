package com.webienestar.controladores;

import java.util.List;

import com.webienestar.dtos.EmpleadoDTO;
import com.webienestar.servicios.EmpleadoService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/empleados")
public class EmpleadoController {
    
    @Autowired
    private EmpleadoService empleadoService;

    @GetMapping
    public List<EmpleadoDTO> obtenerTodos() {
        return empleadoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public EmpleadoDTO obtenerPorId(@PathVariable Long id) {
        return empleadoService.obtenerPorId(id);
    }

    @PostMapping
    public EmpleadoDTO guardar(@Valid @RequestBody EmpleadoDTO empleadoDTO) {
        return empleadoService.guardar(empleadoDTO);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        empleadoService.eliminar(id);
    }
}
