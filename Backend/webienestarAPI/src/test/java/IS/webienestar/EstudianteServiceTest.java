package IS.webienestar;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.webienestar.configuracion.ApplicationConfig;
import com.webienestar.dtos.EstudianteDTO;
import com.webienestar.excepciones.DuplicateFieldException;
import com.webienestar.mappers.EstudianteMapper;
import com.webienestar.modelos.Estudiante;
import com.webienestar.modelos.enums.Rol;
import com.webienestar.repositorios.EstudianteRepository;
import com.webienestar.servicios.EstudianteService;

@ExtendWith(MockitoExtension.class)
class EstudianteServiceTest {

    @Mock
    private EstudianteRepository estudianteRepository;

    @Mock
    private EstudianteMapper estudianteMapper;

    @Mock
    private ApplicationConfig securityHasher;

    @InjectMocks
    private EstudianteService estudianteService;

    @Test
    void testObtenerTodos() {
        // Datos simulados
        List<Estudiante> estudiantes = List
                .of(new Estudiante(1L, "123", "Ingeniería", "Facultad X", Rol.ESTUDIANTE, null, null));
        List<EstudianteDTO> estudiantesDTO = List.of(new EstudianteDTO());
        estudiantesDTO.get(0).setId(1L);
        estudiantesDTO.get(0).setLegajo("123");

        // Mock del repositorio y el mapper
        Mockito.when(estudianteRepository.findAll()).thenReturn(estudiantes);
        Mockito.when(estudianteMapper.toDto(any(Estudiante.class))).thenReturn(estudiantesDTO.get(0));

        // Llamada al servicio
        List<EstudianteDTO> resultado = estudianteService.obtenerTodos();

        // Verificación
        assertThat(resultado).hasSize(1);
        assertThat(resultado.get(0).getId()).isEqualTo(1L);
        Mockito.verify(estudianteRepository).findAll();
    }

    @Test
    void testGuardarNuevoEstudiante() {
        // Datos de entrada
        EstudianteDTO estudianteDTO = new EstudianteDTO();
        estudianteDTO.setDni(12345678L);
        estudianteDTO.setLegajo("123");
        estudianteDTO.setPassword("password123");

        Estudiante estudiante = new Estudiante();
        estudiante.setId(1L);

        // Crear un PasswordEncoder simulado
        PasswordEncoder mockPasswordEncoder = Mockito.mock(PasswordEncoder.class);
        Mockito.when(mockPasswordEncoder.encode(anyString())).thenReturn("hashedPassword123");

        // Mock del método passwordEncoder()
        Mockito.when(securityHasher.passwordEncoder()).thenReturn(mockPasswordEncoder);

        // Mock del repositorio y mapper
        Mockito.when(estudianteRepository.existsByDni(estudianteDTO.getDni())).thenReturn(false);
        Mockito.when(estudianteRepository.existsByLegajo(estudianteDTO.getLegajo())).thenReturn(false);
        Mockito.when(estudianteMapper.toEntity(estudianteDTO)).thenReturn(estudiante);
        Mockito.when(estudianteRepository.save(estudiante)).thenReturn(estudiante);
        Mockito.when(estudianteMapper.toDto(estudiante)).thenReturn(estudianteDTO);

        // Llamada al servicio
        EstudianteDTO resultado = estudianteService.guardar(estudianteDTO);

        // Verificación
        assertThat(resultado.getDni()).isEqualTo(12345678L);
        Mockito.verify(estudianteRepository).save(estudiante);
    }

    @Test
    void testGuardarEstudianteConDniExistente() {
        // Datos de entrada
        EstudianteDTO estudianteDTO = new EstudianteDTO();
        estudianteDTO.setDni(12345678L); // DNI que ya existe
        estudianteDTO.setLegajo("123");
        estudianteDTO.setPassword("password123");

        // Mock del repositorio
        Mockito.when(estudianteRepository.existsByDni(estudianteDTO.getDni())).thenReturn(true);

        // Llamada al servicio y verificación
        try {
            estudianteService.guardar(estudianteDTO);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(DuplicateFieldException.class)
                    .hasMessageContaining("El DNI ya está en uso");
        }
        Mockito.verify(estudianteRepository, Mockito.never()).save(any(Estudiante.class));
    }

