package com.webienestar.controladores;

import java.util.List;

import com.webienestar.dtos.BecaComedorDTO;
import com.webienestar.servicios.BecaComedorService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/becascomedor")
public class BecaComedorController {
    
    @Autowired
    private BecaComedorService becaComedorService;

    @GetMapping
    public List<BecaComedorDTO> obtenerTodos() {
        return becaComedorService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public BecaComedorDTO obtenerPorId(@PathVariable Long id) {
        return becaComedorService.obtenerPorId(id);
    }

    @PostMapping
    public BecaComedorDTO guardar(@Valid @RequestBody BecaComedorDTO becaComedorDTO) {
        return becaComedorService.guardar(becaComedorDTO);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        becaComedorService.eliminar(id);
    }
}
