interface MenuItem {
  id: string;
  title: string;
  component: JSX.Element;
}

interface TopbarProps {
  menu: MenuItem[];
  selectedMenu: string;
  setSelectedMenu: (value: string) => void;
}

interface DatosBusquedaVuelos {
  IdAeropuertoOrigen: number;
  IdAeropuertoDestino: number;
  FechaDesde: string;
  FechaHasta: string;
}

interface Pais {
  IdPais: number;
  NombrePais: string;
}

interface Ciudad {
  IdCiudad: number;
  NombreCiudad: string;
  IdPais: number;
  Pais: Pais;
}

interface Aeropuerto {
  IdAeropuerto: number;
  NombreAeropuerto: string;
  CodigoAeropuerto: string;
  IdCiudad: number;
  Ciudad: Ciudad;
}

interface Aerolinea {
  IdAerolinea: number;
  NombreAerolinea: string;
  IdPais: number;
  Pais: Pais;
};

interface Vuelo {
  IdVuelo: number;
  IdAerolinea: number;
  IdAeropuertoOrigen: number;
  IdAeropuertoDestino: number;
  FechaSalidaVuelo: string;
  HoraSalidaVuelo: string;
  FechaLlegadaVuelo: string;
  HoraLlegadaVuelo: string;
  PrecioVuelo: number;
  Aerolinea: Aerolinea;
  AeropuertoOrigen: Aeropuerto;
  AeropuertoDestino: Aeropuerto;
}

interface Usuario {
  CorreoUsuario: string;
  NombresUsuario: string;
  ApellidosUsuario: string;
}

interface Reserva {
  IdVuelo: number;
  FechaReserva: string;
  HoraReserva: string;
  CantidadAsientosReserva: number;
  PrecioReserva: number;
}

interface DatosReserva {
  DatosUsuario: Usuario;
  DatosReserva: Reserva;
}

interface DatosRegistroVuelo {
  DatosVuelo: {
    IdAerolinea: number;
    IdAeropuertoOrigen: number;
    IdAeropuertoDestino: number;
    FechaSalidaVuelo: string;
    HoraSalidaVuelo: string;
    FechaLlegadaVuelo: string;
    HoraLlegadaVuelo: string;
    PrecioVuelo: number;
  }
}

interface EstadisticaReservas {
  CantidadReservas: string;
  Vuelo: {
      IdAerolinea: number;
      Aerolinea: {
          NombreAerolinea: string;
      };
  };
}

export type { MenuItem, TopbarProps, DatosBusquedaVuelos, Aeropuerto, Aerolinea, Vuelo, DatosReserva, DatosRegistroVuelo, EstadisticaReservas };