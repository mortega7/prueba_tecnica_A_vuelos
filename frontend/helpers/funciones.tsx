function convertirMoneda(valor: number) {
	const pesos = new Intl.NumberFormat('es-CO', {
		style: 'currency',
		currency: 'COP',
	});

	return pesos.format(valor);
}

function obtenerFechaActual() {
	const hoy = new Date();
	const anio = hoy.getFullYear();
	const mes = String(hoy.getMonth() + 1).padStart(2, '0');
	const dia = String(hoy.getDate()).padStart(2, '0');
	const horas = String(hoy.getHours()).padStart(2, '0');
	const minutos = String(hoy.getMinutes()).padStart(2, '0');
	const segundos = String(hoy.getSeconds()).padStart(2, '0');

	return { anio, mes, dia, horas, minutos, segundos };
}

function esVueloValido(fechaVuelo: string, horaVuelo: string) {
	const fechaActual = new Date();
	const fechaHoraVuelo = new Date(`${fechaVuelo}T${horaVuelo}`);

	return fechaHoraVuelo > fechaActual;
}

function esEmail(valor: string) {
	return valor.includes('@');
}

function esVacio(valor: string) {
	return valor.trim() === '';
}

function tieneLongitudMinima(valor: string, longMinima: number) {
	return valor.length >= longMinima;
}

function esIgualOtroValor(valor: string, otroValor: string) {
	return valor === otroValor;
}

function esNumeroEntero(valor: string) {
	const numero = parseInt(valor, 10);
	return (
		!isNaN(numero) &&
		Number.isInteger(numero) &&
		numero.toString() === valor.trim()
	);
}

function esFechaInicioMayor(
	fechaInicio: string,
	horaInicio: string,
	minutoInicio: string,
	fechaFin: string,
	horaFin: string,
	minutoFin: string
) {
	const inicioDate = new Date(fechaInicio);
	const inicioHora = parseInt(horaInicio);
	const inicioMinuto = parseInt(minutoInicio);
	const finDate = new Date(fechaFin);
	const finHora = parseInt(horaFin);
	const finMinuto = parseInt(minutoFin);

	inicioDate.setHours(inicioHora, inicioMinuto, 0);
	finDate.setHours(finHora, finMinuto, 0);

	return inicioDate >= finDate;
}

export {
	convertirMoneda,
	obtenerFechaActual,
	esVueloValido,
	esEmail,
	esVacio,
	tieneLongitudMinima,
	esIgualOtroValor,
	esNumeroEntero,
	esFechaInicioMayor,
};
