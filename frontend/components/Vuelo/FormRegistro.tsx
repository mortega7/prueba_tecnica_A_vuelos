import { useEffect, useState } from 'react';
import { Aerolinea, Aeropuerto, DatosRegistroVuelo } from '@/helpers/interfaces';
import { getAerolineas, getAeropuertos } from '@/helpers/http';
import { esFechaInicioMayor, esIgualOtroValor, esNumeroEntero, esVacio } from '@/helpers/funciones';
import { SetDispatchGeneral } from '@/helpers/types';

const FormRegistro = ({
	setDatosVuelo,
	setGuardarVuelo,
}: {
	setDatosVuelo: SetDispatchGeneral<DatosRegistroVuelo>;
	setGuardarVuelo: SetDispatchGeneral<boolean>;
}) => {
	const [aeropuertos, setAeropuertos] = useState<Aeropuerto[]>([]);
	const [aerolineas, setAerolineas] = useState<Aerolinea[]>([]);
	const [isLoadingAeropuertos, setIsLoadingAeropuertos] = useState(true);
	const [isLoadingAerolineas, setIsLoadingAerolineas] = useState(true);
	const [camposValidacion, setCamposValidacion] = useState({
		origen: '',
		destino: '',
		aerolinea: '',
		fechaSalida: '',
		horaSalida: '',
		minutoSalida: '',
		fechaLlegada: '',
		horaLlegada: '',
		minutoLlegada: '',
		precio: '',
	});
	const [errorValidacion, setErrorValidacion] = useState({
		origen: false,
		destino: false,
		aerolinea: false,
		fechaSalida: false,
		horaSalida: false,
		minutoSalida: false,
		fechaLlegada: false,
		horaLlegada: false,
		minutoLlegada: false,
		precio: false,
	});

	useEffect(() => {
		async function fetchAeropuertos() {
			try {
				const aeropuertosFetched = await getAeropuertos();
				setAeropuertos(aeropuertosFetched);
			} catch (err) {
				console.log(err);
			}

			setIsLoadingAeropuertos(false);
		}

		fetchAeropuertos();
	}, []);

	useEffect(() => {
		async function fetchAerolineas() {
			try {
				const aerolineasFetched = await getAerolineas();
				setAerolineas(aerolineasFetched);
			} catch (err) {
				console.log(err);
			}

			setIsLoadingAerolineas(false);
		}

		fetchAerolineas();
	}, []);

	const setValorCampo = (campo: string, valor: string) => {
		setCamposValidacion((prevState) => {
			return {
				...prevState,
				[campo]: valor,
			};
		});
	};

	const validarFormRegistro = () => {
		const {
			origen,
			destino,
			aerolinea,
			fechaSalida,
			horaSalida,
			minutoSalida,
			fechaLlegada,
			horaLlegada,
			minutoLlegada,
			precio,
		} = camposValidacion;

		const validarFechas = esFechaInicioMayor(fechaSalida, horaSalida, minutoSalida, fechaLlegada, horaLlegada, minutoLlegada);

		const validaciones = {
			origen: !esVacio(origen) && !esIgualOtroValor(origen, destino),
			destino: !esVacio(destino) && !esIgualOtroValor(origen, destino),
			aerolinea: !esVacio(aerolinea),
			fechaSalida: !esVacio(fechaSalida) && !validarFechas,
			horaSalida: !esVacio(horaSalida) && !validarFechas,
			minutoSalida: !esVacio(minutoSalida) && !validarFechas,
			fechaLlegada: !esVacio(fechaLlegada) && !validarFechas,
			horaLlegada: !esVacio(horaLlegada) && !validarFechas,
			minutoLlegada: !esVacio(minutoLlegada) && !validarFechas,
			precio: !esVacio(precio) && esNumeroEntero(precio),
		};

		setErrorValidacion({
			origen: !validaciones.origen,
			destino: !validaciones.destino,
			aerolinea: !validaciones.aerolinea,
			fechaSalida: !validaciones.fechaSalida,
			horaSalida: !validaciones.horaSalida,
			minutoSalida: !validaciones.minutoSalida,
			fechaLlegada: !validaciones.fechaLlegada,
			horaLlegada: !validaciones.horaLlegada,
			minutoLlegada: !validaciones.minutoLlegada,
			precio: !validaciones.precio,
		});

		if (
			origen &&
			destino &&
			aerolinea &&
			fechaSalida &&
			horaSalida &&
			minutoSalida &&
			fechaLlegada &&
			horaLlegada &&
			precio &&
			!validarFechas &&
			origen !== destino
		) {
			enviarFormRegistro();
		}
	};

	const enviarFormRegistro = () => {
		const formData: DatosRegistroVuelo = {
      DatosVuelo: {
        IdAerolinea: parseInt(camposValidacion.aerolinea),
        IdAeropuertoOrigen: parseInt(camposValidacion.origen),
        IdAeropuertoDestino: parseInt(camposValidacion.destino),
        FechaSalidaVuelo: camposValidacion.fechaSalida,
        HoraSalidaVuelo:
          camposValidacion.horaSalida +
          ':' +
          camposValidacion.minutoSalida +
          ':00',
        FechaLlegadaVuelo: camposValidacion.fechaLlegada,
        HoraLlegadaVuelo:
          camposValidacion.horaLlegada +
          ':' +
          camposValidacion.minutoLlegada +
          ':00',
        PrecioVuelo: parseInt(camposValidacion.precio),
      }
		};

		setDatosVuelo(formData);
		setGuardarVuelo(true);
	};

	return (
		<>
			<div className="w-full flex flex-col items-start justify-start gap-2 mb-4">
				<div className="font-semibold mb-3 text-sm md:text-xl xl:text-3xl text-blue-700">
					Registro de Vuelos
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-6">
					<div className="flex flex-col gap-2">
						{isLoadingAerolineas && <p>Cargando aerolíneas...</p>}
						{!isLoadingAerolineas && (
							<>
								<label className="text-xs">Aerolínea:</label>
								<select
									required
									onChange={(event) => {
										setValorCampo('aerolinea', event.target.value);
									}}
									className={`px-4 py-2 border-2 rounded-lg text-xs ${
										errorValidacion.aerolinea
											? 'border-red-500'
											: 'border-stone-400'
									}`}
								>
									<option value="">- Seleccione -</option>
									{aerolineas.map((aerolinea: Aerolinea, index) => {
										return (
											<option key={index} value={aerolinea.IdAerolinea}>
												{aerolinea.NombreAerolinea}
											</option>
										);
									})}
								</select>
							</>
						)}
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-6">
					{isLoadingAeropuertos && <p>Cargando aeropuertos...</p>}
					{!isLoadingAeropuertos && (
						<>
							<div className="flex flex-col gap-2">
								<label className="text-xs">Origen:</label>
								<select
									required
									onChange={(event) => {
										setValorCampo('origen', event.target.value);
									}}
									className={`px-4 py-2 border-2 rounded-lg text-xs ${
										errorValidacion.origen
											? 'border-red-500'
											: 'border-stone-400'
									}`}
								>
									<option value="">- Seleccione -</option>
									{aeropuertos.map((aeropuerto: Aeropuerto, index) => {
										return (
											<option key={index} value={aeropuerto.IdAeropuerto}>
												{aeropuerto.NombreAeropuerto} (
												{aeropuerto.CodigoAeropuerto})
											</option>
										);
									})}
								</select>
							</div>
							<div className="flex flex-col gap-2">
								<label className="text-xs">Destino:</label>
								<select
									required
									onChange={(event) => {
										setValorCampo('destino', event.target.value);
									}}
									className={`px-4 py-2 border-2 rounded-lg text-xs ${
										errorValidacion.destino
											? 'border-red-500'
											: 'border-stone-400'
									}`}
								>
									<option value="">- Seleccione -</option>
									{aeropuertos.map((aeropuerto: Aeropuerto, index) => {
										return (
											<option key={index} value={aeropuerto.IdAeropuerto}>
												{aeropuerto.NombreAeropuerto} (
												{aeropuerto.CodigoAeropuerto})
											</option>
										);
									})}
								</select>
							</div>
						</>
					)}
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-6">
					<div className="flex flex-col gap-2">
						<label className="text-xs">Fecha de Salida:</label>
						<input
							type="date"
							required
							onChange={(event) => {
								setValorCampo('fechaSalida', event.target.value);
							}}
							className={`px-4 py-2 border-2 rounded-lg text-xs ${
								errorValidacion.fechaSalida
									? 'border-red-500'
									: 'border-stone-400'
							}`}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-xs">Hora de Salida:</label>
						<div className="grid grid-cols-3 gap-2">
							<select
								required
								onChange={(event) => {
									setValorCampo('horaSalida', event.target.value);
								}}
								className={`px-4 py-2 border-2 rounded-lg text-xs ${
									errorValidacion.horaSalida
										? 'border-red-500'
										: 'border-stone-400'
								}`}
							>
								<option value=""></option>
								{Array.from({ length: 24 }, (_, index) => (
									<option key={index} value={index}>
										{(index < 10 ? '0' : '') + index}
									</option>
								))}
							</select>
							<select
								required
								onChange={(event) => {
									setValorCampo('minutoSalida', event.target.value);
								}}
								className={`px-4 py-2 border-2 rounded-lg text-xs ${
									errorValidacion.minutoSalida
										? 'border-red-500'
										: 'border-stone-400'
								}`}
							>
								<option value=""></option>
								{Array.from({ length: 12 }, (_, index) => (
									<option key={index} value={index * 5}>
										{(index * 5 < 10 ? '0' : '') + index * 5}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-6">
					<div className="flex flex-col gap-2">
						<label className="text-xs">Fecha de Llegada:</label>
						<input
							type="date"
							required
							onChange={(event) => {
								setValorCampo('fechaLlegada', event.target.value);
							}}
							className={`px-4 py-2 border-2 rounded-lg text-xs ${
								errorValidacion.fechaLlegada
									? 'border-red-500'
									: 'border-stone-400'
							}`}
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-xs">Hora de Llegada:</label>
						<div className="grid grid-cols-3 gap-2">
							<select
								required
								onChange={(event) => {
									setValorCampo('horaLlegada', event.target.value);
								}}
								className={`px-4 py-2 border-2 rounded-lg text-xs ${
									errorValidacion.horaLlegada
										? 'border-red-500'
										: 'border-stone-400'
								}`}
							>
								<option value=""></option>
								{Array.from({ length: 24 }, (_, index) => (
									<option key={index} value={index}>
										{(index < 10 ? '0' : '') + index}
									</option>
								))}
							</select>
							<select
								required
								onChange={(event) => {
									setValorCampo('minutoLlegada', event.target.value);
								}}
								className={`px-4 py-2 border-2 rounded-lg text-xs ${
									errorValidacion.minutoLlegada
										? 'border-red-500'
										: 'border-stone-400'
								}`}
							>
								<option value=""></option>
								{Array.from({ length: 12 }, (_, index) => (
									<option key={index} value={index * 5}>
										{(index * 5 < 10 ? '0' : '') + index * 5}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-6">
					<div className="flex flex-col gap-2">
						<label className="text-xs">
							Precio por Tiquete{' '}
							<span className="italic">(sin puntos ni comas)</span>:
						</label>
						<input
							type="number"
							required
							min={1}
							step="1"
							max={999999999}
							maxLength={9}
							onChange={(event) => {
								setValorCampo('precio', event.target.value);
							}}
							className={`px-4 py-2 border-2 rounded-lg text-xs ${
								errorValidacion.precio ? 'border-red-500' : 'border-stone-400'
							}`}
						/>
					</div>
				</div>
				<div className="text-center mt-2 md:mt-6">
					<button
						className="w-full md:w-3/5 xl:w-1/4 rounded-lg bg-blue-700 hover:bg-blue-900 text-white px-8 py-2"
						onClick={validarFormRegistro}
					>
						Registrar Vuelo
					</button>
				</div>
			</div>
		</>
	);
};

export default FormRegistro;
