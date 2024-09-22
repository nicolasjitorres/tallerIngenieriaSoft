package com.webienestar.modelos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.webienestar.modelos.enums.CondVivienda;
import com.webienestar.modelos.enums.TipoVivienda;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BecaComedor{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean ingresos;
    private TipoVivienda tipoVivienda;
    private CondVivienda condVivienda;
    private String grupoFamiliar;
    private String archivos;
    private String anio;

    @ManyToOne
    @JoinColumn(name = "estudiante_id")
    @JsonIgnore
    private Estudiante estudiante;
}
