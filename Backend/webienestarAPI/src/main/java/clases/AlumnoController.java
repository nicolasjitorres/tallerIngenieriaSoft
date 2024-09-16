package clases;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/alumnos")
public class AlumnoController {
    
    @GetMapping("/{id}")
    public String getMethodName(@RequestParam String param, @PathVariable Long id) {
        return "true";
    }
    

    

}
