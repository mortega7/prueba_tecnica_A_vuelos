function obtenerFechaActual(fecha) {
	const pad = (num) => {
		return (num < 10 ? '0' : '') + num;
	};

	return {
		anio: fecha.getFullYear(),
		mes: pad(fecha.getMonth() + 1),
		dia: pad(fecha.getDate()),
		horas: pad(fecha.getHours()),
		minutos: pad(fecha.getMinutes()),
		segundos: pad(fecha.getSeconds()),
	};
}

export { obtenerFechaActual };
