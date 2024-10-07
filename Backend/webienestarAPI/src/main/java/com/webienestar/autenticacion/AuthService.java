package com.webienestar.autenticacion;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.webienestar.jwt.JwtService;
import com.webienestar.modelos.Empleado;
import com.webienestar.modelos.Estudiante;
import com.webienestar.repositorios.EmpleadoRepository;
import com.webienestar.repositorios.EstudianteRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    @Autowired
    EstudianteRepository estudianteRepository;

    @Autowired
    EmpleadoRepository empleadoRepository;

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthResponse login(LoginRequest request) {
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        String token;
        String nombre;
        String rol;
        Long id;

        Optional<Estudiante> estudiante = estudianteRepository.findByUsername(request.getUsername());
        Optional<Empleado> empleado = empleadoRepository.findByUsername(request.getUsername());

        if (estudiante.isEmpty()) {
            if (empleado.isEmpty()) {
                throw new NoSuchElementException("Credenciales invalidas.");
            } else {
                token = jwtService.getTokenEmpleado(empleado.get());
                nombre = empleado.get().getNombre();
                rol = empleado.get().getRol().toString();
                id = empleado.get().getId();
            }
        } else {
            token = jwtService.getTokenEstudiante(estudiante.get());
            nombre = estudiante.get().getNombre();
            rol = estudiante.get().getRol().toString();
            id = estudiante.get().getId();
        }

        return AuthResponse.builder()
                .token(token)
                .nombre(nombre)
                .rol(rol)
                .id(id)
                .build();
    }

}