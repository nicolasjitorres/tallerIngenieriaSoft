package com.miapp;

import java.sql.Connection;
import java.sql.SQLException;

import com.miapp.DAO.Conexion;

public class Main {
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
