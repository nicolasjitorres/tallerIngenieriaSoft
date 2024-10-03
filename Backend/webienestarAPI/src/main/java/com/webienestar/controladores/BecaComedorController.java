package com.webienestar.controladores;

import java.util.List;

import com.webienestar.dtos.BecaComedorDTO;
import com.webienestar.dtos.ViandaDTO;
import com.webienestar.modelos.enums.EstadoBeca;
import com.webienestar.modelos.enums.Rol;
import com.webienestar.servicios.BecaComedorService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/becascomedor")
@CrossOrigin(origins = "http://localhost:3000")
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
        if(becaComedorDTO.getEstadoBeca() == null){
            becaComedorDTO.setEstadoBeca(EstadoBeca.EN_EVALUACION);
        }
        return becaComedorService.guardar(becaComedorDTO);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        becaComedorService.eliminar(id);
    }

    @PutMapping("/aprobar")
    public void aprobarBeca(@RequestBody BecaComedorDTO becaComedorDTO) {
        System.out.println("DTO recibido: " + becaComedorDTO.getId() + " Estado: " + becaComedorDTO.getEstadoBeca());
        becaComedorService.aprobarBeca(becaComedorDTO);
    }
    
    @PutMapping("/denegar")
    public void denegarBeca(@RequestBody BecaComedorDTO becaComedorDTO) {
        System.out.println("DTO recibido: " + becaComedorDTO.getId() + " Estado: " + becaComedorDTO.getEstadoBeca());
        becaComedorService.denegarBeca(becaComedorDTO);
    }
    


}
