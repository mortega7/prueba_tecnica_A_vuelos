SET CHARACTER_SET_CLIENT = 'utf8mb4';
SET CHARACTER_SET_CONNECTION = 'utf8mb4';
SET CHARACTER_SET_DATABASE = 'utf8mb4';
SET CHARACTER_SET_RESULTS = 'utf8mb4';
SET CHARACTER_SET_SERVER = 'utf8mb4';
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS pais (
  IdPais INT(11) NOT NULL AUTO_INCREMENT,
  NombrePais VARCHAR(255) NOT NULL,
  PRIMARY KEY (IdPais))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS aerolinea (
  IdAerolinea INT(11) NOT NULL AUTO_INCREMENT,
  NombreAerolinea VARCHAR(255) NOT NULL,
  IdPais INT(11) NOT NULL,
  PRIMARY KEY (IdAerolinea),
  INDEX fk_aerolinea_pais1_idx (IdPais ASC),
  CONSTRAINT fk_aerolinea_pais1 FOREIGN KEY (IdPais) REFERENCES pais (IdPais) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS ciudad (
  IdCiudad INT NOT NULL AUTO_INCREMENT,
  NombreCiudad VARCHAR(255) NOT NULL,
  IdPais INT(11) NOT NULL,
  PRIMARY KEY (IdCiudad),
  INDEX fk_ciudad_pais1_idx (IdPais ASC),
  CONSTRAINT fk_ciudad_pais1 FOREIGN KEY (IdPais) REFERENCES pais (IdPais) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS aeropuerto (
  IdAeropuerto INT(11) NOT NULL AUTO_INCREMENT,
  NombreAeropuerto VARCHAR(255) NOT NULL,
  CodigoAeropuerto VARCHAR(10) NOT NULL,
  IdCiudad INT(11) NOT NULL,
  UNIQUE INDEX CodigoAeropuerto_UNIQUE (CodigoAeropuerto ASC),
  INDEX fk_aeropuerto_ciudad1_idx (IdCiudad ASC),
  PRIMARY KEY (IdAeropuerto),
  CONSTRAINT fk_aeropuerto_ciudad1 FOREIGN KEY (IdCiudad) REFERENCES ciudad (IdCiudad) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS vuelo (
  IdVuelo INT(11) NOT NULL AUTO_INCREMENT,
  IdAerolinea INT(11) NOT NULL,
  IdAeropuertoOrigen INT(11) NOT NULL,
  IdAeropuertoDestino INT(11) NOT NULL,
  FechaSalidaVuelo DATE NOT NULL,
  HoraSalidaVuelo TIME NOT NULL,
  FechaLlegadaVuelo DATE NOT NULL,
  HoraLlegadaVuelo TIME NOT NULL,
  PrecioVuelo INT NOT NULL,
  PRIMARY KEY (IdVuelo),
  INDEX fk_vuelo_aerolinea_idx (IdAerolinea ASC),
  INDEX fk_vuelo_aeropuerto1_idx (IdAeropuertoOrigen ASC),
  INDEX fk_vuelo_aeropuerto2_idx (IdAeropuertoDestino ASC),
  CONSTRAINT fk_vuelo_aerolinea FOREIGN KEY (IdAerolinea) REFERENCES aerolinea (IdAerolinea) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_vuelo_aeropuerto1 FOREIGN KEY (IdAeropuertoOrigen) REFERENCES aeropuerto (IdAeropuerto) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_vuelo_aeropuerto2 FOREIGN KEY (IdAeropuertoDestino) REFERENCES aeropuerto (IdAeropuerto) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS usuario (
  IdUsuario INT(11) NOT NULL AUTO_INCREMENT,
  CorreoUsuario VARCHAR(255) NOT NULL,
  NombresUsuario VARCHAR(255) NOT NULL,
  ApellidosUsuario VARCHAR(255) NOT NULL,
  PRIMARY KEY (IdUsuario),
  UNIQUE INDEX CorreoUsuario_UNIQUE (CorreoUsuario ASC))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS reserva (
  IdReserva INT(11) NOT NULL AUTO_INCREMENT,
  IdUsuario INT(11) NOT NULL,
  IdVuelo INT(11) NOT NULL,
  FechaReserva DATE NOT NULL,
  HoraReserva TIME NOT NULL,
  CantidadAsientosReserva SMALLINT NOT NULL,
  PrecioReserva INT NOT NULL,
  CodigoReserva VARCHAR(255) NOT NULL,
  PRIMARY KEY (IdReserva),
  INDEX fk_reserva_usuario1_idx (IdUsuario ASC),
  INDEX fk_reserva_vuelo1_idx (IdVuelo ASC),
  UNIQUE INDEX CodigoReserva_UNIQUE (CodigoReserva ASC),
  CONSTRAINT fk_reserva_usuario1 FOREIGN KEY (IdUsuario) REFERENCES usuario (IdUsuario) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_reserva_vuelo1 FOREIGN KEY (IdVuelo) REFERENCES vuelo (IdVuelo) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO pais (IdPais, NombrePais) VALUES 
(1, 'Colombia'),
(2, 'Chile');

INSERT INTO ciudad (IdCiudad, NombreCiudad, IdPais) VALUES 
(1, 'Bogotá', 1),
(2, 'Medellín', 1),
(3, 'Cartagena', 1),
(4, 'Cali', 1),
(5, 'Barranquilla', 1),
(6, 'Pereira', 1),
(7, 'San Andrés', 1),
(8, 'Armenia', 1),
(9, 'Bucaramanga', 1),
(10, 'Santa Marta', 1);

INSERT INTO aeropuerto (IdAeropuerto, NombreAeropuerto, CodigoAeropuerto, IdCiudad) VALUES 
(1, 'Aeropuerto Internacional El Dorado', 'BOG', 1),
(2, 'Aeropuerto Internacional José María Córdova', 'MDE', 2),
(3, 'Aeropuerto Internacional Rafael Núñez', 'CTG', 3),
(4, 'Aeropuerto Internacional Alfonso Bonilla Aragón', 'CLO', 4),
(5, 'Aeropuerto Internacional Ernesto Cortissoz', 'BAQ', 5),
(6, 'Aeropuerto Internacional Matecaña', 'PEI', 6),
(7, 'Aeropuerto Internacional Gustavo Rojas Pinilla', 'ADZ', 7),
(8, 'Aeropuerto Internacional El Edén', 'AXM', 8),
(9, 'Aeropuerto Internacional Palonegro', 'BGA', 9),
(10, 'Aeropuerto Internacional Simón Bolívar', 'SMR', 10);

INSERT INTO aerolinea (IdAerolinea, NombreAerolinea, IdPais) VALUES
(1, 'Avianca', 1),
(2, 'LATAM Airlines Colombia', 1),
(3, 'Satena', 1),
(4, 'EasyFly', 1),
(5, 'Wingo', 1),
(6, 'Copa Airlines Colombia', 1),
(7, 'JetSMART', 2);

INSERT INTO vuelo (IdAerolinea, IdAeropuertoOrigen, IdAeropuertoDestino, FechaSalidaVuelo, HoraSalidaVuelo, FechaLlegadaVuelo, HoraLlegadaVuelo, PrecioVuelo) VALUES
(1, 1, 2, '2024-03-10', '08:00:00', '2024-03-10', '10:00:00', 200000),
(2, 2, 3, '2024-03-10', '10:30:00', '2024-03-10', '12:30:00', 180000),
(3, 3, 4, '2024-03-10', '13:00:00', '2024-03-10', '15:00:00', 220000),
(4, 4, 5, '2024-03-11', '08:30:00', '2024-03-11', '10:30:00', 190000),
(5, 5, 6, '2024-03-11', '11:00:00', '2024-03-11', '13:00:00', 210000),
(6, 6, 7, '2024-03-11', '13:30:00', '2024-03-11', '15:30:00', 230000),
(1, 7, 8, '2024-03-12', '09:00:00', '2024-03-12', '11:00:00', 240000),
(2, 8, 9, '2024-03-12', '11:30:00', '2024-03-12', '13:30:00', 200000),
(3, 9, 10, '2024-03-12', '14:00:00', '2024-03-12', '16:00:00', 210000),
(4, 10, 1, '2024-03-13', '09:30:00', '2024-03-13', '11:30:00', 230000),
(5, 1, 2, '2024-03-13', '12:00:00', '2024-03-13', '14:00:00', 220000),
(6, 2, 3, '2024-03-13', '14:30:00', '2024-03-13', '16:30:00', 240000),
(1, 3, 4, '2024-03-14', '10:00:00', '2024-03-14', '12:00:00', 210000),
(2, 4, 5, '2024-03-14', '12:30:00', '2024-03-14', '14:30:00', 230000),
(3, 5, 6, '2024-03-14', '15:00:00', '2024-03-14', '17:00:00', 220000),
(4, 6, 7, '2024-03-15', '10:30:00', '2024-03-15', '12:30:00', 240000),
(5, 7, 8, '2024-03-15', '13:00:00', '2024-03-15', '15:00:00', 200000),
(6, 8, 9, '2024-03-15', '15:30:00', '2024-03-15', '17:30:00', 220000),
(7, 9, 10, '2024-03-16', '11:00:00', '2024-03-16', '13:00:00', 230000),
(7, 10, 1, '2024-03-16', '13:30:00', '2024-03-16', '15:30:00', 210000),
(7, 1, 2, '2024-03-16', '16:00:00', '2024-03-16', '18:00:00', 240000);