    @Test
    void testGuardarEstudianteConLegajoExistente() {
        // Datos de entrada
        EstudianteDTO estudianteDTO = new EstudianteDTO();
        estudianteDTO.setDni(12345678L);
        estudianteDTO.setLegajo("123"); // Legajo que ya existe
        estudianteDTO.setPassword("password123");

        // Mock del repositorio
        Mockito.when(estudianteRepository.existsByLegajo(estudianteDTO.getLegajo())).thenReturn(true);

        // Llamada al servicio y verificación
        try {
            estudianteService.guardar(estudianteDTO);
        } catch (Exception e) {
            assertThat(e).isInstanceOf(DuplicateFieldException.class)
                    .hasMessageContaining("El legajo ya está en uso");
        }
        Mockito.verify(estudianteRepository, Mockito.never()).save(any(Estudiante.class));
    }

    @Test
    void testObtenerEstudiantePorId() {
        // Datos simulados
        Estudiante estudiante = new Estudiante(1L, "123", "Ingeniería", "Facultad X", Rol.ESTUDIANTE, null, null);
        EstudianteDTO estudianteDTO = new EstudianteDTO();
        estudianteDTO.setId(1L);
        estudianteDTO.setLegajo("123");

        // Mock del repositorio y mapper
        Mockito.when(estudianteRepository.findById(1L)).thenReturn(java.util.Optional.of(estudiante));
        Mockito.when(estudianteMapper.toDto(estudiante)).thenReturn(estudianteDTO);

        // Llamada al servicio
        EstudianteDTO resultado = estudianteService.obtenerPorId(1L);

        // Verificación
        assertThat(resultado).isNotNull();
        assertThat(resultado.getId()).isEqualTo(1L);
        assertThat(resultado.getLegajo()).isEqualTo("123");
        Mockito.verify(estudianteRepository).findById(1L);
    }

    @Test
    void testObtenerEstudiantePorIdNoExistente() {
        // Mock del repositorio
        Mockito.when(estudianteRepository.findById(999L)).thenReturn(java.util.Optional.empty());

        // Llamada al servicio y verificación
        EstudianteDTO resultado = estudianteService.obtenerPorId(999L);
        assertThat(resultado).isNull();
        Mockito.verify(estudianteRepository).findById(999L);
    }

    @Test
    void testEliminarEstudiante() {
        // Datos simulados
        Estudiante estudiante = new Estudiante(1L, "123", "Ingeniería", "Facultad X", Rol.ESTUDIANTE, null, null);

        // Configura el mock para que findById retorne un Optional con el estudiante
        Mockito.when(estudianteRepository.findById(1L)).thenReturn(Optional.of(estudiante));

        // Llamada al servicio
        estudianteService.eliminar(1L);

        // Verificación: deleteById debe haber sido llamado una vez con el ID 1L
        Mockito.verify(estudianteRepository, Mockito.times(1)).deleteById(1L);
    }

    @Test
    void testEliminarEstudianteNoExistente() {
        Long estudianteId = 999L;

        // Configura el mock para simular que el estudiante no existe
        Mockito.when(estudianteRepository.findById(estudianteId)).thenReturn(Optional.empty());

        // Llamada al servicio
        Error thrown = assertThrows(Error.class, () -> {
            estudianteService.eliminar(estudianteId);
        });

        // Verifica que el mensaje de la excepción es correcto
        assertThat(thrown.getMessage()).isEqualTo("Estudiante no encontrado");

        // Verifica que no se haya invocado deleteById
        Mockito.verify(estudianteRepository, Mockito.never()).deleteById(estudianteId);
    }

}
