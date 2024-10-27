package com.webienestar.modelos;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.webienestar.modelos.enums.CondVivienda;
import com.webienestar.modelos.enums.EstadoBeca;
import com.webienestar.modelos.enums.TipoVivienda;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

    @Enumerated(EnumType.STRING)
    private TipoVivienda tipoVivienda;

    @Enumerated(EnumType.STRING)
    private CondVivienda condVivienda;
    
    private String grupoFamiliar;
    private String anio;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private String fecha;

    @Enumerated(EnumType.STRING)
    private EstadoBeca estadoBeca;

    @ManyToOne
    @JoinColumn(name = "estudiante_id")
    @JsonIgnore
    private Estudiante estudiante;
}
