package com.webienestar.controladores;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.webienestar.modelos.Logs;
import com.webienestar.servicios.LogsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/logs")
public class LogsController {

    @Autowired
    private LogsService logsService;

    @PostMapping
    public String registrarLog(@RequestBody Logs log) {
        log.setFechaHora(LocalDateTime.now());
        logsService.registrarAccion(log);
        return log.getMensaje();
    }
    

}
