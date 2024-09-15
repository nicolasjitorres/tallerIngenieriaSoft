package com.miapp;

import com.miapp.dao.Conexion;
import java.sql.Connection;
import java.sql.SQLException;

public class App 
{
  public static void main(String[] args) {
        try {
            // Obtener la conexión a la base de datos
            Connection conn = Conexion.getConnection();
            System.out.println("Conexión exitosa");
            
            // Aquí puedes realizar operaciones con la conexión
            
            // Cerrar la conexión
            conn.close();
        } catch (SQLException e) {
            System.err.println("Error de conexión: " + e.getMessage());
        }
    }
}
