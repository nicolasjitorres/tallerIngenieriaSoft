package com.webienestar.repositorios;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.webienestar.modelos.Vianda;


@Repository
public interface ViandaRepository extends JpaRepository<Vianda, Long>{
    
}
