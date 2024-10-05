package com.webienestar.controladores;

import java.util.List;

import com.webienestar.dtos.BecaComedorDTO;
import com.webienestar.dtos.BecaComedorDetailDTO;
import com.webienestar.servicios.BecaComedorService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


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

    @PostMapping("/guardar")
    public BecaComedorDTO guardar(@Valid @RequestBody BecaComedorDTO becaComedorDTO) {
        return becaComedorService.guardar(becaComedorDTO);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        becaComedorService.eliminar(id);
    }

    @PutMapping("/aprobar")
    public void aprobarBeca(@RequestBody BecaComedorDTO becaComedorDTO) {
        becaComedorService.aprobarBeca(becaComedorDTO);
    }
    
    @PutMapping("/denegar")
    public void denegarBeca(@RequestBody BecaComedorDTO becaComedorDTO) {
       becaComedorService.denegarBeca(becaComedorDTO);
    }

    @GetMapping("/lista")
    public List<BecaComedorDetailDTO> listarBecas() {
        return becaComedorService.listarSolicitudesBeca();
    }
    
}
