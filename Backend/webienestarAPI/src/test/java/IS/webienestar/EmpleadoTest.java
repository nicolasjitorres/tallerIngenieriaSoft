package IS.webienestar;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Collection;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.GrantedAuthority;

import com.webienestar.modelos.Empleado;
import com.webienestar.modelos.enums.Rol;

public class EmpleadoTest {

    @Test
    public void testGetAuthoritiesForAdmin() {
        // Arrange
        Empleado empleado = new Empleado();
        empleado.setRol(Rol.ADMIN);

        // Act
        Collection<? extends GrantedAuthority> authorities = empleado.getAuthorities();

        // Assert
        assertEquals(1, authorities.size());
        assertEquals("ADMIN", authorities.iterator().next().getAuthority());
    }

    @Test
    public void testGetAuthoritiesForEmpleadoComedor() {
        // Arrange
        Empleado empleado = new Empleado();
        empleado.setRol(Rol.EMPLEADO_COMEDOR);

        // Act
        Collection<? extends GrantedAuthority> authorities = empleado.getAuthorities();

        // Assert
        assertEquals(1, authorities.size());
        assertEquals("EMPLEADO_COMEDOR", authorities.iterator().next().getAuthority());
    }

    @Test
    public void testGetAuthoritiesForEmpleadoControl() {
        // Arrange
        Empleado empleado = new Empleado();
        empleado.setRol(Rol.EMPLEADO_CONTROL);

        // Act
        Collection<? extends GrantedAuthority> authorities = empleado.getAuthorities();

        // Assert
        assertEquals(1, authorities.size());
        assertEquals("EMPLEADO_CONTROL", authorities.iterator().next().getAuthority());
    }

    @Test
    public void testIsAccountNonExpired() {
        // Arrange
        Empleado empleado = new Empleado();

        // Act & Assert
        assertTrue(empleado.isAccountNonExpired());
    }

    @Test
    public void testIsAccountNonLocked() {
        // Arrange
        Empleado empleado = new Empleado();

        // Act & Assert
        assertTrue(empleado.isAccountNonLocked());
    }

    @Test
    public void testIsCredentialsNonExpired() {
        // Arrange
        Empleado empleado = new Empleado();

        // Act & Assert
        assertTrue(empleado.isCredentialsNonExpired());
    }

    @Test
    public void testIsEnabled() {
        // Arrange
        Empleado empleado = new Empleado();

        // Act & Assert
        assertTrue(empleado.isEnabled());
    }

    @Test
    public void testGetId() {
        // Arrange
        Empleado empleado = new Empleado();
        empleado.setId(123L);

        // Act & Assert
        assertEquals(123L, empleado.getId());
    }

    @Test
    public void testGetRol() {
        // Arrange
        Empleado empleado = new Empleado();
        empleado.setRol(Rol.EMPLEADO_COMEDOR);

        // Act & Assert
        assertEquals(Rol.EMPLEADO_COMEDOR, empleado.getRol());
    }
}
