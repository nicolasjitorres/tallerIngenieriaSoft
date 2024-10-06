-- Insertar estudiantes
INSERT INTO Estudiante (dni, password, username, nombre, genero, localidad, direccion, mail, celular, legajo, carrera, facultad, rol) 
VALUES 
(12345678, '$2a$10$sLPuR1rt0nffKBV/LHXEfewHSUxWOfuErfzOaHqhXTT1Q3UeO0qem', 'user1', 'Juan Perez', 'MASCULINO', 'Ciudad', 'Calle 123', 'juan@example.com', 123456789, '2021001', 'Ingenieria', 'Facultad de Ingenieria', 'ESTUDIANTE'),
(87654321, '$2a$10$EhUD5tWj./fbE4PUSWeYrOQO43CG3U6pznQHzpHpM1TohMnaKsZAO', 'user2', 'Ana Gomez', 'FEMENINO', 'Ciudad', 'Calle 456', 'ana@example.com', 987654321, '2021002', 'Medicina', 'Facultad de Medicina', 'ESTUDIANTE'),
(12312312, '$2a$10$6FZJh6ZmSY2o5v/UiSXZMuZxaQml5eJZz59XW4PZjxMgU.yS6vG6O', 'user3', 'Luis Gonzalez', 'MASCULINO', 'Ciudad', 'Calle 789', 'luis@example.com', 321321321, '2021003', 'Derecho', 'Facultad de Derecho', 'ESTUDIANTE');

-- Insertar empleados
INSERT INTO Empleado (dni, password, username, nombre, genero, localidad, direccion, mail, celular, rol) 
VALUES 
(13579246, '$2a$10$sLPuR1rt0nffKBV/LHXEfewHSUxWOfuErfzOaHqhXTT1Q3UeO0qem', 'user4', 'Carlos Sanchez', 'MASCULINO', 'Ciudad', 'Calle 789', 'carlos@example.com', 555123456, 'EMPLEADO_COMEDOR'),
(24681357, '$2a$10$sLPuR1rt0nffKBV/LHXEfewHSUxWOfuErfzOaHqhXTT1Q3UeO0qem', 'user5', 'Maria Lopez', 'FEMENINO', 'Ciudad', 'Calle 321', 'maria@example.com', 123456789, 'EMPLEADO_CONTROL'),
(67891234, '$2a$10$sLPuR1rt0nffKBV/LHXEfewHSUxWOfuErfzOaHqhXTT1Q3UeO0qem', 'user6', 'Lucia Ramirez', 'FEMENINO', 'Ciudad', 'Calle 654', 'lucia@example.com', 987654321, 'SECRETARIO');

-- Insertar becas comedor
INSERT INTO Beca_Comedor (ingresos, tipo_Vivienda, cond_Vivienda, grupo_Familiar, estado_beca, anio, estudiante_id) 
VALUES 
(TRUE, 'CASA', 'PROPIA', 'Familia de 4 personas', 'EN_EVALUACION', '2024', 1), 
(FALSE, 'DEPARTAMENTO', 'ALQUILER', 'Familia de 2 personas', 'APROBADA', '2024', 2),
(TRUE, 'PENSION', 'FAMILIAR', 'Vive solo', 'DENEGADA', '2024', 3);

-- Insertar viandas
INSERT INTO Vianda (tipo, plato, postre, cantidad) 
VALUES 
('Saludable', 'Ensalada Cesar', 'Fruta', 100), 
('Saludable', 'Tofu con verduras', 'Mousse de chocolate vegano', 0), 
('Clasico', 'Milanesa con papas fritas', 'Helado', 150);

-- Insertar reservas
INSERT INTO Reserva (fecha, opinion, calificacion, estado, estudiante_id, vianda_id) 
VALUES 
('03-10-2024', 'Deliciosa', 3, 'RESERVADA', 1, 1), 
('03-10-2024', 'Saludable y sabrosa', 4, 'RETIRADA', 2, 2), 
('03-10-2024', 'Exquisita', 5, 'CANCELADA', 3, 3);
