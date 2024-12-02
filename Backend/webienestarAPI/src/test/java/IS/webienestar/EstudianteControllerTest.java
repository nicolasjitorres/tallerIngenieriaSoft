package IS.webienestar;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.webienestar.WebienestarApplication;
import com.webienestar.modelos.Estudiante;
import com.webienestar.repositorios.EstudianteRepository;

@SpringBootTest(classes = WebienestarApplication.class)
@AutoConfigureMockMvc
class EstudianteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EstudianteRepository estudianteRepository;

    @BeforeEach
    void setup() {
        estudianteRepository.deleteAll();
    }

    // 1. Caso exitoso: Guardar un estudiante correctamente
    @Test
    void testGuardarEstudiante() throws Exception {
        String json = """
                        {
                            "legajo": "123",
                            "carrera": "Ingeniería",
                            "facultad": "Facultad X",
                            "dni": 12345678,
                            "password": "password123",
                            "username": "usuario123",
                            "nombre": "Estudiante X",
                            "genero": "MASCULINO",
                            "localidad": "Ciudad X",
                            "direccion": "Calle Falsa 123",
                            "mail": "correo@example.com",
                            "celular": 1234567890,
                            "rol": "ESTUDIANTE"
                        }
                """;

        mockMvc.perform(post("/estudiantes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.dni").value(12345678));
    }

    // 2. Caso fallido: Intentar guardar un estudiante sin dni
    @Test
    void testGuardarEstudianteSinDni() throws Exception {
        String json = """
                        {
                            "legajo": "124",
                            "carrera": "Arquitectura",
                            "facultad": "Facultad Y",
                            "password": "password123",
                            "username": "usuario124",
                            "nombre": "Estudiante Y",
                            "genero": "FEMENINO",
                            "localidad": "Ciudad Y",
                            "direccion": "Calle Verdadera 124",
                            "mail": "correoY@example.com",
                            "celular": 1234567891,
                            "rol": "ESTUDIANTE"
                        }
                """; 

        mockMvc.perform(post("/estudiantes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.dni").value("El campo 'dni' es obligatorio."));
    }

    // 3. Caso fallido: Obtener un estudiante que no existe
    @Test
    void testObtenerEstudianteInexistente() throws Exception {
        mockMvc.perform(get("/estudiantes/9999")) // ID de estudiante no existente
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Estudiante no encontrado"));
    }

    // 4. Caso exitoso: Obtener todos los estudiantes cuando la base de datos tiene
    // registros
    @Test
    void testObtenerTodos() throws Exception {
        Estudiante estudiante = new Estudiante();
        estudiante.setLegajo("123");
        estudiante.setDni(12345678L);
        estudianteRepository.save(estudiante);

        mockMvc.perform(get("/estudiantes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].dni").value(12345678L));
    }

    // 5. Caso exitoso: Obtener todos los estudiantes cuando la base de datos está
    // vacía
    @Test
    void testObtenerTodosEstudiantesVacios() throws Exception {
        mockMvc.perform(get("/estudiantes"))
                .andExpect(status().isNoContent());
    }
}
