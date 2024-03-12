import { DatosBusquedaVuelos, DatosReserva, DatosRegistroVuelo } from './interfaces';

async function getAeropuertos() {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/aeropuertos`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Error al traer los aeropuertos');
	}

	const data = await response.json();
	return data.aeropuertos;
}

async function getAerolineas() {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/aerolineas`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Error al traer las aerolineas');
	}

	const data = await response.json();
	return data.aerolineas;
}

async function getVuelos(datosBusqueda: DatosBusquedaVuelos) {
	const { IdAeropuertoOrigen, IdAeropuertoDestino, FechaDesde, FechaHasta } =
		datosBusqueda;
	const url = `${process.env.NEXT_PUBLIC_API_URL}/vuelos?IdAeropuertoOrigen=${IdAeropuertoOrigen}&IdAeropuertoDestino=${IdAeropuertoDestino}&FechaDesde=${FechaDesde}&FechaHasta=${FechaHasta}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Error al traer los vuelos');
	}

	const data = await response.json();
	return data.vuelos;
}

async function getVuelosDisponibles() {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/vuelos/disponibles`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Error al traer los vuelos');
	}

	const data = await response.json();
	return data.vuelos;
}

async function setVuelo(datosVuelo: DatosRegistroVuelo) {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/vuelos`;
	const response = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(datosVuelo),
		method: 'POST',
	});

	const data = await response.json();

	if (!response.ok) {
			console.log(response.status);
    if (response.status === 400 || response.status === 500) {
      throw new Error(data.error || 'Error al guardar el vuelo');
    }
    
		throw new Error('Error al guardar el vuelo');
	}

	return data.idVuelo;
}

async function setReserva(datosReserva: DatosReserva) {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/reservas`;
	const response = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(datosReserva),
		method: 'POST',
	});

	const data = await response.json();

	if (!response.ok) {
    if (response.status === 400 || response.status === 500) {
      throw new Error(data.error || 'Error al guardar la reserva');
    }

		throw new Error('Error al guardar la reserva');
	}

	return data.codigo;
}

async function getEstadisticaAerolineas() {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/estadisticas/cantidad-aerolineas`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Error al traer las aerolineas');
	}

	const data = await response.json();
	return data.aerolineas;
}

async function getEstadisticaReservas() {
	const url = `${process.env.NEXT_PUBLIC_API_URL}/estadisticas/aerolineas-reservas`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Error al traer las reservas');
	}

	const data = await response.json();
	return data.reservas;
}

export { getAeropuertos, getAerolineas, getVuelos, getVuelosDisponibles, setVuelo, setReserva, getEstadisticaAerolineas, getEstadisticaReservas };
