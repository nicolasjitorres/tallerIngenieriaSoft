package com.miapp.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Conexion {
    private static final String URL = "jdbc:mysql://boio2wiaap9gobertk8j-mysql.services.clever-cloud.com";
    private static final String USER = "u2ljlieqtyzqzabz";
    private static final String PASSWORD = "0ern8TErv7wVedowtfjE";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
