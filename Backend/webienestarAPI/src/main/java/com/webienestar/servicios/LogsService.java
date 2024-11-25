package com.webienestar.servicios;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.webienestar.modelos.Logs;
import com.webienestar.repositorios.LogsRepository;

@Service
public class LogsService {
    
    @Autowired
    LogsRepository logsRepository;

    public void registrarAccion(Logs log){
        logsRepository.save(log);
    }

}
