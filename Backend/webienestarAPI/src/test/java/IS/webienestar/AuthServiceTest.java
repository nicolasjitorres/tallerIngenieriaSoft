package IS.webienestar;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import com.webienestar.autenticacion.AuthResponse;
import com.webienestar.autenticacion.AuthService;
import com.webienestar.autenticacion.LoginRequest;
import com.webienestar.jwt.JwtService;
import com.webienestar.modelos.Empleado;
import com.webienestar.modelos.Estudiante;
import com.webienestar.modelos.enums.Rol;
import com.webienestar.repositorios.EmpleadoRepository;
import com.webienestar.repositorios.EstudianteRepository;
import com.webienestar.WebienestarApplication;

@SpringBootTest(classes = WebienestarApplication.class)
public class AuthServiceTest {

    @MockBean
    private EstudianteRepository estudianteRepository;

    @MockBean
    private EmpleadoRepository empleadoRepository;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtService jwtService;

    @Autowired
    private AuthService authService;
    private LoginRequest studentRequest;
    private LoginRequest employeeRequest;
    private LoginRequest invalidRequest;

    @BeforeEach
    void setUp() {
        studentRequest = new LoginRequest("studentUsername", "studentPassword");
        employeeRequest = new LoginRequest("employeeUsername", "employeePassword");
        invalidRequest = new LoginRequest("invalidUsername", "invalidPassword");

        // Configurar comportamiento del mock de Authentication
        Authentication authentication = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);

        // Cambiar el comportamiento de los mocks para el repositorio
        when(estudianteRepository.findByUsername(anyString())).thenReturn(Optional.empty());
        when(empleadoRepository.findByUsername(anyString())).thenReturn(Optional.empty());
    }

    @Test
    @DisplayName("Se ha iniciado sesión correctamente para Estudiante")
    void testLoginAsStudent() {
        Estudiante estudiante = new Estudiante();
        estudiante.setId(1L);
        estudiante.setNombre("Student Name");
        estudiante.setRol(Rol.ESTUDIANTE);

        when(estudianteRepository.findByUsername("studentUsername")).thenReturn(Optional.of(estudiante));
        when(empleadoRepository.findByUsername("studentUsername")).thenReturn(Optional.empty());
        when(jwtService.getTokenEstudiante(estudiante)).thenReturn("studentToken");

        AuthResponse response = authService.login(studentRequest);

        assertEquals("studentToken", response.getToken());
        assertEquals("Student Name", response.getNombre());
        assertEquals("ESTUDIANTE", response.getRol());
        assertEquals(1L, response.getId());
    }

    @Test
    @DisplayName("Se ha iniciado sesión correctamente para Empleado (ADMIN)")
    void testLoginAsEmployee() {
        Empleado empleado = new Empleado();
        empleado.setId(2L);
        empleado.setNombre("Employee Name");
        empleado.setRol(Rol.ADMIN);

        when(estudianteRepository.findByUsername("employeeUsername")).thenReturn(Optional.empty());
        when(empleadoRepository.findByUsername("employeeUsername")).thenReturn(Optional.of(empleado));
        when(jwtService.getTokenEmpleado(empleado)).thenReturn("employeeToken");

        AuthResponse response = authService.login(employeeRequest);

        assertEquals("employeeToken", response.getToken());
        assertEquals("Employee Name", response.getNombre());
        assertEquals("ADMIN", response.getRol());
        assertEquals(2L, response.getId());

        System.out.println("Inicio de sesión exitoso para el estudiante: " + response.getNombre());
    }

    @Test
    @DisplayName("No se ha iniciado sesión para credenciales invalidas")
    void testLoginWithInvalidCredentials() {
        when(estudianteRepository.findByUsername("invalidUsername")).thenReturn(Optional.empty());
        when(empleadoRepository.findByUsername("invalidUsername")).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> authService.login(invalidRequest));
    }

}
