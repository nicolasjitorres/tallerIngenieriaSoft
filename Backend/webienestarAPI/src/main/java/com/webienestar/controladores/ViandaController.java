package com.webienestar.controladores;

import java.util.List;

import com.webienestar.dtos.ViandaDTO;
import com.webienestar.servicios.ViandaService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/viandas")
@CrossOrigin(origins = "http://localhost:3000")
public class ViandaController {
    
    @Autowired
    private ViandaService viandaService;

    @GetMapping
    public List<ViandaDTO> obtenerTodos() {
        return viandaService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ViandaDTO obtenerPorId(@PathVariable Long id) {
        return viandaService.obtenerPorId(id);
    }

    @PostMapping
    public ViandaDTO guardar(@Valid @RequestBody ViandaDTO viandaDTO) {
        return viandaService.guardar(viandaDTO);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        viandaService.eliminar(id);
    }
}
